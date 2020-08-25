<template>
  <div class="register">
    <div class="registerBanner">
    </div>
    <div class="registerBox">
      <p>REGISTRACIJA</p>
      <div class="card-body registerData">
        <form @submit.prevent="registerUser">
          <div class="form-group usernameRegister">
            <label class="label" for="username">Korisničko ime</label>
            <input
              id="username"
              type="text"
              placeholder="Unesite korisničko ime"
              name="username"
              v-model="username"
              class="form-control usernameR"
              maxlength="20"
            >
          </div>
          <div class="form-group nameRegister">
            <label class="label" for="name">Ime i prezime</label>
            <input
              id="name"
              type="text"
              placeholder="Unesite ime i prezime"
              name="name"
              v-model="name"
              class="form-control nameR"
              maxlength="40"
            >
          </div>
          <div class="form-group">
            <label class="label" for="email">E-mail</label>
            <input
              id="email"
              type="text"
              placeholder="Unesite e-mail"
              name="email"
              v-model="email"
              class="form-control emailR"
              maxlength="50"
            >
          </div>
          <div class="form-group">
            <label class="label" for="residence">Adresa</label>
              <GmapAutocomplete @place_changed="setPlace"
              class="form-control residenceR"
              name="residence"
              :options="{fields: ['geometry', 'address_components', 'formatted_address']}">
              </GmapAutocomplete>
          </div>
          <div class="form-group birthdayRegister">
            <label class="label" for="birthdate">Datum rođenja</label>
            <input
                id="birthdate"
                type="date"
                name="birthdate"
                v-model="birthdate"
                class="form-control birthdateR"
            >
          </div>
          <div class="form-group donationRegister">
            <label class="label" for="birthdate">Datum donacije</label>
            <input
                id="donationDate"
                type="date"
                name="donationDate"
                v-model="donationDate"
                class="form-control donationR"
            >
          </div>
          <div class="form-group sexRegister">
            <label class="label" for="sex">Spol</label>
            <br>
            <input type="radio" id="male" value="Muškarac" v-model="sex">
            <label class="radio" for="Male">Muškarac</label>
            <input type="radio" id="female" value="Žena" v-model="sex">
            <label class="radio" for="Female">Žena</label>
          </div>
          <div class="form-group bgroupRegister">
            <label class="label" for="bloodgroup">Krvna grupa</label>
            <br>
            <input type="radio" id="A+" value="A+" v-model="bloodgroup">
            <label class="radio" for="A+">A+</label>
            <input type="radio" id="B+" value="B+" v-model="bloodgroup">
            <label class="radio" for="B+">B+</label>
            <input type="radio" id="AB+" value="AB+" v-model="bloodgroup">
            <label class="radio" for="AB+">AB+</label>
            <input type="radio" id="0+" value="0+" v-model="bloodgroup">
            <label class="radio" for="0+">0+</label>
            <br>
            <input type="radio" id="A-" value="A-" v-model="bloodgroup">
            <label class="radio" for="A-">A-</label>
            <input type="radio" id="B-" value="B-" v-model="bloodgroup">
            <label class="radio" for="B-">B-</label>
            <input type="radio" id="AB-" value="AB-" v-model="bloodgroup">
            <label class="radio" for="AB-">AB-</label>
            <input type="radio" id="0-" value="0-" v-model="bloodgroup">
            <label class="radio" for="0-">0-</label>
          </div>
          <div class="form-group">
          <label class="label" for="phonenumber">Kontakt</label>
          <input
              id="phonenumber"
              type="number"
              placeholder="Unesite kontakt"
              name="phonenumber"
              v-model="phonenumber"
              class="form-control phoneR"
              maxlength="10"
          >
          </div>
          <div class="form-group passRegister">
            <label class="label" for="password">Lozinka</label>
            <input
              type="password"
              class="form-control passR"
              placeholder="Unesite lozinku"
              name="password"
              id="password"
              v-model="password"
              maxlength="20"
            >
          </div>
          <div class="form-group confirmRegister">
            <label class="label" for="confirm_password">Potvrdite lozinku</label>
            <input
              type="password"
              class="form-control confirmR"
              placeholder="Unesite lozinku"
              name="confirm_password"
              id="confirm_password"
              v-model="confirm_password"
              maxlength="20"
            >
          </div>
          <button class="btn btn-primary">Registracija</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/login" class="card-link">Već imate račun?</router-link>
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
      password: "",
      confirm_password: "",
      name: "",
      email: "",
      birthdate: "",
      residence: "",
      bloodgroup: "",
      phonenumber: "",
      sex: [],
      donationDate: ""
    };
  },
  methods: {
    ...mapActions(["register"]),
    setPlace(place) {
      this.residence = place.formatted_address
    },
    registerUser() {
      var now = new Date();
      const date2 = new Date(this.donationDate)
      const date3 = new Date(this.birthdate)

      if (date2 > now) {
        alert("Pokušavate dodati budući datum donacije!");
      }else if (date3 > now){
        alert("Dodajte ispravan datum rođenja!")
      }else {
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
          sex: this.sex,
          donationDate: this.donationDate
        };
        this.register(user).then(res => {
          if (res.data.success) {
            this.$router.push("login");
          }
        });
      }
    }
  }
};
</script>

<style>
.form-control:focus { 
  box-shadow: inset 0 -1px 0 #ddd; 
}
.register {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 82%;
  overflow: hidden;
  box-shadow: 10px 10px 10px 5px #888888;
  margin-bottom: 50px;
}
.register p {
  font-size: 27px;
  padding-left: 20px;
  font-weight: 500;
  color: rgb(80, 80, 80);
  margin-bottom: -4px;
  margin-top: 20px;
}
.register input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid rgb(173, 173, 173);
}
.label {
  font-weight: bold;
  color: rgb(122, 122, 122);
}
.registerBanner {
  width: 50%;
  height: 762px;
  float: left;
  background-image: url('../assets/register.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.registerBox {
  background-color: white;
  padding-left: 20px;
}
.registerBox, .registerDate {
  overflow: hidden;
}
.usernameRegister, .nameRegister, .passRegister, .confirmRegister, 
.sexRegister, .bgroupRegister, .birthdayRegister, .donationRegister {
  width: 50%;
  float: left;
}
.usernameR, .nameR, .birthdateR, .donationR, .passR, .confirmR {
  width: 90%;
}
.phoneR, .residenceR, .emailR {
  width: 95%;
}
.radio {
  padding-left: 5px;
  padding-right: 10px;
  color: grey;
}
</style>
