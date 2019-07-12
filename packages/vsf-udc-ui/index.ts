import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'unifaun-delivery-checkout'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: {} }] },
}

export const UnifaunDeliveryCheckout = new VueStorefrontModule(moduleConfig)
