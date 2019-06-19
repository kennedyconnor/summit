import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'
let auth = axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})
let api = axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    tasks: [],
    goals: [],
    userTasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setGoals(state, goals) {
      state.goals = goals
    },
    setUseTasks(state, userTasks) {
      state.userTasks = userTasks
    }
  },

  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' }) //add some conditionals to prevent unwanted redirects

        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },

    async logout({ commit, dispatch }) {
      await auth.delete('logout')
      commit('setUser', {})
      router.push({ name: 'login' })
    },

    async getUserByEmail({ commit, dispatch }, payload) {
      try {
        let res = await auth.get(payload.email)
        console.log('got User by email:', res.data)
      } catch (error) { console.error(error) }
    },
    //#endregion
  }
})
