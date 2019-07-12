<template>
  <div class="teams">
    <div class="col">
      <teamCard v-for="team in teams" :team="team" />
    </div>
  </div>
</template>

<script>
  import TeamCard from "@/components/TeamCard.vue"
  export default {
    name: "teams",
    mounted() {
      this.$store.dispatch("getTeamsByUserId", this.$store.state.user._id)
    },
    computed: {
      teams() {
        return this.$store.state.teams
      }
    },
    components: {
      TeamCard
    }
  }
</script>