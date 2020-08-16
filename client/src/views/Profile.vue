<template>
  <div>
    <h2>Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <!-- <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Username: {{ user.username }}</li> -->
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Birthdate: {{ user.birthdate }}</li>
        <li class="list-group-item">Residence: {{ user.residence }}</li>
        <li class="list-group-item">Blood group: {{ user.bloodgroup }}</li>
        <li class="list-group-item">Phone number: {{ user.phonenumber}}</li>
        <li class="list-group-item">Sex: {{ user.sex }}</li>
        <router-link to="/userinfo" class="btn btn-primary">Edit user</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>
</style>
