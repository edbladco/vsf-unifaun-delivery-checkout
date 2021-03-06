import { MutationTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'

export const mutations: MutationTree<UnifaunState> = {
  SET_SHIPPING_OPTIONS (state: UnifaunState, options) {
    state.options = options
  },
  SET_ADDRESS (state: UnifaunState, addressData) {
    state.addressData = addressData
  },
  SET_VALIDATION (state: UnifaunState, result) {
    state.validation = result
  }
}
