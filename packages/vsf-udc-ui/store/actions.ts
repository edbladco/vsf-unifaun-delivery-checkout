import { UnifaunState } from '../types/State'
import { ActionTree, ActionContext, Store } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

export const actions: ActionTree<UnifaunState, RootState> = {
  async setFoo ({ commit, state }, string) {
    commit('foo', string)
  }
}
