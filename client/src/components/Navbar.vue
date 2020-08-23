<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Blood Bank</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">O darivanju</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link">Prijava</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Registracija</router-link>
        </li>   
        <li class="nav-item" v-if="isLoggedIn && isBasic">
          <router-link to="/profile" class="nav-link">Profil</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && isBasic">
          <router-link to="/donations" class="nav-link">Donacije</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && !isBasic">
          <router-link to="/donors" class="nav-link">Donori</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && !isBasic">
          <router-link to="/finddonor" class="nav-link">Nađi donore</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a to="/logout" class="nav-link" @click.prevent="logoutUser">Odjava</a>
        </li>
      </ul>
    </div>
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
  box-shadow: 0px 3px 10px 3px #888888;
  z-index: 1;
}
</style>
