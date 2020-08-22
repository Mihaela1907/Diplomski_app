<template>
  <div>
    <h2>Donations</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <form >
          <div class="form-group">
            <div class="dateList">
              <li class="list-group-item" v-for="(item,index) in dates" :key="item.id">
                Date: {{ moment(item).format('DD.MM.YYYY.') }} 
                <button class="btn btn-primary" v-on:click="removeElement(index)">
                  X
                </button>
              </li>
            </div>
            <input
              id="donationDate"
              type="date"
              name="donationDate"
              v-model="donationDate"
              class="form-control"
            >
          </div>
          <button class="btn btn-primary" v-on:click="checkDate">Add date</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </form>
      </ul>
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
      const date1 = new Date(this.dates[0]);
      const date2 = new Date(this.donationDate);
      var result = (date1.getTime() - date2.getTime()) /(1000*60*60*24);
      if(result < 0) {result *= -1;}

      if(this.user.sex == "Male") {
        if(result < 90) {
          alert("Difference between dates has to be 3 months!");
        }else {
          this.addDonations();
        }
      } else if (this.user.sex == "Female") {
        if(result < 120) {
          alert("Difference between dates has to be 4 months!");
          console.log(result)
        }else {
          this.addDonations();
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
        this.addDonation(user).then(res => {
          if (res.data.success) {
            this.$router.go();
          }
        });
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
        this.addDonation(user).then(res => {
            if (res.data.success) {
              this.$router.go();
            }
        });
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
.dateList {
  height: 200px;
  overflow-y: auto;
}
</style>
