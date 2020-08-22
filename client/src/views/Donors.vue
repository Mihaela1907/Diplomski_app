<template>
  <div class="donors">
    <h1 class="display3"></h1>
    <div class="card p-3" style="background-color:#d9d9d9">
      <h4>All donors</h4>
      <div class="form-group" v-for="(item, index) in canDonate" :key="item.id">
        <li class="list-group-item" style="background-color:#8cff94">Name: {{ item.name }}
          <button class="btn btn-primary" v-on:click="removeUser(index)">
            X
          </button>
        </li>
        <li class="list-group-item">Donation date: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
        <li class="list-group-item">Blood group: {{ item.bloodgroup }}</li>
        <li class="list-group-item">Adress: {{ item.residence }}</li>
        <li class="list-group-item">Phone number: +385 {{ item.phonenumber }}</li>
      </div>
      <div class="form-group" v-for="(item, index) in cantDonate" :key="item.id">
        <li class="list-group-item" style="background-color:#ff8c8c">Name: {{ item.name }}
          <button class="btn btn-primary" v-on:click="removeUser(index)">
            X
          </button>
        </li>
        <li class="list-group-item">Donation date: {{ moment(item.donationDate[0]).format('DD.MM.YYYY.') }}</li>
        <li class="list-group-item">Blood group: {{ item.bloodgroup }}</li>
        <li class="list-group-item">Adress: {{ item.residence }}</li>
        <li class="list-group-item">Phone number: +385 {{ item.phonenumber }}</li>
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
      canDonate: [],
      cantDonate: [],
      nextDonate: ""
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    removeUser(index) {
      if(confirm("Are you sure you want to delete the user?")){
        this.$delete(this.donors, index);
        }
      }  
  },
  created() {
    this.getUsers().then(res => {
      if (res.data.success) {
          this.donors = res.data.users;
          this.donors.shift();

        for(var i = 0; i< this.donors.length;i++){
          const date1 = new Date(this.donors[i].donationDate[0]);

          var dateMili = date1.getTime();
          if(this.donors[i].sex == "Male") {
            dateMili += 7776000000;
          } else if (this.donors[i].sex == "Female") {
            dateMili += 10368000000;
          }

          this.nextDonate  = new Date(dateMili);
          var now = new Date();

          if (this.nextDonate < now) {
            this.canDonate[i] = this.donors[i];
            this.canDonate.shift();
          } else if (this.nextDonate > now){
            this.cantDonate[i] = this.donors[i];
          }
        }
      }
      });
  },
};
</script>

<style>
</style>
