<template>
  <div>
    <label>
      <GmapAutocomplete @place_changed="setPlace">
      </GmapAutocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <br/>

    <GmapMap style="width: 600px; height: 300px;" :zoom="13" :center="{lat: 45.5522199, lng: 18.6987464}">
      <GmapMarker v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        />
      <GmapMarker
        v-if="this.place"
        label="★"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
        />
        <GmapCircle v-for="(pin, ind) in markers"
        :key="ind"
        :center="pin.position"
        >
        </GmapCircle>
        <GmapCircle
            v-if="this.place"
            :center="{
                lat: this.place.geometry.location.lat(), 
                lng: this.place.geometry.location.lng()
            }"
            :radius="1000"
            :visible="true"
            :options="{fillColor:'red',fillOpacity:0.3,strokeColor:'transparent'}"
        ></GmapCircle>
    </GmapMap>
  </div>
</template>

<script>
let google = window.google; 
export default {
name: "VueMaps",
    data() {
        return {
        markers: [],
        place: null,
    }
  },
  description: 'Autocomplete Example (#164)',
  methods: {
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place
    },
    usePlace() {
      if (this.place) {
        console.log(this.place)

        var a = new google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng());
        var b = new google.maps.LatLng(45.5513332, 18.6987464);
        console.log(google.maps.geometry.spherical.computeDistanceBetween(a,b));
        alert(google.maps.geometry.spherical.computeDistanceBetween(a,b));

        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }
        })
        console.log("lat"+this.place.geometry.location.lat())
        console.log("lng"+this.place.geometry.location.lng())
        this.place = null;
      }
    }
  },
  async mounted() {
      await this.$gmapApiPromiseLazy();
  }
}
</script>