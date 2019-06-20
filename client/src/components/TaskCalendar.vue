<template>
  <div class="weekDays">
    <div class="row d-flex justify-content-around">
      <div class="col-1.5">
        <h3>Sunday</h3>
        <div class="col">

        </div>
      </div>
      <div class="col-1.5">
        <h3>Monday</h3>
        <div class="col">

        </div>
      </div>
      <div class="col-1.5">
        <h3>Tuesday</h3>
        <div class="col">

        </div>
      </div>
      <div class="col-1.5">
        <h3>Wednesday</h3>
        <div class="col">

        </div>
      </div>
      <div class="col-1.5">
        <h3>Thursday</h3>
        <div class="col">

        </div>
      </div>
      <div class="col-1.5">
        <h3>Friday</h3>
        <div class="col">

        </div>
      </div>
      <div class="col-1.5">
        <h3>Saturday</h3>
        <div class="col">

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
    mounted() {
      this.$store.dispatch('getUserTasksByUserId', this.user._id)
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