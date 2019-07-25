import { MutationTree } from 'vuex'
import { UnifaunState } from '../types/UnifaunState'

export const mutations: MutationTree<UnifaunState> = {
  foo (state: UnifaunState, string) {
    state.foo = string
  }
}
