<template>

  <div class="col-1.5">

    <h3>{{day}}</h3>
    <ul>

      <li v-for="task in dayTasks">{{task.taskId.title}} -- {{task.taskId.points}}
        Completed: {{task.instances.filter(x => x.day == day)[0].completed }}
        <!-- this won't work if you have multiple instance of a task on the same day -->
      </li>
    </ul>
    <div class="col">
    </div>

  </div>

</template>

<script>
  export default {
    name: "",
    props: ["day"],
    data() {
      return {}
    },
    computed: {
      dayTasks() {
        let tasks = this.$store.state.userTasks
        // debugger
        let dayTasks = tasks.filter(task => {
          return task.instances.some(d => this.day == d.day)
        })
        return dayTasks
      }
    },
    methods: {},
    components: {}
  }
</script>