<template>
  <div class="donors">
    <div style="width:100%;height:100px">
      <div class="searchBox">
        <select 
        id="searchCategory" 
        name="searchCategory" 
        class="form-control searchTsearchCategoryerm"
        v-model="searchCategory">
          <option value="bloodgroup">Krvna grupa</option>
          <option value="city">Grad</option>
          <option value="name">Ime i prezime</option>
          <option value="phonenumber">Kontakt</option>
          <option value="sex">Spol</option>
        </select>
        <input
          id="searchTerm"
          type="text"
          name="searchTerm"
          v-model="searchTerm"
          class="form-control"
          maxlength="50"
          style="width:87%;float:left;border-radius:0px"
        >
        <button style="float:left;width:13%;" class="btn btn-primary searchBoxBtn" v-on:click="searchByFilter()">
          <img src="../assets/search-donors.jpg" style="height:35px;width:100%"/>
        </button>
      </div>
    </div>
      <p id="notificationP"></p>
      <div class="donorsFound">
        <div class="donorsFoundItem" v-for="(inde, index) in list" :key="inde.id">
          <li class="userInfo nameDonors" id="noDonors">{{ inde.name.toUpperCase() }}
            <button class="btn itemDeleteDonor" v-on:click="removeDonorFiltered(index)">
              <img src="../assets/delete-item.png" class="donorItemDelete"/>
            </button>
          </li>
          <li class="userInfo donationDonors">Posljednja donacija: {{ moment(inde.donationDate[0]).format('DD.MM.YYYY.') }}</li>
          <li class="userInfo bgroupDonors">{{ inde.bloodgroup }}</li>
          <li class="userInfo residenceDonors">{{ inde.residence[0]+" "+inde.residence[1]+", "+inde.residence[3]}}</li>
          <li class="userInfo phoneDonors">+385 {{ inde.phonenumber }}</li>
        </div>
      </div>

      <div style="width: 31%;margin-left:80px;font-size:25px;font-weight:500;color:#494949;">
        Svi donori
      </div>
      <div class="donorsAll">
        <div class="donorsItem" v-for="(item,index) in donors" :key="item.id">
          <li class="userInfo nameDonors" id="noDonors">{{ item.name.toUpperCase() }}
            <button class="btn itemDeleteDonor" v-on:click="removeDonor(index)">
              <img src="../assets/delete-item.png" class="donorItemDelete "/>
            </button>
          </li>
          <li class="userInfo donationDonors">Posljednja donacija: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
          <li class="userInfo bgroupDonors">{{ item.bloodgroup }}</li>
          <li class="userInfo residenceDonors">{{ item.residence[0]+" "+item.residence[1]+", "+item.residence[3]}}</li>
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
      donors: [],
      searchTerm: "",
      searchCategory: "",
      list: []
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    ...mapActions(["deleteUser"]),
    searchByFilter() {
      var category = this.searchCategory
      var test = this.searchTerm
      if(category == "name") {
        this.list = this.donors.filter(function(result) {
          return result.name === test;  
        });
      } else if(category == "city") {
        this.list = this.donors.filter(function(result) {
          return result.residence[3] === test;  
        });
      } else if(category == "bloodgroup") {
        this.list = this.donors.filter(function(result) {
          return result.bloodgroup === test;  
        });
      } else if(category == "phonenumber") {
        var proba = Number(test)
        this.list = this.donors.filter(function(result) {
          return result.phonenumber === proba;  
        });
      } else if(category == "sex") {
        this.list = this.donors.filter(function(result) {
          return result.sex === test;  
        });
      }

      if(this.list.length == 0) {
        document.getElementById("notificationP").innerText = "Ne postoje donori koji zadovoljavaju navedene kriterije."
      } else {
        document.getElementById("notificationP").innerText = ""
      }
    },
    removeDonor(index) {
      if(confirm("Jeste li sigurni da želite ukloniti izabranog korisnika?")){
           let user = {
            _id: this.donors[index]._id
          }; 
        this.deleteUser(user);
        this.$router.go()
      }
    },
    removeDonorFiltered(index) {
      if(confirm("Jeste li sigurni da želite ukloniti izabranog korisnika?")){
           let user = {
            _id: this.list[index]._id
          }; 
        this.deleteUser(user);
        this.$router.go()
      }
    }
  },
  created() {  
    this.getUsers().then(res => {
      if (res.data.success) {
          this.donors = res.data.users;
          this.donors.shift(); 
      }
    });
  },
};
</script>

<style>
.donors {
  width: 100%;
  overflow: hidden;
  margin-top: 25px;
  margin-bottom: 15px;
}
.searchBox {
  width: 30%;
  height:50px;
  margin: 0 auto;
}
.searchBoxBtn {
  padding: 0;
}
.donorsFound {
  width: 100%;
}
.donorsFoundItem {
  background-color: white;
  border-radius: 10px;
  padding-bottom: 10px;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 10px;
}
.donorsFoundItem .nameDonors {
  background-image: linear-gradient(to right, #7349aa , rgb(188, 158, 228));
}
.donorsAll {
  width: 90%;
  margin-top: 5px;
  padding-left: 5px;
  padding-right: 10px;
  margin: 0 auto;
}
.donorsItem {
  width: 49%;
  padding-bottom: 10px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  float: left;
}
.donorItemDelete {
  height: 25px;
  width: 25px;
  background-color: transparent;
  margin-bottom: 5px;
  border: 0;
  outline: 0;
}
.deleteDonorBtn {
  border: 0;
  outline: 0;
}
.itemDeleteDonor {
  margin-top: 4px;
  margin-right: 5px;
  float: right;
  background-color: transparent;
  padding: 0;
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
  background-image: linear-gradient(to right, #33819c , rgb(128, 203, 228));
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
#notificationP {
  margin-left: 80px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0px;
}
</style>
