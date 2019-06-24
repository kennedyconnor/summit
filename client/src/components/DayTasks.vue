<template>

  <div class="col-1.5">
    <h3>{{day}}</h3>
    <!-- <li v-for="task in dayTasks">{{task.taskId.title}} -- {{task.taskId.points}}
        Completed: {{task.instances.filter(x => x.day == day)[0].completed }} -->
    <!-- this won't work if you have multiple instance of a task on the same day -->
    <div v-for="task in instances">
      <label class="checkbox" v-bind:class="{isChecked: task.completed}"><input type="checkbox" v-model="task.completed"
          @click="toggleTaskStatus(task, $event)">{{task.taskData.title}} --
        {{task.taskData.points}}
        Completed: {{task.completed }}
      </label>
      <button class="btn btn-danger" type="button" @click="deleteUserTaskInstance(task)">Delete</button>
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
        let tasks = this.$store.state.userTasks || []
        // debugger
        let dayTasks = tasks.filter(task => {
          return task.instances.some(instance => this.day == instance.day)
        })
        return dayTasks || []
      },
      instances() {
        let tasks = []
        this.dayTasks.forEach(dt => {
          tasks = [...tasks, ...dt.instances.map(i => {
            i.userTaskId = dt._id
            i.taskData = dt.taskId
            return i;
          })]
        })
        return tasks.filter(t => t.day == this.day)
      }
    },
    methods: {
      deleteUserTaskInstance(userTask) {
        let arrayInstances = this.dayTasks.filter(dt => dt._id == userTask.userTaskId)[0].instances
        let editedTask = {
          id: userTask.userTaskId,
          userId: this.$store.state.user._id,
          instances: arrayInstances.filter(day => day.day !== this.day)
          // instances: userTask.instances.filter(day => day.day !== this.day)
        }
        if (editedTask.instances[0]) { this.$store.dispatch("editUserTaskById", editedTask) }
        else { this.$store.dispatch("deleteUserTask", editedTask) }
      },

      toggleTaskStatus(task, event) {
        task.completed = !task.completed
        let updatedUserTask = this.dayTasks.find(t => task.userTaskId == t._id)

        this.$store.dispatch('toggleTaskStatus', updatedUserTask)
      }
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

<style>
  .isChecked {
    text-decoration: line-through;
    color: goldenrod;
  }
</style>