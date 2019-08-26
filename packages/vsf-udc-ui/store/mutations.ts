import { MutationTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'

export const mutations: MutationTree<UnifaunState> = {
  SET_OPTIONS (state: UnifaunState, options) {
    state.options = options
  },
  SET_ADDRESS (state: UnifaunState, addressData) {
    state.addressData = addressData
  },
  // setWeightAndDimensionValues (state: UnifaunState, values: Partial<UnifaunState>) {
  //   console.log('udc mutations values: ', values)
  //   state = {
  //     ...state,
  //     ...values
  //   }
  //   state.productWeightsAndDimensions = values.productWeightsAndDimensions
  //   console.log('udc mutations state: ', state)
  // },
  SET_VALIDATION (state: UnifaunState, result) {
    state.validation = result
  }
}
