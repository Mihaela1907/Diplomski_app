<template>
  <div>
    <h2>Edit user</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <li class="list-group-item">Email: {{ user.email }}</li>
              <input
                id="email"
                type="text"
                placeholder="Update email"
                name="email"
                v-model="email"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Username: {{ user.username }}</li>
              <input
                id="username"
                type="text"
                placeholder="Update Username"
                name="username"
                v-model="username"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Name: {{ user.name }}</li>
              <input
                id="name"
                type="text"
                placeholder="Update name"
                name="name"
                v-model="name"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Birthdate: {{ user.birthdate }}</li>
              <input
                id="birthdate"
                type="date"
                placeholder="Update birthdate"
                name="birthdate"
                v-model="birthdate"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Residence: {{ user.residence }}</li>
              <input
                id="residence"
                type="text"
                placeholder="Update residence"
                name="residence"
                v-model="residence"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Blood group: {{ user.bloodgroup }}</li>
              <input
                id="bloodgroup"
                type="text"
                placeholder="Update bloodgroup"
                name="bloodgroup"
                v-model="bloodgroup"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Phone number: {{ user.phonenumber}}</li>
              <input
                id="phonenumber"
                type="text"
                placeholder="Update phonenumber"
                name="phonenumber"
                v-model="phonenumber"
                class="form-control"
              >
          </div>
          <div class="form-group">
            <li class="list-group-item">Sex: {{ user.sex }}</li>
              <input
                id="sex"
                type="text"
                placeholder="Update sex"
                name="sex"
                v-model="sex"
                class="form-control"
              >
          </div>
          <button class="btn btn-primary">Update profile</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </form>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      username: "",
      name: "",
      birthdate: "",
      residence: "",
      bloodgroup: "",
      phonenumber: "",
      sex: ""
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    ...mapActions(["updateProfile"]),
    updateUser() {
      console.log(this.user._id)
      let user = {
        _id: this.user._id,
        email: this.email,
        username: this.username,
        name: this.name,
        birthdate: this.birthdate,
        residence: this.residence,
        bloodgroup: this.bloodgroup,
        phonenumber: this.phonenumber,
        sex: this.sex
      };
      console.log("radi")
      this.$router.push("profile");
      this.updateProfile(user)
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>
</style>
