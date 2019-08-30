<template>
  <div>
    <div ref="udc" class="udc-widget" />
  </div>
</template>

<script>
import { loadScript } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  data () {
    return {
      currentData: ''
    }
  },
  beforeMount () {
    if (!isServer) {
      this.$bus.$on('kcoAddressChange', async (data) => {
        if (JSON.stringify(data) !== this.currentData) {
          this.currentData = JSON.stringify(data)
          await this.$store.dispatch('unifaun-delivery-checkout/setShippingAddress', { data })
          await this.$store.dispatch('unifaun-delivery-checkout/validateForPostNord')
          await loadScript('https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/unifaun-checkout-all.min.js', 'udc')
          await this.$store.dispatch('unifaun-delivery-checkout/loadUdc', { ref: this.$refs.udc, client: window.UnifaunCheckout })
        }
      })
    }
  },
  beforeDestroy () {
    this.$bus.$off('kcoAddressChange')
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/variables';

.udc-widget {
  display: none;
}
</style>
