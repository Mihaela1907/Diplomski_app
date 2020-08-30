<template>
  <div>
    <div id="hide">Hide</div>
    <br>
    <br>
    <GmapMap style="width: 570px; height: 570px" :zoom="7" :center="{lat: 44.555519, lng: 16.369490}">
      <div id="hide">Hide</div>
      <GmapMarker v-for="(marker, index) in markers"
        :label= "{
          text: labelGroups[index], 
          color: 'white',
          }"
        :key="index"
        :position="marker.position"
        @click="showLabelClick(index)"
        @mouseover="showLabelData(index)"
        @mouseout="hideLabelData()"
        />
        <!-- <GmapCircle
            :center="{lat: 45.5522199, lng: 18.6987464}"
            :radius="1000"
            :visible="true"
            :options="{fillColor:'red',fillOpacity:0.3,strokeColor:'transparent'}"
        ></GmapCircle> -->
    </GmapMap>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
name: "VueMaps",
    data() {
        return {
        markers: [],
        place: null,
        lat: [],
        lng: [],
        labelGroups: [],
        donorsInfo: []
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),
    showLabelClick(index) {
      console.log("klik")
      alert(this.donorsInfo[index+1].name +" "+ this.labelGroups[index])
    },
    showLabelData(index) {
      document.getElementById("hide").style.display = "block"
      document.getElementById("hide").style.fontWeight = "500"
      document.getElementById("hide").style.fontSize = "20px"
      document.getElementById("hide").style.backgroundColor = "#EA4335"
      document.getElementById("hide").style.color = "white"
      document.getElementById("hide").style.borderRadius = "10px"
      document.getElementById("hide").style.padding = "5px"
      document.getElementById("hide").innerText = this.donorsInfo[index].name +", "+ this.labelGroups[index]
      document.getElementById("hide").style.position = "absolute"
    },
    hideLabelData() {
      document.getElementById("hide").style.display = "none"
    }
  },
  created() {
    this.getUsers().then(res => {
      if (res.data.success) {
        this.donorsInfo = res.data.users
        this.donorsInfo.shift()
        for(var i=0;i<this.donorsInfo.length;i++) {
          this.lat[i] = this.donorsInfo[i].residence[5]
          this.lng[i] = this.donorsInfo[i].residence[6]
          this.labelGroups[i] = this.donorsInfo[i].bloodgroup
        }
        console.log(this.labelGroups.length)
        console.log(this.donorsInfo.length)
        for(var j=0;j<this.lat.length;j++) {
        this.markers.push({
            position: {
              lat: Number(this.lat[j]),
              lng: Number(this.lng[j]),
            }
          })
        } 
      }
    });
  },
  async mounted() {
      await this.$gmapApiPromiseLazy();
  }
}
</script>

<style>
#hide {
  display: none;
  z-index: 1000;
}
</style>