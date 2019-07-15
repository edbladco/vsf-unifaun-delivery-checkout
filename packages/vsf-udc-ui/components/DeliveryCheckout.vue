<template>
  <div>
    <div ref="udc" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { loadScript } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'
export default {
  mounted () {
    if (!isServer) {
      this.renderUdc()
    }
  },
  methods: {
    async renderUdc () {
      await loadScript('https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/unifaun-checkout-all.min.js', 'udc')
      const widget = window.UnifaunCheckout.createAt(this.$refs.udc, {
        language: 'se',
        disabled: false,
        installCSS: true
      })
      window.widget = widget
      console.log('udc', widget)
    }
  }
}
</script>
