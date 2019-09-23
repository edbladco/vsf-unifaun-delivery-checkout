<template>
  <div/>
</template>

<script>
import { isServer } from '@vue-storefront/core/helpers'

export default {
  data () {
    return {
      currentData: {}
    }
  },
  beforeMount () {
    if (!isServer) {
      this.$bus.$on('kcoAddressChange', async (data) => {
        if (JSON.stringify(data) !== this.currentData) {
          this.currentData = JSON.stringify(data)
          await this.$store.dispatch('unifaun-delivery-checkout/setShippingAddress', { data })
          await this.$store.dispatch('unifaun-delivery-checkout/loadUdc')
          this.$bus.$emit('updateKlarnaOrder')
        }
      })
    }
  },
  beforeDestroy () {
    this.$bus.$off('kcoAddressChange')
    this.$bus.$off('updateKlarnaOrder')
  }
}
</script>
