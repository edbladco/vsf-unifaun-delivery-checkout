<template>
  <div>
    <div class="row">
      <div class="col-xs-11 col-sm-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-7">
            <h3 class="m0 mb5 shipping-title weight-700">
              2. {{ $t('Shipping') }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row m0">
      <div class="col-md-12">
        <div class="row bg-white">
          <div class="col-md-12 p0">
            <label class="radioStyled p20">
              <div class="row shipping-methods weight-700">
                <div class="col-md-2 col-sm-3 col-xs-4 px15 align-center">
                  <!-- <img :src="`/assets/logos/${method.method_code}.png`" alt=""> -->
                </div>
                <div class="col-md-8 col-sm-8 col-xs-8">
                  <p class="weight-400 m0 small-text">method.carrier_title </p>
                  <span>method.method_title<span class="hidden-md">(method.amount | price )</span></span>
                </div>
                <span class="hidden-xs">method.amount | price</span>
              </div>
              <input type="radio">
              <span class="checkmark" />
              <span class="checkbox-border" />
            </label>
          </div>
          <span class="validation-error">
            {{ $t('Field is required') }}
          </span>
        </div>
      </div>
    </div>
    <div ref="udc" />
  </div>
</template>

<script>
import { loadScript } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  async mounted () {
    if (!isServer) {
      await this.renderUdc()
      this.mapShippingMethods()
    }
  },
  data () {
    return {
      shippingMethods: null,
      widget: null
    }
  },
  methods: {
    async renderUdc () {
      await loadScript('https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/unifaun-checkout-all.min.js', 'udc')
      this.widget = window.UnifaunCheckout.createAt(this.$refs.udc, {
        language: 'se',
        disabled: false,
        useIcons: true,
        resultCallback: function (cb) {
          console.log('udc callback: ', cb)
        }
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
      console.log('udc widget', this.widget)
    },
    mapShippingMethods () {
      this.shippingMethods = this.widget.model.options.map(option => {
        let subOptions = []
        console.log('udc option')
        if (option.subOptions) {
          console.log('udc suboptions')
          subOptions = option.subOptions.map(suboption => ({
            name: suboption.name,
            description: suboption.description1,
            carrierId: suboption.carrierId | ''
          }))
        }

        return {
          name: option.name,
          description: option.description1,
          subOptions,
          carrierId: option.carrierId
        }
      })
    }
  }
}
</script>
