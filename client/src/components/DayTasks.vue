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
      toggleTaskStatus(task) {
        if (task.instances.some(instance => this.day == instance.day)) {
          task.instances.completed = !task.instances.completed
        }
        this.$store.dispatch('toggleTaskStatus', task)
        console.log(task.instances.completed)

      },

    },
    components: {}
    //when the checkbox is selected, flip completed bool from false to true
    //when UserTask completed is true, use a strikethrough script to show that task is completed. 
    //Strikethrough should go away when task is unchecked

    // toggleTodoStatus(todoId) {
    //   let todo = _state.todos.find(todo => todo._id == todoId)
    //   todo.completed = !todo.completed //flips the bool
    //   todoApi.put(todoId, todo)
    //     .then(res => {
    //       this.getTodos()

    //     })
    //     .catch(err => _setState('error', err.response.data))
    // }
  }
</script>