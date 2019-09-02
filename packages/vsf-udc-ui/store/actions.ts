import { UnifaunState } from '../types/UnifaunState'
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import config from 'config'

export const actions: ActionTree<UnifaunState, RootState> = {
  async loadUdc ({ commit, getters, dispatch }, { ref, client }) {
    const widget = client.createAt(ref, getters.getUnifaunOptions)
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
    commit('SET_OPTIONS', widget.model.options)
    dispatch('shipping/replaceMethods', getters.getShippingMethods, { root: true })
  },
  async setShippingAddress ({ commit }, { data }) {
    commit('SET_ADDRESS', data)
  },
  /**
   * The validation is only handled by Unifaun for now.
   */
  async validateForPostNord ({ commit, getters }) {
    const { productWeightsAndDimensions } = getters.getValues
    const { country } = getters.getShippingAddress
    const validationRules = {
      maxWeight: 2000,
      maxHeight: 7,
      maxWidth: 24,
      maxLength: 34,
      allowedCountries: [
        'se',
        'dk',
        'gb',
        'nl',
        'fi',
        'de',
        'pl'
      ]
    }
    const { totalWeight } = getters.getValues
    if (totalWeight > validationRules.maxWeight) {
      commit('SET_VALIDATION', false)
      return
    }
    const validate = productWeightsAndDimensions.every((product) => {
      return validationRules.maxHeight > product.height &&
        validationRules.maxWidth > product.width &&
        validationRules.maxLength > product.length &&
        validationRules.allowedCountries.includes(country)
    })
    if (!validate) {
      commit('SET_VALIDATION', false)
    }
  }
}
