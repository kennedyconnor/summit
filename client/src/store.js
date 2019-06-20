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
    userTasks: [],
    pendingUserTasks: {},  //or emit an event- child calling parent
    tags: ["Health", "Organization", "Hygiene", "Finances"] //may move the tags in store.state into data if it is only referenced by the tasks component
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
    setUserTasks(state, userTasks) {
      state.userTasks = userTasks
    },
    setPendingUserTask(state, pendingTask) {
      Vue.set(state.pendingUserTasks, pendingTask.id, pendingTask.days)
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
          // debugger
          if (router.currentRoute.name == 'login') {
            router.push({ name: 'home' })
          } //add some conditionals to prevent unwanted redirects

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


    //#region -- TASKS

    async getAllTasks({ commit, dispatch }) {
      let res = await api.get('tasks')
      console.log('Getting all tasks', res.data)
      commit('setTasks', res.data)
    },

    newUserTask({ commit, dispatch }, task) {
      commit('setPendingUserTask', task)
    },

    //this is to send pending tasks to database
    async addUserTask({ commit, dispatch }, task) {
      try {
        let res = await api.post('/usertasks', task)
        console.log("Posted User Task: ", res)
      } catch (error) { console.error(error) }
    },

    async getUserTasksByUserId({ commit, dispatch }, userId) {
      try {

        let res = await api.get('/usertasks/users/' + userId)
       // console.log("Get user tasks by user: ", res.data)
        commit('setUserTasks', res.data)
      } catch (error) { console.error(error) }
    },

    //#endregion
  }

})
