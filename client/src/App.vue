<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col d-flex justify-content-end">
        <div class="btn-group">
          <button type="button" class="btn btn-info"><i class="fas fa-bars fa-1x"></i></button>
          <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <router-link to="/">Home<br></router-link>
            <router-link to="/login">Login<br></router-link>
            <router-link to="/task-manager">Task Manager<br></router-link>
            <router-link to="/profile">My Profile<br></router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="logout">Log Out</a>
          </div>
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
</style>