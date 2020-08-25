<template>
  <div class="findDonor">
    <div class="bloodInfo">
      <div class="bloodGroupBox">
        <label for="bloodGroup">Krvna grupa:</label>
        <br>
        <select 
        id="bloodGroup" 
        name="bloodGroup" 
        class="bloodGroup form-control"
        v-model="bloodGroup">
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="AB+">AB+</option>
          <option value="0+">0+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="AB-">AB-</option>
          <option value="0-">0-</option>
        </select>
      </div>
      <label for="bloodAmount">Količina:</label>
      <input
      id="bloodAmount"
      type="number"
      name="bloodAmount"
      v-model="bloodAmount"
      class="form-control"
      min="1" 
      max="999"
      >
      <label for="bloodPlace">Grad:</label>
      <input
      id="bloodPlace"
      type="text"
      name="bloodPlace"
      v-model="bloodPlace"
      class="form-control"
      >
      <button class="btn btn-primary" v-on:click="searchForDonor()"
      style="width:100%;margin-top:10px">Traži</button>
    </div>

    <div class="potentialDonors">
      <p id="notifi">Unesite podatke u tražilicu.</p>
      <div class="donorsItem" v-for="items in list" :key="items.id">
        <li class="userInfo nameDonors" id="noDonors">{{ items.username.toUpperCase() }}</li>
        <li class="userInfo donationDonors">Posljednja donacija: {{ moment(items.donationDate[0]).format('DD.MM.YYYY.') }}</li>
        <li class="userInfo bgroupDonors">{{ items.bloodgroup }}</li>
        <li class="userInfo residenceDonors">{{ items.residence }}</li>
        <li class="userInfo phoneDonors">+385 {{ items.phonenumber }}</li>
      </div>
    </div>
    <div class="allFindDonors">
      <p>Svi donori:</p>
      <div class="donorsItem" v-for="item in allDonors" :key="item.id">
        <li class="userInfo nameDonorsAll" id="noDonors">{{ item.name.toUpperCase() }}</li>
        <li class="userInfo donationDonors">Posljednja donacija: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
        <li class="userInfo bgroupDonors">{{ item.bloodgroup }}</li>
        <li class="userInfo residenceDonors">{{ item.residence }}</li>
        <li class="userInfo phoneDonors">+385 {{ item.phonenumber }}</li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      allDonors: [],
      potentialDonors: [],
      bloodGroup: "",
      bloodAmount: "",
      bloodPlace: "",
      tempCan: [],
      tempIndex: [],
      list: []
    };
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    searchForDonor() {
      if(this.bloodGroup && this.bloodAmount && this.bloodPlace != "")
      {
        var grupa = this.bloodGroup
        var mjesto = this.bloodPlace
        this.list = this.potentialDonors.filter(function(result) {
        return result.bloodgroup === grupa  &&  result.residence === mjesto;
       });
        if(this.list.length == 0){
          document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        } 

      }else {
        alert("Unesite sve podatke!")
      }
    }
  },
  created() {  
    this.getUsers().then(res => {
      if (res.data.success) {
          this.allDonors = res.data.users;
          this.allDonors.shift();

          for(var i=0; i<this.allDonors.length;i++){
            const donation1 = new Date(this.allDonors[i].donationDate[0])
            var donationMili = donation1.getTime();

            if(this.allDonors[i].sex == "Muškarac"){
              donationMili += 7776000000
            }else if(this.allDonors[i].sex == "Žena") {
              donationMili += 10368000000
            }

            var nextDonate = new Date(donationMili)
            var now = new Date()
            
            if(nextDonate < now) {
              this.tempCan.push(i)
            }
          }

          for(var j=0;j<this.tempCan.length;j++){
            this.potentialDonors[j] = this.allDonors[this.tempCan[j]]            
          }
      }
    });
  },
}
</script>

<style scoped>
.findDonor {
  width: 100%;
}
.findDonor label {
  font-size: 20px;
  font-weight: 500;
  color: rgb(110, 110, 110);
}
.bloodInfo {
  width: 20%;
  margin: 0 auto;
}
.bloodGroupBox {
  margin-top: 20px;
}
.bloodGroup {
  width: 100%;
}
.potentialDonors {
  max-height: 500px;
  overflow-y: auto;
  width: 95%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: rgb(217, 237, 255);
}
.allFindDonors {
  height: 500px;
  overflow-y: auto;
}
.donorsItem {
  background-color: white;
  margin: 0px 20px 20px 20px;
}
.userInfo {
  list-style-type: none;
  padding-left: 15px;
}
.nameDonors, .nameDonorsAll {
  font-size: 17px;
  font-weight: 500;
  height: 35px;
  line-height: 35px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.nameDonors {
  background-image: linear-gradient(to right, #548c54 , #99e099);
}
.nameDonorsAll {
  background-image: linear-gradient(to right, #5c73c0 , #99b2e0);
}
.bgroupDonors, .residenceDonors, .phoneDonors {
  background-size: contain;
  background-repeat: no-repeat;
  padding-left: 30px;
  font-weight: 500;
  color: #6e6e6e;
}
.bgroupDonors {
  background-image: url('../assets/blood-drop-donors.jpg');
}
.residenceDonors {
  background-image: url('../assets/city-pin-donors.jpg');
}
.phoneDonors {
  background-image: url('../assets/phone-donors.jpg');
}
.donationDonors {
  font-weight: 500;
  color: #6e6e6e;
}
p {
  font-size: 25px;
  font-weight: 500;
  color: #6e6e6e;
  padding-left: 20px;
  padding-top: 10px;
}
label {
  margin: 0;
}
</style>