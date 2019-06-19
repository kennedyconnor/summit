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
    </div>

    <!-- avoids treeshaking -->
    <div style="display:none">{{tasks}}</div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: [],
    data() {
      //may move the tags in store.state into data if it is only referenced by the tasks component
      return {
        tasksByTag: [],
        filter: ''
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
      }
    },
    components: {}
  }
</script>