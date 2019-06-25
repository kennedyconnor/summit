<template>
  <div class="profile">
    <h1>My Profile</h1>
    <UserInfo />
    <TaskCalendar />
  </div>
</template>

<script>
  import UserInfo from "@/components/UserInfo.vue"
  import TaskCalendar from "@/components/TaskCalendar.vue"

  export default {
    name: "Profile",
    props: [],
    data() {
      return {}

    },
    mounted() {
      this.$store.dispatch('getUserTasksByUserId', this.$store.state.user._id)
    },
    methods: {},
    components: {
      UserInfo,
      TaskCalendar,
    }
  }
</script>