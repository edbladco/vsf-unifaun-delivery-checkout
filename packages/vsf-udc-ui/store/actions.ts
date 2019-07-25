import { UnifaunState } from '../types/UnifaunState'
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

export const actions: ActionTree<UnifaunState, RootState> = {
  async loadUdc ({ commit, getters, dispatch }, { ref, client }) {
    const widget = client.createAt(ref, getters.unifaunOptions)
    const username = 'WPWHV5VISQK7NZTN'
    const password = 'VIGI53KEQHCN7FRGBF2HDDA7'
    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ':' + password).toString('base64'))
    headers.set('Content-Type', 'application/json')
    const response = await fetch('https://api.unifaun.com/rs-extapi/v1/delivery-checkouts/96d9eaad-018b-4dba-b4b8-7842fcd82440?language=sv&currency=sek&tocountry=se&tozipcode=34371', {
      method: 'GET',
      headers: headers
    })
    const json = await response.json()
    widget.updateList(json)
    commit('setOptions', widget.model.options)
    dispatch('shipping/replaceMethods', getters.shippingMethods, { root: true })
  }
}
