<template>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Create a Team
    </button>


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create a Team</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Team Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="Enter Team Name" v-model="newTeam.name">
              </div>
              <!-- <div class="form-group">
                <label for="exampleInputPassword1">Add Teammate</label>
                <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Enter Teammate's Email"
                  v-model="email" @click="addUser()">
              </div> -->
              <!-- <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div> -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" @click="createTeam()">Create Team</button> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "createTeam",
    props: [],
    data() {
      return {
        newTeam: {
          name: "",
          users: [],
        },
        email: "",
      }
    },

    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      createTeam() {
        this.newTeam.users.push(this.user._id)
        this.$store.dispatch("createNewTeam", this.newTeam)
      }
    }
  }
</script>