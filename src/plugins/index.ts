import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

import type { App } from 'vue'

pinia.use(({ store }) => {
  store.$router = markRaw(router)
  store.$route = markRaw(router.currentRoute._value)
})

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
