let map
let sensorData
let heatmap

let directionsService
let directionsDisplay

function initMap() {
  const BCN_LOC = new google.maps.LatLng(41.390205, 2.154007)
  map = new google.maps.Map(document.getElementById('map'), {
    center: BCN_LOC,
    zoom: 15,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
  });
  directionsService = new google.maps.DirectionsService()
  directionsDisplay = new google.maps.DirectionsRenderer({
    hideRouteList: false
  })
  directionsDisplay.setMap(map);
}