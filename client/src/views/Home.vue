<template>
  <div>
    <div class="row home">
      <img class="background" alt="Summit Mountain" src="../assets/mountain2.png">
      <div class="col-12 d-flex justify-content-between">
        <div>
          <ProgressBar />
        </div>
        <div class="card" style="width: auto">
          <div class="card-header" style="background-color: #346575">{{ day }}
          </div>
          <ul class="list-group list-group-flush" v-for="task in instances" v-if="task.completed == false">
            <label class="checkbox-inline task-font" v-bind:class="{isChecked: task.completed}"><input type="checkbox"
                v-model="task.completed" @click="toggleTaskStatus(task, event)"
                class="task-font">{{task.taskData.title}} -- {{task.taskData.points}} points</li></label>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  import DayTasks from '@/components/DayTasks.vue';
  import TaskCalendar from '@/components/TaskCalendar.vue';
  import ProgressBar from '@/components/ProgBar.vue';

  export default {
    name: 'home',
    data() {
      return {
        day: new Date().toLocaleString('en-us', { weekday: 'long' })
      }
    },
    // props: ["day"],
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
    components: {
      DayTasks,
      TaskCalendar,
      ProgressBar
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },

      toggleTaskStatus(task, event) {
        task.completed = !task.completed
        let updatedUserTask = this.dayTasks.find(t => task.userTaskId == t._id)

        this.$store.dispatch('toggleTaskStatus', updatedUserTask)
      }
    },
    mounted() {
      console.log("Home has been Mounted!")
      this.$store.dispatch('getUserTasksByUserId', this.$store.state.user._id)
    },
    created() {
      console.log("Home has been Created!")
    }
  }

</script>

<style>
  img {
    background-size: cover;
    background-repeat: no-repeat;
    height: 95%;
    background-attachment: fixed;
    position: absolute;
  }

  /* .background {
    background-size: cover;
    background-repeat: no-repeat;
    height: 92vh;
    background-attachment: fixed;
    position: absolute;
  } */

  .isChecked {
    text-decoration: line-through;
    color: goldenrod;
  }

  .vertical {
    display: inline-block;
    width: 20%;
    height: 80vh;
  }

  /* 
  .progress-bar {
    box-shadow: inset 0px 4px 6px rgba(100, 100, 100, 0.6);
    transform: rotate(-90deg);
  } */

  .card-header {
    color: whitesmoke;
    font-family: 'Rock Salt', serif;
    font-size: 25px;
    font-weight: bold;
  }

  .task-font {
    font-family: 'Raleway', sans-serif;
    text-align: start;
    padding: 5px 5px 0px 5px;
  }
</style>