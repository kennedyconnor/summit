<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="dropdown">
        <button class="btn btn-info" data-toggle="modal" data-target="#taskDetails">Select
          Task</button>
        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Select Goal
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" v-for="tag in tags" @click="filter = tag"
            style="color: #346575; cursor: pointer"><b>{{tag}}</b></a>
        </div>
      </div>
      <div class="row border">
        <div class="col-sm-6 border" v-for="task in tasksByTag">
          <b>{{task.title}} - {{task.description}} {{task.points}} points</b>
        </div>
      </div>
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

          <form class="modal-body">
            <taskSelector v-for="task in tasksByTag" :taskData="task" :reset="reset" :key="task._id" />
          </form>


          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-info" @click="saveUserTasks">Save to
              Week</button>
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
        reset: 0
      }
    },
    watch: {
      filter: function (tag) {
        //run the filter to set tasksByTag
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

      saveUserTasks() {
        let tasks = this.$store.state.pendingUserTasks
        let userId = this.$store.state.user._id
        for (const taskId in tasks) {
          if (tasks[taskId][0]) {
            const instances = tasks[taskId]
            let data = {
              userId,
              taskId,
              instances
            }
            data.instances = data.instances.map(d => {
              return { day: d }
            })
            this.$store.dispatch('addUserTask', JSON.parse(JSON.stringify(data)))
          }
        }
        this.reset++
        $("#taskDetails").modal("hide");
        $(".modal-backdrop").remove();
        this.$store.commit("emptyPendingUserTasks")
      }
    },

    components: {
      TaskSelector
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
  }

  .btn-info {
    background-color: #346575;
  }

  .btn-info:hover {
    color: rgb(115, 190, 219);
    text-decoration: underline;
  }


  /* 
  .dropdown-item {
    color: #346575;
  } */

  /* 
  .btn-info:hover {
    background-color: #346575;
  } */
</style>