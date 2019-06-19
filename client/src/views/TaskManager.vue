<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h1>Task Manager</h1>
      </div>
    </div>
    <tasks />
  </div>
</template>

<script>
  import Tasks from "@/components/Tasks.vue"

  export default {
    name: "",
    mounted() {
      this.$store.dispatch('getAllTasks')
    },
    props: [],
    data() {
      return {}
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },
    methods: {},
    components: {
      Tasks
    }
  }
</script>