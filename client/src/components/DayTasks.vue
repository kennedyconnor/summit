<template>

  <div class="col-1.5">
    <h3>{{day}}</h3>
    <!-- <li v-for="task in dayTasks">{{task.taskId.title}} -- {{task.taskId.points}}
        Completed: {{task.instances.filter(x => x.day == day)[0].completed }} -->
    <!-- this won't work if you have multiple instance of a task on the same day -->
    <div v-for="task in dayTasks">
      <label class="checkbox"><input type="checkbox">{{task.taskId.title}} --
        {{task.taskId.points}}
        Completed: {{task.instances.filter(x => x.day == day)[0].completed }}
      </label>
      <button class="btn btn-danger" type="button" @click="deleteUserTask(task._id)">Delete</button>
      <br>
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
          return task.instances.some(instance => this.day == instance.day)
        })
        return dayTasks
      }
    },
    methods: {
      deleteUserTask(id) {
        this.$store.dispatch("deleteUserTask", id)
      }
    },
    components: {}
  }
</script>