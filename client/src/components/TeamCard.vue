<template>
  <div class="teamCard ">
    <div class="card team-card">
      <div class="card-body">
        <h5 class="card-title">{{team.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Members</h6>
        <p class="card-text" v-for="user in team.users">{{user.name}} - {{user.points}}</p>
        <input type="text" class="card-link" v-model="email" placeholder="Member Email">
        <button @click="addUser()">Add Member</button>
        <button class="btn btn-danger" @click="leaveTeam()">Leave Team</button>
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
    computed: {},
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
      }
    }
  }
</script>