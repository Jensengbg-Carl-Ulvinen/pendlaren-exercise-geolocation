import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geolocation: [],
    stations: "",
    bussDeparture: ""

  },
  mutations: {
    addGeolocation(state, item) {
      state.geolocation.push(item)
      console.log(typeof state.geolocation, 'Geolocation states')
    },
    addStations(state, item) {
      state.stations = item.StopLocation
      console.log(state.stations, 'Stations states')
    },
    addbussDeparture(state, item) {
      state.bussDeparture = item.Departure
      console.log(state.bussDeparture, 'Buss departure states')
    },
  },

  actions: {

    //This is where i get location data
    getLocation({
      commit,
      dispatch
    }) {
      console.log("Getting Location..")
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          let currentLocation = await position.coords; //These can be used to determine a travelers lat/long
          commit("addGeolocation", currentLocation);
          dispatch('getTravelPlan');

        })
      } else {
        console.log("Error, unable to determine location.");
      }
    },

    // This is where i get data about the stations
    async getTravelPlan({
      commit
    }) {

      console.log("Getting nearest station..")
      const apiKeyTravelPlan = '793cffcc-c8bb-417a-86b6-cd54bba697ba'
      const baseUrlTravelPlan = "https://api.resrobot.se/v2/location.nearbystops?"
      let latitude = 57.7066 //Hard coded for now, can be changed to what variables the getLocation function derives
      let longitude = 11.9672 //Hard coded for now, can be changed to what variables the getLocation function derives


      let url = `${baseUrlTravelPlan}key=${apiKeyTravelPlan}&originCoordLat=${latitude}&originCoordLong=${longitude}&format=json`;
      try {
        let response = await fetch(url);
        let data = await response.json();
        commit('addStations', data)

      } catch (error) {
        console.log(error, "Error, unable to determine nearest station.");
      }

      // This is where i fetch time tables for departures.
    },
    async getDepartureTime({
      commit
    }, stations) {

      console.log("Getting departure time table..")
      const apiKeyTidtabell = '195a29d3-abd9-4d2c-bad4-bed8aec52efb';
      const baseUrlDepartureTime = 'https://api.resrobot.se/v2/departureBoard?';
      let stationId = stations;

      let url = `${baseUrlDepartureTime}key=${apiKeyTidtabell}&id=${stationId}&maxJourneys=2&format=json`

      try {
        let response = await fetch(url);
        let data = await response.json();
        commit('addbussDeparture', data)
        console.log('data supplied')

      } catch (error) {
        console.log(error, "Error, cant get departure time tables.");
      }
    },
  },
  modules: {}
})