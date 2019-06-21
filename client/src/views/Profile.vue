<template>
  <div class=" ">
    <h1>My Profile</h1>
    <UserInfo />
    <TaskCalendar />
  </div>
</template>

<script>
  import UserInfo from "@/components/UserInfo.vue"
  import TaskCalendar from "@/components/TaskCalendar.vue"

  export default {
    name: "",
    props: [],
    data() {
      return {}

    },
    methods: {},
    components: {
      UserInfo,
      TaskCalendar,
    }
  }
</script>