<template>
  <div class="team">
    <div class="row">
      <div class="col">
        <Teams />
      </div>
      <div class="col">
        <CreateTeam />
      </div>
    </div>
  </div>
</template>

<script>
  import Teams from "@/components/Teams.vue"
  import CreateTeam from "@/components/CreateTeam.vue"

  export default {
    name: "Team",
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {
      Teams,
      CreateTeam
    }
  }
</script>