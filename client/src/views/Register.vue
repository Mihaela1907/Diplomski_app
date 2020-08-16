<template>
  <div>
    <h2>Register</h2>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Register</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                v-model="username"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                v-model="name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                v-model="email"
                class="form-control"
              >
            </div>
            <div class="form-group">
            <label for="birthdate">Birth date</label>
            <input
                id="birthdate"
                type="date"
                placeholder="Birth date"
                name="birthdate"
                v-model="birthdate"
                class="form-control"
            >
            </div>
            <div class="form-group">
              <label for="sex">Sex</label>
              <br>
              <input type="radio" id="male" value="Male" v-model="sex">
              <label for="Male">Male</label>
              <input type="radio" id="female" value="Female" v-model="sex">
              <label for="Female">Female</label>
            </div>
            <div class="form-group">
            <label for="residence">Residence</label>
            <input
                type="text"
                class="form-control"
                placeholder="Residence"
                name="residence"
                id="residence"
                v-model="residence"
            >
            </div>
            <div class="form-group">
            <label for="bloodgroup">Blood group</label>
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
            <label for="phonenumber">Phone number</label>
            <input
                id="phonenumber"
                type="number"
                placeholder="0991234567"
                name="phonenumber"
                v-model="phonenumber"
                class="form-control"
            >
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                id="password"
                v-model="password"
              >
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                name="confirm_password"
                id="confirm_password"
                v-model="confirm_password"
              >
            </div>
            <button class="btn btn-primary">Register</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/login" class="card-link">Already have an account?</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      name: "",
      email: "",
      birthdate: "",
      residence: "",
      bloodgroup: "",
      phonenumber: "",
      sex: []
    };
  },
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      let user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name,
        birthdate: this.birthdate,
        residence: this.residence,
        bloodgroup: this.bloodgroup,
        phonenumber: this.phonenumber,
        sex: this.sex
      };
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push("login");
        }
      });
    }
  }
};
</script>

<style>
.card {
  width: 60%;
  border-radius: 0;
}
.btn {
  border-radius: 0;
}
.form-control {
  border-radius: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
