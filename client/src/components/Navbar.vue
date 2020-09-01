<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand tab" to="/">Blood Bank</router-link>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link tab" v-if="!isLoggedIn">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link tab">O darivanju</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link tab">Prijava</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link tab">Registracija</router-link>
        </li>   
        <li class="nav-item" v-if="isLoggedIn && isBasic">
          <router-link to="/profile" class="nav-link tab">Profil</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && isBasic">
          <router-link to="/donations" class="nav-link tab">Donacije</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && !isBasic">
          <router-link to="/adminmain" class="nav-link tab">Naslovnica</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && !isBasic">
          <router-link to="/donors" class="nav-link tab">Donori</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && !isBasic">
          <router-link to="/finddonor" class="nav-link tab">Nađi donore</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a to="/logout" class="nav-link tab" @click.prevent="logoutUser">Odjava</a>
        </li>
      </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["user"]),
    isBasic () {
      return this.user && this.user.role == "basic";
    }
  },
  created () {
    this.getProfile();
  },
  methods: {
    ...mapActions(["getProfile"]),
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>

<style>
.navbar {
  box-shadow: 0px 3px 10px 3px #464646;
  z-index: 1;
}
.tab {
  font-weight: 500;
}
</style>
