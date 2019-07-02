<template>
  <div class="container-fluid" id="app">
    <div class="row header-style">
      <div class="col-sm-1 d-flex justify-content-start">
        <div class="btn-group">
          <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="fas fa-bars fa-1x"></i>
          </button>
          <div class="dropdown-menu" style="padding-bottom: 0">
            <router-link class="router-link-style" to="/login"><b>Login</b><br></router-link>
            <router-link class="router-link-style" to="/"><b>Home</b><br></router-link>
            <router-link class="router-link-style" to="/task-manager"><b>Task Manager</b><br></router-link>
            <router-link class="router-link-style" to="/profile"><b>My Profile</b><br></router-link>
            <div class="dropdown-divider" style="margin: 0;"></div>
            <a class="dropdown-item log-out"
              style="background-color: #346575; color: white; cursor: pointer; font-family: 'Rock Salt', cursive;"
              @click="logout">Log
              Out</a>
          </div>
        </div>
        <div class="header-title col-sm-4 d-flex align-items-center">
          <h2 style="font-family: 'Rock Salt', cursive; color: #346575;
">Summit</h2>
        </div>
      </div>
    </div>
    <router-view />


  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .header-title {
    font-family: 'Rock Salt', cursive;
    color: #346575;
  }

  .header-style {
    padding-top: 10px;
  }

  .router-link-style {
    color: #346575;
    padding-left: 5px;
  }

  .router-link-style:hover {
    color: rgb(115, 190, 219);
  }

  .log-out:hover {
    text-decoration: underline;
    /* color: rgb(115, 190, 219); */
  }

  .btn-info {
    background-color: #346575;
    margin: 4px;
    /* border-color: #346575; */
  }
</style>