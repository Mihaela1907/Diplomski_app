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

      <div class="form-group bloodUseBox">
        <label class="label" for="critical">Potražnja za:</label>
        <br>
        <input type="radio" id="critical" value="critical" v-model="use">
        <label class="radio bloodUse" for="critical">Pacijent</label>
        <input type="radio" id="supply" value="supply" v-model="use">
        <label class="radio bloodUse" for="supply">Zalihe</label>
      </div>

      <label for="bloodAmount">Količina:</label>
      <input
      id="bloodAmount"
      type="number"
      name="bloodAmount"
      placeholder="Unesite količinu"
      v-model="bloodAmount"
      class="form-control"
      min="1" 
      max="999"
      >
      <label for="bloodPlace">Grad:</label>
      <GmapAutocomplete @place_changed="setPlace"
        class="form-control"
        name="bloodPlace"
        onfocus="this.value=''" 
        :options="{fields: ['geometry', 'address_components', 'formatted_address']}">
      </GmapAutocomplete>
      <button class="btn btn-primary" v-on:click="searchForDonor()"
      style="width:100%;margin-top:10px">Traži</button>
      <button class="btn btn-primary" v-on:click="showAllDonors()"
      style="width:100%;margin-top:10px">Prikaži sve potencijalne donore</button>
    </div>

    <div class="potentialDonors">
      <p id="notifi">Unesite podatke u tražilicu.</p>
      <div class="donorsItem" v-for="items in list" :key="items.id">
        <li class="userInfo nameDonors" id="noDonors">{{ items.name.toUpperCase() }}</li>
        <li class="userInfo donationDonors">Posljednja donacija: {{ moment(items.donationDate[0]).format('DD.MM.YYYY.') }}</li>
        <li class="userInfo bgroupDonors">{{ items.bloodgroup }}</li>
        <li class="userInfo residenceDonors">{{ items.residence[0]+" "+items.residence[1]+", "+items.residence[3]}}</li>
        <li class="userInfo phoneDonors">+385 {{ items.phonenumber }}</li>
      </div>
    </div>
  </div>
</template>

