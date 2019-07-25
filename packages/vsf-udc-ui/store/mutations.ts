import { MutationTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'

export const mutations: MutationTree<any> = {
  setOptions (state: any, options) {
    state.options = options
  }
}
