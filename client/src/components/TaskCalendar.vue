<template>
  <div class="weekDays">
    <div class="row">
      <DayTasks v-for="day in days" :day="day" />
    </div>
  </div>
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
      //this.$store.dispatch('getUserTasksByUserId', this.user._id)
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