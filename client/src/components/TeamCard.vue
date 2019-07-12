<template>
  <div class="teamCard ">
    <div class="card team-card">
      <div class="card-body">
        <h5 class="card-title">{{team.name}} - {{team.active}} </h5>
        <h6 class="card-subtitle mb-2 text-muted">Members</h6>
        <p class="card-text" v-for="user in team.users">{{user.name}} - {{user.points}}</p>
        <input type="text" class="card-link" v-model="email" placeholder="Member Email">
        <button @click="addUser()">Add Member</button>
        <button class="btn btn-danger" @click="leaveTeam()">Leave Team</button>
        <button @click="changeActiveTeam()" class="btn btn-info">Make Active Team</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "teamCard",
    props: ["team"],
    data() {
      return {
        email: ""
      }
    },
    methods: {
      addUser() {
        this.team.users.push(this.email)
        this.email = ""
        this.$store.dispatch("addTeamMember", this.team)
      },
      leaveTeam() {
        this.team.users = this.team.users.filter(userId => {
          userId != this.$store.state.user._id
        })
        if (this.team.users[0]) {
          this.$store.dispatch("editTeam", this.team)
        }
        else {
          this.$store.dispatch("deleteTeam", this.team)
        }
      },

      changeActiveTeam() {
        this.setInactive();
        this.team.active = true;
        this.$store.dispatch("editTeam", this.team)
      },

      setInactive() {
        this.$store.state.teams.forEach(team => {
          if (team.active == true) {
            team.active = false
            this.$store.dispatch("editTeam", team)
          }
        })
      }
    }
  }
</script>