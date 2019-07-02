<template>
  <div class="profile">
    <h2 style="color: #346575; font-family: 'Rock Salt', cursive;">My Profile
    </h2>
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