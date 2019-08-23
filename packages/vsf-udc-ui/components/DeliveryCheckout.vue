<template>
  <div>
    <div ref="udc" class="udc-widget" />
  </div>
</template>

<script>
import { loadScript } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  async mounted () {
    if (!isServer) {
      this.$bus.$on('kcoAddressChange', async (data) => {
        console.log('udc kco data:', data)
        if (data.postal_code) {
          console.log('udc we got postal code!')
          await this.$store.dispatch('unifaun-delivery-checkout/setShippingAddress', { data })
          await loadScript('https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/unifaun-checkout-all.min.js', 'udc')
          await this.$store.dispatch('unifaun-delivery-checkout/loadUdc', { ref: this.$refs.udc, client: window.UnifaunCheckout })
        }
      })
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
