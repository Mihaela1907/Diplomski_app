<template>
  <div id="app" class="app">
    <Navbar/>
    <div class="">
      <Errors v-if="error" :msg="error"/>
      <router-view/>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
import Errors from "@/components/Errors";
export default {
  components: {
    Navbar,
    Errors
  },
  computed: {
    ...mapGetters(["error"])
  }
};
</script>
<style>
.card {
  border-radius: 0px;
}
.btn {
  border-radius: 0px;
}
.app {
  background-color: lightblue;
}
footer {
  background-color: #343A40;
  height: 300px;
  box-shadow: 10px 3px 10px 10px #464646;
  z-index: 1000;
  position:relative;
}
</style>
