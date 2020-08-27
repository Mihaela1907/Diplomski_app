<template>
  <div class="editInfo">
    <div class="" v-if="user">
      <div class="form-group Card">
        <div class="Item">Ime i prezime:</div>
          <div class="Data">{{ user.name }}</div>
          <div class="Edit" v-on:click="show = !show">Uredi</div>
          <input
            v-if="show"
            id="name"
            type="text"
            placeholder="Unesite ime"
            name="name"
            v-model="name"
            class="inputData"
            maxlength="20"
          >
          <input
            v-if="show"
            id="surname"
            type="text"
            placeholder="Unesite prezime"
            name="surname"
            v-model="surname"
            class="inputData"
            maxlength="20"
          >
        <button v-if="show" 
          class="btn btn-primary updateBtn" 
          v-on:click="updateName">Ažuriraj</button>
      </div>
      <div class="form-group Card">
        <div class="Item">Lozinka:</div>
          <div class="Data">Lozinka</div>
          <div class="Edit" v-on:click="isHidden = !isHidden">Uredi</div>
          <input
            v-if="!isHidden"
            id="password"
            type="password"
            placeholder="Unesite lozinku"
            name="password"
            v-model="password"
            class="inputData"
            maxlength="20"
          >
          <input
            v-if="!isHidden"
            id="confPassword"
            type="password"
            placeholder="Potvrdite lozinku"
            name="confPassword"
            v-model="confPassword"
            class="inputData"
            maxlength="20"
          >
        <button 
          v-if="!isHidden"
          class="btn btn-primary updateBtn" 
          v-on:click="updatePassword">Ažuriraj</button>
      </div>
      <div class="form-group Card">
        <div class="Item">Adresa:</div>
          <div class="Data">{{ user.residence[0]+" "+user.residence[1]+", "+user.residence[3]+", "+user.residence[4]}}</div>
          <div class="Edit" v-on:click="hide = !hide">Uredi</div>
          <GmapAutocomplete @place_changed="setPlace"
            v-if="!hide"
            class="inputData"
            name="residence"
            :options="{fields: ['geometry', 'address_components', 'formatted_address']}">
          </GmapAutocomplete>
        <button 
          v-if="!hide"
          class="btn btn-primary updateBtn" 
          v-on:click="updateResidence">Ažuriraj</button>
      </div>
      <div class="form-group Card">
        <div class="Item">Kontakt: </div>
          <div class="Data">+385 {{ user.phonenumber }}</div>
          <div class="Edit" v-on:click="isShown = !isShown">Uredi</div>
          <input
            v-if="isShown"
            id="phonenumber"
            type="text"
            placeholder="Unesite kontakt"
            name="phonenumber"
            v-model="phonenumber"
            class="inputData"
            maxlength="10"
          >
        <button 
          v-if="isShown"
          class="btn btn-primary updateBtn" 
          v-on:click="updatePhone">Ažuriraj</button>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      password: "",
      confPassword: "",
      name: "",
      surname: "",
      residence: [],
      phonenumber:"",
      show: false,
      isHidden: true,      
      isShown: false,
      hide: true
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    ...mapActions(["updateProfile"]),
    updatePassword() {
      if(this.password != this.confPassword) {
        alert("Lozinke moraju biti jednake!")
      } else {
        let user = {
          _id: this.user._id,
          password: this.password
        };
        this.updateProfile(user).then(res => {
          if (res.data.success) {
            this.$router.go();
          }
        });
      }
      
    },
    updateName() {
      let user = {
        _id: this.user._id,
        name: this.name + " " + this.surname,
      };
      this.updateProfile(user).then(res => {
        if (res.data.success) {
          this.$router.go();
        }
      });
    },
    setPlace(place) {
      this.residence[0] = place.address_components[1].long_name
      this.residence[1] = place.address_components[0].long_name
      this.residence[2] = place.address_components[6].long_name
      this.residence[3] = place.address_components[2].long_name
      this.residence[4] = place.address_components[5].long_name
      this.residence[5] = place.geometry.location.lat()
      this.residence[6] = place.geometry.location.lng()
    },
    updateResidence() {
      let user = {
        _id: this.user._id,
        residence: this.residence,
      };
      this.updateProfile(user).then(res => {
        if (res.data.success) {
          this.$router.go();
        }
      });
    },
    updatePhone() {
      let user = {
        _id: this.user._id,
        phonenumber: this.phonenumber,
      };
      this.updateProfile(user).then(res => {
        if (res.data.success) {
          this.$router.go();
        }
      });
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>
.Card {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  overflow: hidden; 
  box-shadow: 5px 5px 10px 1px #888888;
}
.Item {
  width: 20%;
  float: left;
  padding-left: 20px;
  font-weight: 700;
}
.Data {
  width: 70%;
  float: left;
  font-weight: 500;
  color: #6e6e6e;
}
.inputData {
  height: 40px;
  width: 300px;
  display: block;
  margin : 0 auto;
  margin-top: 10px;
  border: 1px solid rgb(209, 209, 209);
  padding-left: 10px;
}
.updateBtn {
  width: 10%;
  display: block;
  margin : 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.Edit {
  text-align: center;
  overflow: hidden;
  color: blue;
}
.Item, .Data, .Edit {
  background-color: white;
  height: 50px;
  line-height: 45px; 
}
</style>
