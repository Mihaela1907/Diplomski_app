<template>
  <div>
    <GmapMap style="width: 570px; height: 570px" :zoom="13" :center="{lat: 45.5522199, lng: 18.6987464}">
      <GmapMarker v-for="(marker, index) in markers"
        :label= labelGroups[index]
        :key="index"
        :position="marker.position"
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
        labelGroups: []
    }
  },
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"])
  },
  created() {
    this.getUsers().then(res => {
      if (res.data.success) {
        
        for(var i=1;i<res.data.users.length;i++) {
          this.lat[i-1] = res.data.users[i].residence[5]
          this.lng[i-1] = res.data.users[i].residence[6]
          this.labelGroups[i-1] = res.data.users[i].bloodgroup
        }
        console.log(this.labelGroups)
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