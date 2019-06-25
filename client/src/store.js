import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import { nextTick } from 'q';

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
    mostRecentSunday: 0,
    summitThreshold: 2500,
    tasks: [],
    goals: [],
    userTasks: [],
    pendingUserTasks: {},  //or emit an event- child calling parent
    tags: ["Health", "Organization", "Hygiene", "Finances"], //may move the tags in store.state into data if it is only referenced by the tasks component
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setMostRecentSunday(state, num) {
      state.mostRecentSunday = num
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
    },
    emptyPendingUserTasks(state) {
      // debugger
      state.pendingUserTasks = {}
    }
  },

  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      debugger
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },
    authenticate({ commit, dispatch }) {
      // debugger
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          dispatch('getUserTasksByUserId', res.data._id)
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

    async editUser({ commit, dispatch }, payload) {
      try {
        let res = await auth.put(payload._id, payload)
        commit('setUser', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async summitCheck() {
      try {
        let res = await api.get('/usertasks/users/' + this.state.user._id)
        let lastTask = false
        this.commit('setUserTasks', res.data)
        this.dispatch("clearUser")
        let userTasks = this.state.userTasks
        userTasks.forEach(ut => {
          ut.accounted = true
          this.dispatch("clearUserTask", ut) //SENDING GET EVERY CHANGE,  CAN FIX???
        })
      } catch (error) {

      }
    },

    clearUser({ commit, dispatch }) {
      if (this.state.user.points >= this.state.summitThreshold) {
        alert("Weekly Summit Achieved!")
        this.state.user.summits[0]++
      }
      else {
        alert("Keep at it slugger. Tomorrow is a new day!")
      }
      this.state.user.summits[1]++
      this.state.user.points = 0
      this.state.user.mostRecentSunday = this.state.mostRecentSunday
      this.dispatch('editUser', this.state.user)
    },

    mostRecentSunday({ commit, dispatch }) { // return the millisecond count of the most recent sunday
      let anchorSunday = 1561269660000 //june 23 2019 12:01AM , first sunday we count from
      let mostRecentSunday = anchorSunday
      let currentDate = Date.now()
      let weekMilliseconds = 604800000 // # of milliseconds in a week
      while ((mostRecentSunday + weekMilliseconds) < currentDate) {
        mostRecentSunday += weekMilliseconds
      }
      commit('setMostRecentSunday', mostRecentSunday)
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

    async getUserTasksAndUpdatePoints({ commit, dispatch }, userId) {
      try {
        let res = await api.get('/usertasks/users/' + userId)
        // console.log("Get user tasks by user: ", res.data)
        commit('setUserTasks', res.data)
        this.dispatch('calculateUserPoints')
      } catch (error) { console.error(error) }
    },

    async calculateUserPoints({ commit, dispatch }) {
      try {
        let pointSum = 0
        this.state.userTasks.forEach(ut => {
          let count = 0
          ut.instances.forEach(instance => { if (instance.completed) { count++ } })
          pointSum += count * ut.taskId.points
        })
        this.state.user.points = pointSum
        this.dispatch('editUser', this.state.user)
      } catch (error) {
        console.error(error)
      }
    },

    async editUserTaskById({ commit, dispatch }, task) {
      try {
        debugger
        let res = await api.put('/usertasks/' + task.id, task)
        console.log('edited Usertask', res.data)
        this.dispatch('getUserTasksByUserId', task.userId)
      } catch (error) { console.error(error) }
    },

    async deleteUserTask({ dispatch, commit }, task) {
      try {
        let res = await api.delete('/usertasks/' + task.id)
        console.log(res.data)
        this.dispatch('getUserTasksByUserId', task.userId)

      } catch (error) { console.error(error) }
    },

    async toggleTaskStatus({ commit, dispatch }, task) {
      try {
        let res = await api.put('/usertasks/' + task._id, task)
        this.dispatch('getUserTasksAndUpdatePoints', task.userId._id)
      } catch (error) { console.error(error) }
    },

    async clearUserTask({ commit, dispatch }, usertask) {
      try {
        await api.put('/usertasks/' + usertask._id, usertask)
        dispatch('getUserTasksByUserId', usertask.userId._id)
      } catch (error) { console.error(error) }
    }

    //#endregion
  }

})
