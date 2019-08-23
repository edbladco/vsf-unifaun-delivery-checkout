import { GetterTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'
import RootState from '@vue-storefront/core/types/RootState'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

export const getters: GetterTree<UnifaunState, RootState> = {
  shippingMethods (state: UnifaunState) {
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
  unifaunOptions () {
    const defaultLanguage = currentStoreView().i18n.defaultLanguage
    return {
      language: defaultLanguage,
      disabled: false
    }
  }
}