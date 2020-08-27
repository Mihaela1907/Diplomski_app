<template>
  <div class="donations">
    <div class="sidenavDonations">
      <a href="#tkoMoze">2020.</a>
      <a href="#kako">2019.</a>
      <a href="#gdje">2018.</a>
      <a href="#tkoJe">2017.</a>
      <a href="#tkoNemoze">2016.</a>
      <a href="#kolikoCesto">Dodaj datum donacije</a>
    </div>

    <div class="dateList" v-if="user">
          <div class="dateBox">
            <div class="dateList">
              <li class="dateItem" v-for="(item,index) in dates" :key="item.id">
                {{ moment(item).format('DD.MM.YYYY.') }} 
                <button class="btn btn-primary dateItemDelete" v-on:click="removeElement(index)">
                  X
                </button>
              </li>
            </div>
            <input
              id="donationDate"
              type="date"
              name="donationDate"
              v-model="donationDate"
              class="form-control dateItemInput"
            >
            <button class="btn btn-primary dateItemInputBtn" v-on:click="checkDate()">Dodaj datum donacije</button>
          </div>
          
          
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      donationDate: "",
      dates: []
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["addDonation"]),
        ...mapActions(["getProfile"]),
    checkDate() {
      var now = new Date();
      const date2 = new Date(this.donationDate);

      if (date2 > now) {
        alert("Pokušavate dodati budući datum!");
      }else {
        const date1 = new Date(this.dates[0]);
        var result = (date1.getTime() - date2.getTime()) /(1000*60*60*24);

        if(result < 0) {result *= -1;}

        if(this.user.sex == "Muškarac") {
          if(result < 90) {
            alert("Difference between dates has to be 3 months!");
          }else {
            this.addDonations();
          }
        } else if (this.user.sex == "Žena") {
          if(result < 120) {
            alert("Difference between dates has to be 4 months!");
            console.log(result)
          }else {
            this.addDonations();
          }
        }
      }
    },
    addDonations() {
      if(this.donationDate !== ""){
        this.dates.push(this.donationDate);
        let user = {
          _id: this.user._id,
          dates: this.dates,
        };
         var date_sort_desc = function (date1, date2) {
            if (date1 > date2) return -1;
            if (date1 < date2) return 1;
            return 0;
          };
          this.dates.sort(date_sort_desc);
        this.addDonation(user)
      }else {
        alert("Please choose a date!");
      }
    },
    removeElement(index) {
      if(confirm("Are you sure you want to delete?")){
        this.$delete(this.dates, index);
          let user = {
            _id: this.user._id,
            dates: this.dates,
          };
        this.addDonation(user)
      }             
    }
  },
  created() {
    this.getProfile().then(res => {
        if (res.data.success) {
          this.dates = this.user.donationDate;

          var date_sort_desc = function (date1, date2) {
            if (date1 > date2) return -1;
            if (date1 < date2) return 1;
            return 0;
          };
          this.dates.sort(date_sort_desc);
        }
      }
    );
  },
};
</script>

<style>
.sidenavDonations {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 150px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: rgb(73, 109, 121);
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 70px;
  box-shadow: 0px 3px 10px 3px #000000;
}
.sidenavDonations a {
  padding: 6px 15px 6px 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: rgb(219, 219, 219);
  display: block;
}
.sidenavDonations a:hover {
  color: #f1f1f1;
}
.donations {
  width: 89%;
  height: 1000px;
  margin-left: 148px;
}
.dateList {
  padding-top: 15px;
  padding-left: 20px;
  background-color: white;
  padding-bottom: 20px;
}
.dateItem {
  list-style-type: none;
  height: 40px;
  border-bottom: 1px solid rgb(206, 206, 206);
  margin-bottom: 10px;
  line-height: 40px;
  padding-left: 10px;
  margin-right: 20px;
}
.dateItemDelete {
  float: right;
  margin-right: 10px;
  
}
.dateItemInput, .dateItemInputBtn {
  margin: 0 auto;
  width: 40%;
}
.dateItemInputBtn {
  display: block;
}

.dateBox {
  width: 100%;
}
</style>
