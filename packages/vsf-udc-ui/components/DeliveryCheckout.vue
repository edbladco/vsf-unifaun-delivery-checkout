<template>
  <div>
    <div ref="udc" class="udc-widget" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { loadScript } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  async mounted () {
    if (!isServer) {
      await this.fetchUdc()
      this.mapUnifaunShippingMethods()
    }
  },
  computed: {
    ...mapGetters({
      shippingMethods: 'shipping/shippingMethods'
    })
  },
  data () {
    return {
      widget: null
    }
  },
  validations: {
    shipping: {
      shippingMethod: {
        required
      }
    }
  },
  methods: {
    async fetchUdc () {
      const defaultLanguage = currentStoreView().i18n.defaultLanguage
      await loadScript('https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/unifaun-checkout-all.min.js', 'udc')
      this.widget = window.UnifaunCheckout.createAt(this.$refs.udc, {
        language: defaultLanguage,
        disabled: false
      })

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
      json.jsonPayload = JSON.parse(json.jsonPayload)
      this.widget.updateList(json)
      this.$store.dispatch('unifaun-delivery-checkout/setOptions', this.widget.model.options)
    },
    mapUnifaunShippingMethods () {
      const shippingMethods = this.$store.getters['unifaun-delivery-checkout/shippingMethods']
      console.log('udc store: ', this.$store)
      console.log('udc shipping: ', shippingMethods)
      this.$store.dispatch('shipping/replaceMethods', shippingMethods)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/variables';

.udc-widget {
  display: none;
}
</style>
