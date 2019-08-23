import { UnifaunState } from '../types/UnifaunState'
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import config from 'config'

export const actions: ActionTree<UnifaunState, RootState> = {
  async loadUdc ({ commit, getters, dispatch }, { ref, client }) {
    const widget = client.createAt(ref, getters.unifaunOptions)
    const username = config.unifaun.username
    const password = config.unifaun.password
    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ':' + password).toString('base64'))
    headers.set('Content-Type', 'application/json')
    const url = getters.getUrl
    const response = await fetch(url, {
      method: 'GET',
      headers
    })
    const json = await response.json()
    widget.updateList(json)
    commit('setOptions', widget.model.options)
    dispatch('shipping/replaceMethods', getters.shippingMethods, { root: true })
  },
  async setShippingAddress ({ commit, getters, dispatch }, { data }) {
    commit('setAddress', data)
    const { addressData } = getters.setShippingAddress
    console.log('udc addressdata: ', addressData)
  }
}
