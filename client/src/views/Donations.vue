<template>
  <div>
    <h2>Donations</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <input v-model="proba"
        type="date">
        <button class="btn btn-primary" v-on:click="addToDb()">Add date test</button>
        <form @submit.prevent="addDonations">
          <div class="form-group">
            <li class="list-group-item" v-for="item in items" :key="item.id">Date: {{ item }}</li>
              <input
                id="donationDate"
                type="date"
                placeholder="Update date"
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
      proba: "",
      items: []
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["addDonation"]),
        ...mapActions(["getProfile"]),
    addDonations() {
      console.log(this.user._id)
      let user = {
        _id: this.user._id,
        donationDate: this.donationDate,
      };
      this.addDonation(user).then(res => {
        if (res.data.success) {
          this.$router.go();
        }
      });
    },
    addToDb(){
      this.items.push(this.proba);
      console.log(this.items);
    }
  },
  created() {
    this.getProfile().then(res => {
        if (res.data.success) {
          this.items = this.user.donationDate;
          console.log(this.items);
        }
      }
    );
  },
};
</script>

<style>
</style>
