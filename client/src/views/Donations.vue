<template>
  <div>
    <h2>Donations</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <form @submit.prevent="addDonations">
          <div class="form-group">
            <div class="dateList">
              <li class="list-group-item" v-for="item in dates" :key="item.id">Date: {{ moment(item).format('DD.MM.YYYY.') }}</li>
            </div>
            <input
              id="donationDate"
              type="date"
              name="donationDate"
              v-model="donationDate"
              class="form-control"
            >
          </div>
          <button class="btn btn-primary">Add date</button>
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
    addDonations() {
      //console.log(this.user._id)
      this.dates.push(this.donationDate);
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
