<template>
  <div class="userInfoBox">
    <div class="row">
      <div class="col-2 d-flex justify-content-start">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="col-8 d-flex align-items-center justify-content-start">
        <ul>
          <li>Handle: {{user.name}}</li>
          <li>Points: {{user.points}}</li>
          <li>Summits: </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: [],
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {},
    components: {}
  }
</script>