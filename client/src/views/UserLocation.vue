<template>
    <div class="card">
        <input
            type="text"
            placeholder="Enter your address"
            v-model="address"
            id="autocomplete"
        />
    </div>
</template>

<script>
const google = window.google;
import axios from 'axios';
   export default {
     data() {
       return {
         address: "",
       };
     },
    mounted() {
        new google.maps.places.Autocomplete(
            document.getElementById("autocomplete")
  );
    },
    methods: {
        async getStreetAddressFrom(lat, long) {
            try {
                var {
                    data
                } = await axios.get(
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    lat +
                    "," +
                    long +
                    "&key={AIzaSyAypSlicctdU2KGX8UkpuldippEVzMovfk}"
                );
                if (data.error_message) {
                    console.log(data.error_message)
                } else {
                    this.address = data.results[0].formatted_address;
                }
            } catch (error) {
                console.log(error.message);
            }
        }
     }
   };
</script>