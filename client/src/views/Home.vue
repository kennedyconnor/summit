<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- Drop Down Button -->


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