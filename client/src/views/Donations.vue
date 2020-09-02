<template>
  <div class="donations">
    <div class="sidenavDonations">
      <a v-on:click="filterDates(1900,2100)">Svi datumi</a> 
      <a v-on:click="filterDates(2015,2020)">2015.-2020.</a>
      <a v-on:click="filterDates(2010,2014)">2010.-2014.</a>
      <a v-on:click="filterDates(2005,2009)">2005.-2009.</a>
      <a v-on:click="filterDates(2000,2004)">2000.-2004.</a>
      <a href="#donationDate">Dodaj datum donacije</a>
    </div>

    <div class="dateList" v-if="user">
      <div class="dateBox">
        <input
          id="donationDate"
          type="date"
          name="donationDate"
          v-model="donationDate"
          class="form-control dateItemInput"
        >
        <button class="btn btn-primary dateItemInputBtn" v-on:click="checkDate()">Dodaj datum donacije</button>
        <div class="dateList">
          <li class="dateItem" v-for="(item,index) in lista" :key="item.id">
            {{ moment(item).format('DD.MM.YYYY.') }} 
            <button class="btn btn-primary dateItemDelete" v-on:click="removeElement(index)">
              X
            </button>
          </li>
        </div>
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
      dates: [],
      lista: []
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["addDonation"]),
    ...mapActions(["getProfile"]),
    filterDates(year1,year2) {
      var start_date = new Date(year1+'-01-01');
      var end_date = new Date(year2+'-12-31');

      this.lista = this.dates.filter(function(result) {
        var date = new Date(result);
        return (date >= start_date && date <= end_date);         
      });
    },
    checkDate() {
      var now = new Date();
      const date2 = new Date(this.donationDate);

      if (date2 > now) {
        alert("Pokušavate dodati budući datum!");
      }else {
        for(var i=0;i<this.dates.length;i++) {
          const date1 = new Date(this.dates[i]);
          var result = (date1.getTime() - date2.getTime()) /(1000*60*60*24);

          if(result < 0) {result *= -1;}
          if(this.user.sex == "Muškarac") {
            if(result < 90) {
              var temp = 1;
              break;
            }else {
              temp = 0;
            }
          } else if (this.user.sex == "Žena") {
            if(result < 120) {
              temp = 3;
              break;
            }else {
              temp = 2;
            }
          }
        }
        if(temp == 1) {
          alert("Razlika između doniranja treba biti 3 mjeseca!");
        }else if(temp == 0) {
          this.addDonations();
        }else if(temp == 3) {
          alert("Razlika između doniranja treba biti 4 mjeseca!");
        }else if(temp == 2) {
          this.addDonations();
        }
      }
    },
    addDonations() {
      if(this.donationDate !== ""){
        this.dates.unshift(this.donationDate);

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
        alert("Izaberite datum!");
      }
    },
    removeElement(index) {
      if(confirm("Jeste li sigurni da želite ukloniti izabrani datum?")){
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
          for(var i=0;i<this.dates.length;i++){
            this.dates[i]=new Date(this.dates[i])
          }
          this.lista = this.dates 
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
  min-height: 700px;
  height: 100%;
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
  font-size: 20px;
  font-weight: 500;
  color: rgb(73, 73, 73);
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
