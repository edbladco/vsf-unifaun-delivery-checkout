import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { UnifaunState } from '../types/State'

export const module: Module<UnifaunState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}
