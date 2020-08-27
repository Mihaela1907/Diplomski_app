<template>
  <div class="admin">
    <h1 class="display3"></h1>

      <div class="bloodSuply">
        <div class="bloodInStock">
          <div>
            <label style="font-size:21px;font-weight:500;color:#33819c;margin-top:-10px">Zalihe krvi
              <button class="btn btn-primary" style="padding:1px;font-size:12px;background-color:#33819c;margin-bottom:5px">Uredi</button>
            </label>
            <label id="todayDate" class="todayDate"
            style="font-weight:500;color:#33819c">Datum</label>
          </div>
          <div class="bloodSuplyNum">
            <p style="font-size:14px;font-weight:500;color:#33819c;width:65px;">Ukupno</p>
            <label style="font-size:50px;font-weight:600;color:#33819c">{{ this.bloodInStockNum }}</label>
          </div>
          <div class="bloodSuplyGroup">
            <div class="bloodGroupCount">
              <label class="bloodName">0+</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">A+</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">B+</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">AB+</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">0-</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">A-</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">B-</label>
              <label>1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">AB-</label>
              <label>1</label>
            </div>
          </div>
        </div>

        <div class="requestedBlood">
          <div>
            <label style="font-size:21px;font-weight:500;color:#b34646;margin-top:-10px">Donori</label>
            <label id="todayDate2" class="todayDate"
            style="font-weight:500;color:#b34646">Datum</label>
          </div>
          <div class="bloodSuplyNum">
            <p style="font-size:14px;font-weight:500;color:#b34646;width:65px;">Ukupno</p>
            <label style="font-size:50px;font-weight:600;color:#b34646">{{ this.donors.length }}</label>
          </div>
          <div class="requestedBloodGroup">
            <div class="bloodGroupCount">
              <label class="bloodName">0+</label>
              <label id="group1">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">A+</label>
              <label id="group2">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">B+</label>
              <label id="group3">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">AB+</label>
              <label id="group4">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">0-</label>
              <label id="group5">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">A-</label>
              <label id="group6">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">B-</label>
              <label id="group7">1</label>
            </div>
            <div class="bloodGroupCount">
              <label class="bloodName">AB-</label>
              <label id="group8">1</label>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 31%;margin-left:30px;font-size:20px;font-weight:500;color:#494949;">
        <label>Svi donori</label>
        <label style="float:right;">Mogu donirati</label>
      </div>
      <div class="allDonorsAdmin">
        <div class="adminItem" v-for="item in donors.slice(0, 4)" :key="item.id">
          <li class="userInfoAdmin nameAdmin" id="noDonors">{{ item.name.toUpperCase() }}
          </li>
          <li class="userInfoAdmin donationAdmin">Posljednja donacija: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
          <li class="userInfoAdmin bgroupAdmin">{{ item.bloodgroup }}</li>
          <li class="userInfoAdmin residenceAdmin">{{ item.residence[0]+" "+item.residence[1]+", "+item.residence[3]}}</li>
          <li class="userInfoAdmin phoneAdmin">+385 {{ item.phonenumber }}</li>
        </div>
        <router-link to="/donors" class="btn btn-primary" style="width:100%;">Vidi sve</router-link>
      </div>
      <div class="canAdmin">
        <div class="canAdminItem" v-for="item in canDonate.slice(0, 4)" :key="item.id">
          <li class="userInfoAdmin nameAdminCan">{{ item.name.toUpperCase() }}
          </li>
          <li class="userInfoAdmin donationAdmin">Posljednja donacija: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
          <li class="userInfoAdmin bgroupAdmin">{{ item.bloodgroup }}</li>
          <li class="userInfoAdmin residenceAdmin">{{ item.residence[0]+" "+item.residence[1]+", "+item.residence[3]}}</li>
          <li class="userInfoAdmin phoneAdmin">+385 {{ item.phonenumber }}</li>
        </div>
        
        <button class="btn btn-primary" style="width:100%;">Vidi sve</button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
 import moment from 'moment';
