<template>
  <div>
    <div id="hospitalAdress">Hide</div>
    <GmapMap id="map" style="width: 570px; height: 570px" :zoom="7" 
    :center="{lat: 44.555519, lng: 16.369490}">
      <GmapMarker v-for="(marker, index) in markers"
        label = ""
        :key="index"
        :position="marker.position"
        @mouseover="showHospital(index)"
        @mouseout="hideHospital()"
        />
    </GmapMap>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//let google = window.google; 
export default {
name: "HospitalsMap",
    data() {
        return {
        userLoc: [],
        markers: [],
        hospitals: [
            {address:'Ulica Josipa Hutlera 4, Osijek',title:'KBC Osijek', lat: '45.558050', lng: '18.713661'},
            {address:'Cvjetno Naselje 16, Velika Gorica',title:'CK Velika Gorica', lat: '45.718680', lng: '16.070094'},
            {address:'Prudnička ulica 54, Savski Marof',title:'CK Zaprešić', lat: '45.867146', lng:'15.721892'},
            {address:'Petrova ulica 3, Zagreb',title:'HZTM', lat:'45.815255', lng:'15.991516'},
            {address:'Ulica Stjepana Radića 3, Kutina',title:'CK Kutina', lat:'45.483382', lng:'16.772746'},
            {address:'Proce 16, Ogulin',title:'CK Ogulin', lat:'45.264384', lng:'15.232083'},
            {address:'Osječka ulica 12, Požega',title:'CK Požega', lat:'45.339986', lng:'17.682089'},
            {address:'Obala pape Ivana Pavla II 61, Dubrovnik',title:'CK Dubrovnik', lat:'42.664407', lng:'18.082270'},
            {address:'Spinčićeva ul. 1, Split',title:'KBC Split', lat:'43.503935', lng:'16.457762'},
            {address:'Ul. Bože Peričića 5, Zadar',title:'Opća bolnica Zadar', lat:'44.107477', lng:'15.234605'},
            {address:'Krešimirova ul. 42, Rijeka',title:'KBC Rijeka', lat:'45.332736', lng:'14.425632'},
            {address:'Kačićev trg 11, Makarska',title:'CK Makarska', lat:'43.293681', lng:'17.020084'},
            {address:'Ul. Eugena Kvaternika 2, Šibenik',title:'CK Šibenik', lat:'43.733885', lng:'15.894046'},
            {address:'Grabovčeva ul. 1, Knin',title:'CK Knin', lat:'44.033552', lng:'16.196514'},
            {address:'Ul. Miroslava Kraljevića 2, Gospić',title:'CK Gospić', lat:'44.546124', lng:'15.374539'},
            {address:'Nobileova ul. 2, Pula',title:'CK Pula', lat:'44.868475', lng:'13.854667'},
            {address:'Ul. bana Josipa Šokčevića 1, Vinkovci',title:'CK Vinkovci', lat:'45.194211', lng:'18.838400'},
            {address:'Ul. Tomaša Masaryka 6, Virovitica',title:'CK Virovitica', lat:'45.829510', lng:'17.382256'},
            {address:'Ul. Ivana Meštrovića 1, Varaždin',title:'Opća bolnica Varaždin', lat:'46.302674', lng:'16.325086'}, 
            {address:'Ul. kralja Tomislava 18, Sisak',title:'CK Sisak', lat:'45.483479', lng:'16.374583'},
            {address:'Trg kralja Tomislava 9, Daruvar',title:'CK Daruvar', lat:'45.593870', lng:'17.224005'},
            {address:'Braće Radića 7, Koprivnica',title:'CK Koprivnica', lat:'46.161257', lng:'16.836446'}, 
            {address:'Ulica Vladimira Nazora 13, Bjelovar',title:'CK Bjelovar', lat:'45.900901', lng:'16.837229'}, 
            {address:'Ul. kralja Tomislava 6, Našice',title:'CK Našice', lat:'45.490415', lng:'18.089723'},
            {address:'',title:'', lat:'', lng:''}
        ]
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    showHospital(index) {
      document.getElementById("hospitalAdress").style.display = "block"
      document.getElementById("hospitalAdress").style.fontWeight = "500"
      document.getElementById("hospitalAdress").style.fontSize = "18px"
      document.getElementById("hospitalAdress").style.backgroundColor = "rgba(190, 0, 0, 0.74)"
      document.getElementById("hospitalAdress").style.color = "white"
      document.getElementById("hospitalAdress").style.borderRadius = "10px"
      document.getElementById("hospitalAdress").style.padding = "5px"
      document.getElementById("hospitalAdress").innerText = this.hospitals[index].address
      document.getElementById("hospitalAdress").style.position = "absolute"
    },
    hideHospital() {
      document.getElementById("hospitalAdress").style.display = "none"
    }
  },
  created() {
        for(var i=0;i<this.hospitals.length;i++) {
            this.markers.push({
                position: {
                lat: Number(this.hospitals[i].lat),
                lng: Number(this.hospitals[i].lng),
                }
            })
        }

    /* this.getUsers().then(res => {
      if (res.data.success) {
            for(var i=0;i<res.data.users.length;i++){
                this.userLoc[i] = res.data.users[i].residence
            }
            this.userLoc.shift()
            
            var a = new google.maps.LatLng(this.userLoc[0][5], this.userLoc[0][6]);
            var b = new google.maps.LatLng(this.hospitals[0].lat, this.hospitals[0].lng);
            var dist = google.maps.geometry.spherical.computeDistanceBetween(a,b);

            console.log(dist) 
             var gMap = new google.maps.Map(document.getElementById('map')); 
            gMap.setZoom(13);      // This will trigger a zoom_changed on the map
            gMap.setCenter(new google.maps.LatLng(Number(this.hospitals[0].lat), Number(this.hospitals[0].lng))); 
      }
    }); */
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();
  }
}
</script>

<style>
#hospitalAdress {
  display: none;
  z-index: 1000;
}
</style>