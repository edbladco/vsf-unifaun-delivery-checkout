import { GetterTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'
import RootState from '@vue-storefront/core/types/RootState'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'
import sumBy from 'lodash-es/sumBy'

export const getters: GetterTree<UnifaunState, RootState> = {
  getShippingMethods (state: UnifaunState) {
    const shippingMethods = []
    state.options.forEach(option => {
      if (option.subOptions && option.subOptions.length > 0) {
        option.subOptions.forEach(subOption => {
          shippingMethods.push({
            amount: subOption.priceValue || 0,
            available: true,
            base_amount: subOption.priceValue || 0,
            carrier_code: config.unifaun.carrier_codes[subOption.serviceId.toLowerCase()] || '',
            carrier_title: subOption.description1,
            error_message: '',
            method_code: config.unifaun.carrier_codes[subOption.serviceId.toLowerCase()] || '',
            method_title: subOption.name,
            price_excl_tax: subOption.priceValue || 0,
            price_incl_tax: subOption.priceValue || 0
          })
        })
      } else {
        shippingMethods.push({
          amount: option.priceValue || 0,
          available: true,
          base_amount: option.priceValue || 0,
          carrier_code: config.unifaun.carrier_codes[option.serviceId.toLowerCase()] || '',
          carrier_title: option.description1,
          error_message: '',
          method_code: config.unifaun.carrier_codes[option.serviceId.toLowerCase()] || '',
          method_title: option.name,
          price_excl_tax: option.priceValue || 0,
          price_incl_tax: option.priceValue || 0
        })
      }
    })
    return shippingMethods
  },
  getUnifaunOptions () {
    const defaultLanguage = currentStoreView().i18n.defaultLanguage
    return {
      language: defaultLanguage,
      disabled: false
    }
  },
  getShippingAddress (state: UnifaunState) {
    return state.addressData
  },
  getUrl (state: UnifaunState, getters) {
    let url = config.unifaun.endpoint
    const {
      totalWeight,
      totalHeight,
      totalWidth,
      totalLength
    } = getters.getValues
    const shippingAddress = getters.getShippingAddress
    const { 
      defaultLanguage: language, 
      currencyCode: currency 
    } = currentStoreView().i18n
    const toCountry = shippingAddress.country
    const zipCode = shippingAddress.postal_code
    url += `?language=${language}&currency=${currency}&tocountry=${toCountry}&tozipcode=${zipCode}&weight=${totalWeight}&height=${totalHeight}&width=${totalWidth}&length=${totalLength}`
    return url
  },
  getValues (state: UnifaunState, getters, rootState, rootGetters) {
    const productWeightsAndDimensions = rootGetters['cart/items'].map((item) => ({
      width: item.bex_ex_width || 0,
      height: item.bex_ex_height || 0,
      length: item.bex_ex_length || 0,
      netWeight: item.bex_net_weight || 0,
      grossWeight: item.bex_gross_weight || 0,
      sku: item.sku
    }))
    const totalWeight = sumBy(productWeightsAndDimensions, 'grossWeight') / 1000
    const totalWidth = sumBy(productWeightsAndDimensions, 'width')
    const totalHeight = sumBy(productWeightsAndDimensions, 'height')
    const totalLength = sumBy(productWeightsAndDimensions, 'length')
    return {
      productWeightsAndDimensions,
      totalWeight,
      totalWidth,
      totalHeight,
      totalLength
    }
  },
  getValidation (state: UnifaunState) {
    return state.validation
  }
}