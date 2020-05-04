<template>
<div class="home">
<div class="wrapper">
<h1>Pendlaren</h1>
<h2>This tool can show what stations/departures are closest to you.</h2>

<button @click="getStaion()">Get nearest stations</button>
<section v-for="stations in showNearStations" :key="stations.id" class="shown-stations">
  <div class="card">
  <p>{{stations.name}}</p>
  <p>{{stations.dist}} meters away</p>
  <p>{{stations.id}}</p>
  <div><button @click="getTransportations(stations.id)">Get Departures</button> </div> 
  <br>
  </div>
   
</section>
    <section v-for="bussDeparture in showDeparture" :key="bussDeparture.id" class="shown-departures">
      <p>{{bussDeparture.name}}</p>
      <p>{{bussDeparture.time}}</p>
      <p>{{bussDeparture.direction}}</p>
    </section>
  </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },

computed: {
      showNearStations(){
        return this.$store.state.stations;
      },
      showDeparture(){
        return this.$store.state.bussDeparture;
      }

},
methods: {

     getStaion() {
       this.$store.dispatch('getLocation')
     },
          getTransportations(stations) {
       this.$store.dispatch('getDepartureTime', stations)
     }
}

}
</script>

<style lang="css" scoped>

.wrapper{
  padding-top: 10px;
  padding-bottom: 20px;
  border-radius: 10px;
  background: rgba(9, 9, 9, 0.568);
  margin: 2em;
}

.card {
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  margin: 4rem;
  background: rgba(0, 0, 0, 0.466);
}

p, h1, h2{
  font-weight: 100;
}

</style>
