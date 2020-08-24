<template>
  <div class="login">
    <div class="loginBanner">
    </div>
    <div class="loginBox">
        <p>PRIJAVA</p>
      <div class="card-body">
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="username">Korisničko ime</label>
            <input
              id="username"
              type="text"
              placeholder="Unesite korisničko ime"
              name="username"
              v-model="username"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="password">Lozinka</label>
            <input
              type="password"
              class="form-control"
              placeholder="Unesite lozinku"
              name="password"
              id="password"
              v-model="password"
            >
          </div>
          <button class="btn btn-primary">Prijava</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/register" class="card-link">Trebate račun?</router-link>
        </form>
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
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success && res.data.role == "basic") {
            this.$router.push("/profile");
          } else if (res.data.success && res.data.role == "admin") {
            this.$router.push("/donors");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.form-control:focus { 
  box-shadow: inset 0 -1px 0 #ddd; 
}
.login p {
  font-size: 27px;
  padding-left: 20px;
  font-weight: 500;
  color: rgb(80, 80, 80);
  margin-bottom: -4px;
  margin-top: 20px;
}
.login {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 80%;
  overflow: hidden;
  background-color: white;
  box-shadow: 10px 10px 10px 5px #888888;

}
.loginBanner {
  width: 50%;
  height: 306px;
  float: left;
  background-image: url('../assets/login.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.loginBox {
  width: 50%;
  float: left;
  padding-left: 20px;
  padding-right: 25px;
}
.login input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid rgb(173, 173, 173);
}
.login label {
  font-weight: bold;
  color: rgb(122, 122, 122);
}
</style>
