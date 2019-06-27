<template>
  <div class=" border">
    <h3 style="padding-top: 10px; padding-bottom: 0px;">{{day}}</h3>
    <hr style="padding: 0px;">
    <div v-for="task in instances" class="d-flex text-nowrap auto task" :class="task.taskData.tags[0]">
      <label class="checkbox " v-bind:class="{isChecked: task.completed}"><input type="checkbox"
          v-model="task.completed" @click="toggleTaskStatus(task, $event)"> {{task.taskData.title}} </label>
      <button v-if="task.taskData.completed = 'true'" class="btn fas fa-trash-alt fa-xs"
        @click="deleteUserTaskInstance(task)"></button>
      <!-- <div v-for="task in instances" :class="task.taskData.tags[0]">
          <label class="checkbox" v-bind:class="{isChecked: task.completed}"><input type="checkbox"
              v-model="task.completed" @click="toggleTaskStatus(task, $event)"> <b>{{task.taskData.title}} -
              {{task.taskData.points}} points </b><button v-if="task.taskData.completed = 'true'"
              class="btn fas fa-trash-alt fa-sm" @click="deleteUserTaskInstance(task)"></button>
          </label>

          <br>
        </div> -->
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
      },
      tags() {
        return this.$store.state.tags
      },
    },
    methods: {
      deleteUserTaskInstance(userTask) {
        let arrayInstances = this.dayTasks.filter(dt => dt._id == userTask.userTaskId)[0].instances
        let editedTask = {
          _id: userTask.userTaskId,
          userId: { _id: this.$store.state.user._id },
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

  .Health {
    color: red;
  }

  .task button {
    opacity: 0;
    transition: all .15s linear;
    pointer-events: none;

  }

  .task:hover button {
    pointer-events: all;
    opacity: 1;

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

  label {
    font-size: 1em
  }
</style>