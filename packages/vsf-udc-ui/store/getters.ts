import { GetterTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'
import RootState from '@vue-storefront/core/types/RootState'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export const getters: GetterTree<UnifaunState, RootState> = {
  shippingMethods (state: UnifaunState) {
    const shippingMethods = []
    state.options.forEach(option => {
      if (option.subOptions.length > 0) {
        option.subOptions.forEach(subOption => {
          shippingMethods.push({
            amount: subOption.priceValue || 0,
            available: true,
            base_amount: subOption.priceValue || 0,
            carrier_code: subOption.carrierId || '',
            carrier_title: subOption.description1,
            error_message: '',
            method_code: subOption.carrierId || '',
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
          carrier_code: option.carrierId || '',
          carrier_title: option.description1,
          error_message: '',
          method_code: option.carrierId || '',
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