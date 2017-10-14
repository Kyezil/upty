let map
let sensorData
let heatmap

let directionsService
let directionsDisplay

function initMap() {
  const BCN_LOC = new google.maps.LatLng(41.390205, 2.154007)
  map = new google.maps.Map(document.getElementById('map'), {
    center: BCN_LOC,
    zoom: 15
  });
  directionsService = new google.maps.DirectionsService()
  directionsDisplay = new google.maps.DirectionsRenderer({
    hideRouteList: false
  })
  directionsDisplay.setMap(map);
}