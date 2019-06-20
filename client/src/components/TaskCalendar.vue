<template>
  <div class="weekDays">
    <div class="row d-flex justify-content-around">

      <DayTasks v-for="day in days" :day="day" />

    </div>
  </div>
  </div>
</template>

<script>
  import DayTasks from "@/components/DayTasks.vue"

  export default {
    name: "",
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