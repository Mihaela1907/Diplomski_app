<template>
  <div>
    <h2>Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item" id="notifyDonation" ref="notifyDonation"></li>
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Birthdate: {{ moment(user.birthdate).format('DD.MM.YYYY.')}}</li>
        <li class="list-group-item">Residence: {{ user.residence }}</li>
        <li class="list-group-item">Blood group: {{ user.bloodgroup }}</li>
        <li class="list-group-item">Phone number: +385 {{ user.phonenumber}}</li>
        <li class="list-group-item">Sex: {{ user.sex }}</li>
        <li class="list-group-item">Able to donate from: {{ moment(this.nextDonation).format('DD.MM.YYYY.') }}</li>
        <router-link to="/userinfo" class="btn btn-primary">Edit user</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      nextDonation: ""
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile().then(res => {
      if (res.data.success) {
        const date1 = new Date(this.user.donationDate[0]);
        var dateMili = date1.getTime();
        if(this.user.sex == "Male") {
          dateMili += 7776000000;
        } else if (this.user.sex == "Female") {
          dateMili += 10368000000;
        }
      }
      this.nextDonation  = new Date(dateMili);

      var now = new Date();

      if (this.nextDonation < now) {
        this.$refs.notifyDonation.innerText = "You can donate!"
      } else {
        this.$refs.notifyDonation.innerText = "You can't yet donate!"
      }

    });
  }
};
</script>

<style>
</style>
