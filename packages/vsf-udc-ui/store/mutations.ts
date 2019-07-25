import { MutationTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'

export const mutations: MutationTree<UnifaunState> = {
  setOptions (state: UnifaunState, options) {
    state.options = options
  }
}
