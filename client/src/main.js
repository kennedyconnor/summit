import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'

Vue.config.productionTip = false

class AuthService {
  async Authenticate() {
    //debugger
    let res = await auth.get('authenticate')
    return res.data
  }
}

async function appStart() {
  let _authService = new AuthService
  try {
    let user = await _authService.Authenticate()
    store.commit('setUser', user)
    if (router.currentRoute.name == 'login') {
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.error(error)
    router.push({ name: 'login' })
  }

  new Vue({
    router,
    store,
    // created() {
    //   this.$store.dispatch('authenticate');
    // },
    render: function (h) { return h(App) }
  }).$mount('#app')

}

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'
let auth = axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})


appStart()







