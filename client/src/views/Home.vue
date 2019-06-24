<template>
  <div class="home parallax">
    <div class="row">
      <!-- <img class="parallax" alt="Summit Mountain" src="../assets/mountain.png"> -->
      <div class="col d-flex justify-content-end">
        <div class="card" style="width: 18rem;">
          <div class="card-header">{{ day }}
          </div>
          <ul class="list-group list-group-flush" v-for="task in instances">
            <li class="list-group-item">{{task.taskData.title}} --
              {{task.taskData.points}} points</li>
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
      TaskCalendar
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  .parallax {
    /* background-image: url("../assets/mountain.png"); */
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    background-attachment: fixed;
  }
</style>