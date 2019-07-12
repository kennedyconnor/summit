import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import TaskManager from './views/TaskManager.vue'
import Profile from './views/Profile.vue'
import Team from './views/Team.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/task-manager',
      name: 'task-manager',
      component: TaskManager
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    }

  ]
})