<script>
let google = window.google; 
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      allDonors: [],
      potentialDonors: [],
      bloodGroup: "",
      bloodAmount: "",
      bloodPlace: [],
      tempCan: [],
      tempIndex: [],
      list: [],
      searchPlace: null,
      userPlace: "",
      use: ""
    };
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    setPlace(place) {
      if(place.address_components.length > 5 || place.address_components.length == 1) {
        alert("Unesite grad!")
      } else {
        this.bloodPlace = place.address_components[0].long_name
        this.searchPlace = place 
      }
    },
    showAllDonors() {
      this.list = this.potentialDonors.filter(function(result) { 
        return result;  
      });
    },
    searchForDonor() {
      if(this.bloodGroup && this.bloodAmount && this.bloodPlace != "" && this.use != "")
      {
        if(this.use == "supply") {
          this.supplySearch()
        } else {
          this.criticalSearch()
        }
      }else {
        alert("Unesite sve podatke!")
      }
    },
    filterDonors(group1, group2, group3, group4, group5, group6, group7, group8, place) {
      var filterGrupa1 = group1
      var filterGrupa2 = group2
      var filterGrupa3 = group3
      var filterGrupa4 = group4
      var filterGrupa5 = group5
      var filterGrupa6 = group6
      var filterGrupa7 = group7
      var filterGrupa8 = group8
      if (this.searchPlace) {
        var x = new google.maps.LatLng(this.searchPlace.geometry.location.lat(), this.searchPlace.geometry.location.lng());
      }
      this.list = this.potentialDonors.filter(function(result) { 
        var y = new google.maps.LatLng(result.residence[5], result.residence[6]);
        var dist = google.maps.geometry.spherical.computeDistanceBetween(x,y);
        var distance = place
        return (result.bloodgroup === filterGrupa1 || result.bloodgroup === filterGrupa2 ||
          result.bloodgroup === filterGrupa3 || result.bloodgroup === filterGrupa4 || 
          result.bloodgroup === filterGrupa5 || result.bloodgroup === filterGrupa6 ||
          result.bloodgroup === filterGrupa7 || result.bloodgroup === filterGrupa8)  &&  dist < distance;
      });
    },
    criticalSearch() {
      var grupa = this.bloodGroup

      if(grupa == "0-") {
        this.supplySearch();
      } else if(grupa == "0+") {
        this.filterDonors("0-","0+","","","","","","", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","0+","","","","","","", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else if(grupa == "A+") {
        this.filterDonors("0-","0+","A-","A+","","","","", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","0+","A-","A+","","","","", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else if(grupa == "A-") {
        this.filterDonors("0-","A-","","","","","","", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","A-","","","","","","", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else if(grupa == "B-") {
        this.filterDonors("0-","B-","","","","","","", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","B-","","","","","","", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else if(grupa == "B+") {
        this.filterDonors("0-","0+","B-","B+","","","","", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","0+","B-","B+","","","","", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else if(grupa == "AB-") {
        this.filterDonors("0-","A-","B-","AB-","","","","", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","A-","B-","AB-","","","","", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else if(grupa == "AB+") {
        this.filterDonors("0-","0+","A-","A+","B-","B+","AB-","AB+", 10000)
        if(this.list.length == 0) {
          this.filterDonors("0-","A-","B-","AB-","0+","A+","B+","AB+", 100000)
          if(this.list.length == 0){
            document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
          } else {
            document.getElementById("notifi").innerText = "Potencijalni donori:"
          }
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      }
      this.list = this.list.slice(0,this.bloodAmount)
      if(this.list.length < this.bloodAmount) {
        alert("Trenutno postoji samo "+this.list.length+" rezultata koji zadovoljavaju kriterije.")
      }
    },
    supplySearch() {
      var grupa = this.bloodGroup
      if (this.searchPlace) {
        var a = new google.maps.LatLng(this.searchPlace.geometry.location.lat(), this.searchPlace.geometry.location.lng());
      }

      this.list = this.potentialDonors.filter(function(result) { 
        var b = new google.maps.LatLng(result.residence[5], result.residence[6]);
        var dist = google.maps.geometry.spherical.computeDistanceBetween(a,b);
        return result.bloodgroup === grupa  &&  dist < 10000;  
      });

      if(this.list.length == 0){

        this.list = this.potentialDonors.filter(function(result) { 
          var b = new google.maps.LatLng(result.residence[5], result.residence[6]);
          var dist = google.maps.geometry.spherical.computeDistanceBetween(a,b);
          return result.bloodgroup === grupa  &&  dist < 100000;  
        });
        if(this.list.length == 0){
          document.getElementById("notifi").innerText = "Trenutno nema donora koji zadovoljavaju navedene kriterije."
        } else {
          document.getElementById("notifi").innerText = "Potencijalni donori:"
        }
      } else {
        document.getElementById("notifi").innerText = "Potencijalni donori:"
      } 

      this.list = this.list.slice(0,this.bloodAmount)
      if(this.list.length < this.bloodAmount) {
        alert("Trenutno postoji samo "+this.list.length+" rezultata koji zadovoljavaju kriterije.")
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
      this.showAllDonors()
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
  width: 30%;
  margin: 0 auto;
}
.bloodGroupBox {
  margin-top: 20px;
}
.bloodGroup {
  width: 100%;
}
.potentialDonors {
  max-height: 1000px;
  overflow-y: auto;
  width: 95%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: rgb(217, 237, 255);
}
.donorsItem {
  width: 45%;
  height: 140px;
  float: left;
  background-color: white;
  margin: 0px 20px 20px 20px;
  border-radius: 10px;
}
.userInfo {
  list-style-type: none;
  padding-left: 15px;
}
.nameDonors {
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
.bloodUse {
  padding-left: 5px;
  padding-right: 30px;
}
.bloodUseBox {
  margin-bottom: 0px;
}
</style>