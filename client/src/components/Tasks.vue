<template>
  <div class="row">
    <div class="col-6">
      <ul>
        <li v-for="task in tasksByTag">
          {{task.title}} -- {{task.description}} -- {{task.points}}
        </li>
      </ul>
    </div>
    <div class="col-6">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Tags
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" v-for="tag in tags" @click="filter = tag">{{tag}}</a>
        </div>
      </div>
      <button class="btn btn-success" data-toggle="modal" data-target="#taskDetails" type="submit">Edit Tasks</button>
    </div>

    <!-- modal -->
    <div class="modal fade" id="taskDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">Select Task Day</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>


          <form class="modal-body" @submit.prevent="addTask(e)">
            <taskSelector v-for="task in tasksByTag" :taskData="task" :key="task._id" />
          </form>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save to Week</button>
          </div>
        </div>
      </div>
    </div>

    <!-- avoids treeshaking -->
    <div style="display:none">{{tasks}}</div>
  </div>
</template>

<script>
  import TaskSelector from '@/components/TaskSelector.vue'

  export default {
    name: "",
    props: [],
    data() {
      //may move the tags in store.state into data if it is only referenced by the tasks component
      return {
        tasksByTag: [],
        filter: '',
      }
    },
    watch: {
      filter: function (tag) {
        //run the filster to set tasksByTag
        this.filterTasks(tag)
      }
    },
    computed: {
      tasks() {
        this.tasksByTag = this.$store.state.tasks
        return this.$store.state.tasks
      },
      tags() {
        return this.$store.state.tags
      }
    },
    methods: {
      filterTasks(tag) {
        console.log('filtering by', tag)
        this.tasksByTag = this.tasks.filter(task => task.tags.includes(tag))
        console.log(this.tasksByTag)
      },

      addUserTask(task) {
        this.$store.dispatch('addUserTask', task)
      },

      addTask(e) {
        e.preventDefault()
        let form = e.target
        for (let i = 0; i < form.length; i++) {
          let input = form[i]
          if (input.type == 'checkbox' && input.checked) {
            userTask.day = input.name
          }
        }
      }
    },
    components: {
      TaskSelector
    }
  }
</script>