<template>
  <div class="userInfoBox">
    <div class="row d-flex bg-secondary" style="height: 35vh">
      <div class="col-sm-7 d-flex align-items-center justify-content-center" style="height:100%">
        <img class="img-fluid" src="../assets/harvey.png" alt="" style="height: 90%">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title"><b>{{ user.name }}</b>
              <hr>
            </h6>
            <span class="card-text"><b>Points: {{user.points}}<br></b>
            </span>
            <span class="card-text"><b>Summits: 0 <br></b>
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-4 d-flex align-items-center justify-content-center">
        <div class="card" style="width: 12rem; height: 90%">
          <div class="card-body">
            <h6 class="card-title"><b>Tags</b>
              <hr>
            </h6>
            <span class="card-text" :class="tag" v-for="tag in tags"><b>{{ tag }}<br></b>
            </span>
          </div>
        </div>
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
      },
      tags() {
        return this.$store.state.tags
      },
    },
    methods: {},
    components: {}
  }
</script>

<style>
  .Health {
    color: red;
  }

  .Organization {
    color: darkblue;
  }

  .Hygiene {
    color: purple;
  }

  .Finances {
    color: darkgreen;
  }

  .img-fluid {
    height: 100%
  }
</style>