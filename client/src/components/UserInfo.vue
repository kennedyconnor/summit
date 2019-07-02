<template>
  <div class="userInfoBox">
    <div class="row d-flex bg" style="height: auto;">
      <div class="col-sm-12 col-md-8 d-flex align-items-center justify-content-center">
        <img class="img" src="../assets/harvey.png" alt="Harvey" style="height: 25vh">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title"><b>{{ user.name }}</b>
              <hr>
            </h6>
            <span class="card-text"><b>Points: {{user.points}}<br></b>
            </span>
            <span class="card-text"><b>Summits: {{user.summits[0]}} <br></b>
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-md-4 d-flex align-items-center justify-content-center">
        <div class="card" style="width: auto; height: auto;">
          <div class="card-body">
            <h6 class="card-title"><b>Tags</b></h6>
            <hr>
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
    color: darkred;
  }

  .Organization {
    color: darkblue;
  }

  .Hygiene {
    color: rgb(110, 109, 109);
  }

  .Finances {
    color: darkgreen;
  }

  .card {
    height: 90%;
    word-wrap: unset;
    display: flex
  }

  .bg {
    background-color: #346575c4;
  }
</style>