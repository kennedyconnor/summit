<template>
  <div class="home parallax">
    <div>
      <button @click="logout">Log Out</button>
      <img class="parallax" alt="Summit Mountain" src="../assets/mountain.png">
    </div>
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

<style>
  .parallax {
    /* background-image: url("../assets/mountain.png"); */
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    background-attachment: fixed;
  }
</style>