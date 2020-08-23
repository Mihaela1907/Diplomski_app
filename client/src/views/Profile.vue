<template>
  <div class="profile" v-if="user">
    <div class="firstBox">
      <ul class="list-group">
        <img src="@/assets/user-image.jpg" alt="User picture" width="230" height="230">
        <br>
        <router-link to="/userinfo" class="btn btn-primary">Uredi profil</router-link>
        <li class="list-group-item" id="notifyDonation" ref="notifyDonation"></li>
        <li class="list-group-item">Možete donirati od: {{ moment(this.nextDonation).format('DD.MM.YYYY.') }}</li>
        <br>
        <li class="list-group-item" 
        style="margin-bottom:-1px;
        background-color:#B7CAFF;">Prošle donacije:</li>
        <div class="donationList">
          <li class="list-group-item dates" v-for="item in donations" :key="item.id">
            {{ moment(item).format('DD.MM.YYYY.') }} 
          </li>
        </div>
        <router-link to="/donations" class="btn btn-primary">Uredi donacije</router-link>
      </ul>
    </div>

    <div class="secondBox">
      <li class="none name">{{ user.name }}</li>
      <li class="none adress">{{ user.residence }}</li>
      <li class="none bGroup">{{ user.bloodgroup }}</li>
    </div>
    
    <div class="thirdBox"> 
      <li class="list-group-item phone">+385 {{ user.phonenumber}}</li>
      <li class="list-group-item email">{{ user.email}}</li>
      <li class="list-group-item address">{{ user.residence }}</li>
      <br>
      <li class="list-group-item">Datum rođenja: {{ moment(user.birthdate).format('DD.MM.YYYY.')}}</li>
      <li class="list-group-item">Spol: {{ user.sex }}</li>
    </div>

    <div class="fourthBox">
      <br>
      <li class="list-group-item">Donirali ste krv {{this.donations.length}} puta. </li>
      <div v-for="units in donations" :key="units.id">
        <img class="bloodBags" src="@/assets/blood-times.jpg" alt="Blodd units" width="80" height="80">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      nextDonation: "",
      donations: []
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile().then(res => {
      if (res.data.success) {
        this.donations = this.user.donationDate;
        const date1 = new Date(this.user.donationDate[0]);
        var dateMili = date1.getTime();
        if(this.user.sex == "Muškarac") {
          dateMili += 7776000000;
        } else if (this.user.sex == "Žena") {
          dateMili += 10368000000;
        }
      }
      this.nextDonation  = new Date(dateMili);

      var now = new Date();

      if (this.nextDonation < now) {
        this.$refs.notifyDonation.innerText = "Možete donirati krv!"
        this.$refs.notifyDonation.style.backgroundColor = 'lightgreen'
      } else {
        this.$refs.notifyDonation.innerText = "Ne možete donirati krv!"
        this.$refs.notifyDonation.style.backgroundColor = '#ffa399'
      }

    });
  }
};
</script>

<style>
.profile {
  width: 100%;
  overflow: hidden;
  box-shadow: 10px 10px 10px 5px #888888;
  margin-bottom: 50px;
  background-image: url('../assets/back2.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.firstBox {
  width: 250px;
  height: 700px;
  float:left;
  margin-bottom: 20px;
}
.firstBox, .secondBox {
  padding-top: 20px;
}
.firstBox, .secondBox, .thirdBox, .fourthBox {
  padding-left: 20px;
}
.secondBox, .thirdBox, .fourthBox {
  overflow: hidden; 
  padding-right: 20px;
}
.thirdBox {
  margin-top: 20px;
}
.donationList {
  height: 150px;
  overflow-y: auto;
}
.none {
  list-style-type: none;
}
.dates {
  font-weight: 500;
  color: #6e6e6e;
}
.name {
  font-size: xx-large;
  font-weight: bold;
}
.adress, .bGroup, .address, .email, .phone {
  background-size: contain;
  background-repeat: no-repeat;
  font-weight: 500;
  color: #6e6e6e;
}
.adress, .bGroup {
  padding-left: 22px;
  font-size: large;
}
.adress {
  background-image: url('../assets/city-pin.jpg');
}
.bGroup {
  font-weight: bold;
  color: darkred;
  background-image: url('../assets/blood-drop.jpg');
  margin-top: 10px;
}
.address, .email, .phone {
  padding-left: 35px;
}
.address {
  background-image: url('../assets/address.jpg');
}
.email {
  background-image: url('../assets/email.jpg');
}
.phone {
  background-image: url('../assets/phone.jpg');
}
.bloodBags {
  float: left;
}
</style>
