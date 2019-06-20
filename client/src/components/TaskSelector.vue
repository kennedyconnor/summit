<template>
  <div class="taskSelector">
    <li>
      {{taskData.title}} <br> {{taskData.description}} -- {{taskData.points}} <br>
      <label class="checkbox-inline"><input type="checkbox" name="Sunday" value="Sunday" v-model="days">Sun</label>
      <label class="checkbox-inline"><input type="checkbox" name="Monday" value="Monday" v-model="days">Mon</label>
      <label class="checkbox-inline"><input type="checkbox" name="Tuesday" value="Tuesday" v-model="days">Tues</label>
      <label class="checkbox-inline"><input type="checkbox" name="Wednesday" value="Wednesday"
          v-model="days">Wed</label>
      <label class="checkbox-inline"><input type="checkbox" name="Thursday" value="Thursday" v-model="days">Thur</label>
      <label class="checkbox-inline"><input type="checkbox" name="Friday" value="Friday" v-model="days">Fri</label>
      <label class="checkbox-inline"><input type="checkbox" name="Saturday" value="Saturday" v-model="days">Sat</label>
    </li>
    <br>
    <button @click.prevent="addUserTasks">Add Tasks</button>
  </div>
</template>

<script>
  export default {
    name: "TaskSelector",
    props: ["taskData"],
    data() {
      return {
        days: [],
        newUserTask: {
          userId: this.$store.state.user._id,
          taskId: this.taskData._id,
          instances: []
        }
      }
    },
    computed: {},
    methods: {
      addUserTasks() {
        this.days.forEach(dayString => {
          this.newUserTask.instances.push({ day: dayString })
        })
        this.$store.dispatch('addUserTask', this.newUserTask);
      }
    },
    components: {}
  }
</script>