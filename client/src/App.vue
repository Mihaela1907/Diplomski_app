<template>
  <div id="app" class="app">
    <Navbar/>
    <div class="">
      <!-- <Errors v-if="error" :msg="error"/> -->
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
//import Errors from "@/components/Errors";
import Footer from "@/components/Footer"
export default {
  components: {
    Navbar,
    //Errors,
    Footer
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
</style>
