<template>
  <div class="donors">
    <h1 class="display3"></h1>
      <div class="bloodSuply">
        <div class="requestedBlood">

        </div>
        <div class="bloodInStock">
          
        </div>
      </div>
      <div class="canDonors">
        <div class="canDonorsItem" v-for="item in donors" :key="item.id">
          <li class="userInfo nameDonorsCan">{{ item.name.toUpperCase() }}
          </li>
          <li class="userInfo donationDonors">Posljednja donacija: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
          <li class="userInfo bgroupDonors">{{ item.bloodgroup }}</li>
          <li class="userInfo residenceDonors">{{ item.residence }}</li>
          <li class="userInfo phoneDonors">+385 {{ item.phonenumber }}</li>
        </div>
      </div>
      <div class="cantDonors">
        <div class="cantDonorsItem" v-for="item in donors" :key="item.id">
          <li class="userInfo nameDonorsCant">{{ item.name.toUpperCase() }}
          </li>
          <li class="userInfo donationDonors">Posljednja donacija: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
          <li class="userInfo bgroupDonors">{{ item.bloodgroup }}</li>
          <li class="userInfo residenceDonors">{{ item.residence }}</li>
          <li class="userInfo phoneDonors">+385 {{ item.phonenumber }}</li>
        </div>
      </div>
      <div class="mapBox">
        <google-map />
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GoogleMap from "@/components/GoogleMap";
export default {
  components: {
    GoogleMap
  },
  data() {
    return {
      donors: [],
      canDonate: [],
      cantDonate: [],
      tempCan: [],
      tempCant: []
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]) 
  },
  created() {
    this.getUsers().then(res => {
      if (res.data.success) {
          this.donors = res.data.users;
          this.donors.shift();

          console.log(this.donors.length)
          for(var i=0; i<this.donors.length;i++){
            const donation1 = new Date(this.donors[i].donationDate[0])
            var donationMili = donation1.getTime();

            if(this.donors[i].sex == "Muškarac"){
              donationMili += 7776000000
            }else if(this.donors[i].sex == "Žena") {
              donationMili += 10368000000
            }

            var nextDonate = new Date(donationMili)
            var now = new Date()

            if(nextDonate < now) {
              this.tempCan.push(i)
            }else if(nextDonate > now) {
              this.tempCant.push(i)
            }
          }

          for(var j=0;j<this.tempCan.length;j++){
            this.canDonate[j] = this.donors[this.tempCan[j]]            
          }
          for(j=0;j<this.tempCant.length;j++){
            this.cantDonate[j] = this.donors[this.tempCant[j]]
          }
          
          console.log(this.canDonate)
          console.log(this.cantDonate)
      }
      });
  },
};
</script>

<style>
.donors {
  width: 100%;
  overflow: hidden; 
  box-shadow: 5px 5px 10px 1px #888888;
  border-radius: 25px;
}
.bloodSuply {
  height: 200px;
  border: 1px solid black;
  margin: 20px 10px 10px 10px;
}
.canDonors {
  width: 33%;
  float: left;
  padding-left: 10px;
  padding-right: 5px;
  height: 500px;
  overflow-y: auto;
}
.cantDonors {
  width: 33%;
  float: left;
  padding-left: 5px;
  padding-right: 10px;
  height: 500px;
  overflow-y: auto;
}
.canDonorsItem, .cantDonorsItem {
  padding-bottom: 10px;
  background-color: white;
  margin-bottom: 10px;
}
.mapBox {
  width: 33%;
  height: 600px;
  overflow:hidden;
}
.userInfo {
  list-style-type: none;
  padding-left: 15px;
}
.nameDonorsCan, .nameDonorsCant {
  font-size: large;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
}
.nameDonorsCant {
  background-image: linear-gradient(to right, #b53131 , #e09999);
}
.nameDonorsCan {
  background-image: linear-gradient(to right, #548c54 , #99e099);
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
</style>