export default {
  data() {
    return {
      donors: [],
      canDonate: [],
      cantDonate: [],
      tempCan: [],
      bloodInStockNum: 0,
      temp: ""
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    countDonors(group, groupId) {
      this.temp = this.donors.filter(function(result) { 
        return result.bloodgroup === group;  
      });
      document.getElementById(groupId).innerHTML = this.temp.length
    }
  },
  created() {  
    this.getUsers().then(res => {
      if (res.data.success) {
          this.donors = res.data.users;

          this.countDonors("0+",'group1')
          this.countDonors("A+",'group2')
          this.countDonors("B+",'group3')
          this.countDonors("AB+",'group4')
          this.countDonors("0-",'group5')
          this.countDonors("A-",'group6')
          this.countDonors("B-",'group7')
          this.countDonors("AB-",'group8')

          this.donors.shift();

          for(var k=0; k<this.donors.length;k++){
            this.bloodInStockNum = this.bloodInStockNum + this.donors[k].donationDate.length
          }

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

            document.getElementById('todayDate').innerHTML = moment(now).format('DD.MM.YYYY.').toString();
            document.getElementById('todayDate2').innerHTML = moment(now).format('DD.MM.YYYY.').toString();

            if(nextDonate < now) {
              this.tempCan.push(i)
            }
          }

          for(var j=0;j<this.tempCan.length;j++){
            this.canDonate[j] = this.donors[this.tempCan[j]]            
          }
      }
    });
  },
};
</script>

<style>
.admin {
  width: 100%;
  overflow: hidden;
  margin-top: 15px;
}
.bloodSuply {
  height: 150px;
  margin: 20px 10px 10px 10px;
}
.requestedBlood {
  height: 150px;
  width: 47%;
  background-color: rgb(230, 154, 154);
  overflow: hidden;
  float: right;
  padding: 15px;
  margin-right: 20px;
  border-radius: 10px;
}
.bloodInStock {
  height: 150px;
  width: 47%;
  float: left;
  background-color: rgb(128, 203, 228);
  padding: 15px;
  margin-left: 20px;
  border-radius: 10px;
}
.bloodSuplyNum {
  width: 15%;
  float: left;
  padding-left: 10px;
}
.bloodSuplyGroup, .requestedBloodGroup {
  width: 85%;
  overflow: hidden;
  padding-left: 20px;
}
.requestedBloodGroup .bloodName {
  background-color: #b34646;
  color: rgb(240, 218, 218) !important;
}
.requestedBloodGroup .bloodGroupCount label {
  color: #b34646;
}
.bloodGroupCount {
  width: 11%;
  height: 85px;
  float: left;
  margin-right: 5px;
  background-color: white;
  border-radius: 10px;
}
.bloodName {
  background-color: #33819c;
  border-radius: 10px;
  color: rgb(223, 236, 240) !important;
}
.bloodGroupCount label {
  width: 54px;
  height: 35px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #33819c;
}
.bloodSuplyNum p {
  margin-top: 15px;
  margin-bottom: -15px;
}
.todayDate {
  float: right;
}
.canAdmin, .allDonorsAdmin {
  width: 21%;
  float: left;
  height: 660px;
  margin-top: 5px;
}
.canAdmin {
  padding-left: 10px;
  padding-right: 5px;
}
.allDonorsAdmin {
  padding-left: 5px;
  padding-right: 10px;
  margin-left: 25px;
}
.canAdminItem, .adminItem {
  padding-bottom: 10px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
}
.userInfoAdmin {
  list-style-type: none;
  padding-left: 15px;
}
.nameAdminCan, .nameAdmin {
  font-size: 17px;
  font-weight: 500;
  height: 35px;
  line-height: 35px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.nameAdmin {
  background-image: linear-gradient(to right, #33819c , rgb(128, 203, 228));
}
.nameAdminCan {
  background-image: linear-gradient(to right, #548c54 , #99e099);
}
.bgroupAdmin, .residenceAdmin, .phoneAdmin {
  background-size: contain;
  background-repeat: no-repeat;
  padding-left: 30px;
  font-weight: 500;
  color: #6e6e6e;
}
.bgroupAdmin {
  background-image: url('../assets/blood-drop-donors.jpg');
}
.residenceAdmin {
  background-image: url('../assets/city-pin-donors.jpg');
}
.phoneAdmin {
  background-image: url('../assets/phone-donors.jpg');
}
.donationAdmin {
  font-weight: 500;
  color: #6e6e6e;
}
</style>
