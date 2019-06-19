<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"> <button @click="logout">Log Out</button>
  </div>
</template>

<script>
  // @ is an alias to /src


  export default {
    name: 'home',
    components: {

    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>