import { UnifaunState } from '../types/UnifaunState'
import { ActionTree, ActionContext, Store } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

export const actions: ActionTree<any, RootState> = {
  async setOptions ({ commit, state }, options) {
    commit('setOptions', options)
  }
}
