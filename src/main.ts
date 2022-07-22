import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import Toaster from '@meforma/vue-toaster'
import moment from 'moment'

moment.locale('fr')
library.add(fas, fab, far)

createApp(App)
  .use(store)
  .use(Toaster)
  .component('fai', FontAwesomeIcon)
  .mount('#app')
