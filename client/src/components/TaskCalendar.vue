<template>
  <div class="weekDays">
    <div class="row">
      <!-- <div class="col-sm-4"> -->
      <DayTasks v-for="day in days" :day="day" />
    </div>
  </div>
  </div>
  </div>
  <!--  -->
</template>

<script>
  import DayTasks from "@/components/DayTasks.vue"

  export default {
    name: "weekDays",
    props: [],
    data() {
      return {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      }
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
    components: {
      DayTasks
    }
  }
</script>

<style>

</style>