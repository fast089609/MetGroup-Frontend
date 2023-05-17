import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import './utils/fontAwesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(store)
.use(router)
.mount('#app')
