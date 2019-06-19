<template>
  <div class="login">
    <h1>Login Page</h1>
    <form v-if="loginForm" @submit.prevent="loginUser">
      <input type="email" v-model="creds.email" placeholder="Email">
      <input type="password" v-model="creds.password" placeholder="Password">
      <br>
      <button type="submit" class="btn btn-info">Login</button>
    </form>
    <form v-else @submit.prevent="registerUser">
      <input type="text" v-model="newUser.name" placeholder="Enter your name">
      <input type="email" v-model="newUser.email" placeholder="Enter your email">
      <input type="password" v-model="newUser.password" placeholder="Password">
      <br>
      <button type="submit" class="btn btn-info">Register</button>
    </form>
    <div class="action" @click="loginForm = !loginForm">
      <p v-if="loginForm">Click here to Register</p>
      <p v-else>Go back to Login</p>
    </div>

  </div>
</template>

<script>
  import router from '@/router.js'

  export default {
    name: "login",
    props: [],
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    computed: {},
    methods: {
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      registerUser() {
        this.$store.dispatch("register", this.newUser);
      }
    },
    components: {}
  }
</script>