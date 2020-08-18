<template>
  <div>
    <h2>Edit user</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <li class="list-group-item">Username: {{ user.username }}</li>
              <input
                id="username"
                type="text"
                placeholder="Update username"
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
                type="text"
                placeholder="Update residence"
                v-model="residence"
                name="residence"
                id="autocomplete"
                class="form-control"
              />
          </div>
          <div class="form-group">
            <label for="bloodgroup">Blood group: {{ user.bloodgroup }}</label>
            <br>
            <input type="radio" id="A+" value="A+" v-model="bloodgroup">
            <label for="A+">A+</label>
            <input type="radio" id="B+" value="B+" v-model="bloodgroup">
            <label for="B+">B+</label>
            <input type="radio" id="AB+" value="AB+" v-model="bloodgroup">
            <label for="AB+">AB+</label>
            <input type="radio" id="0+" value="0+" v-model="bloodgroup">
            <label for="0+">0+</label>
            <br>
            <input type="radio" id="A-" value="A-" v-model="bloodgroup">
            <label for="A-">A-</label>
            <input type="radio" id="B-" value="B-" v-model="bloodgroup">
            <label for="B-">B-</label>
            <input type="radio" id="AB-" value="AB-" v-model="bloodgroup">
            <label for="AB-">AB-</label>
            <input type="radio" id="0-" value="0-" v-model="bloodgroup">
            <label for="0-">0-</label>
          </div>
          <div class="form-group">
            <li class="list-group-item">Phone number: +385 {{ user.phonenumber}}</li>
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
              <input type="radio" id="male" value="Male" v-model="sex">
              <label for="Male">Male</label>
              <input type="radio" id="female" value="Female" v-model="sex">
              <label for="Female">Female</label>
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
const google = window.google;
export default {
  data() {
    return {
      username: "",
      name: "",
      birthdate: "",
      residence: "",
      bloodgroup: "",
      phonenumber:"",
      sex: "",
      donationDate: "03.03.03"
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    ...mapActions(["updateProfile"]),
    updateUser() {
      let user = {
        _id: this.user._id,
        username: this.username,
        name: this.name,
        birthdate: this.birthdate,
        residence: this.residence,
        bloodgroup: this.bloodgroup,
        phonenumber: this.phonenumber,
        sex: this.sex,
        donationDate: this.donationDate
      };
      this.updateProfile(user).then(res => {
          if (res.data.success) {
          this.$router.push("profile");
        }
      });
    }
  },
  created() {
    this.getProfile();
  },
  mounted() {
    new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
    );
  }
};
</script>

<style>
</style>
