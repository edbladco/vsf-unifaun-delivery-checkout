import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { getters } from './getters'
import { UnifaunState } from '../types/UnifaunState'

export const module: Module<any, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
