let map
let sensorData
let heatmap

let directionsService
let directionsDisplay

let UIControl

const WAYPOINTS_CONSIDERED = 5

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
    fullscreenControl: false
  });
  directionsService = new google.maps.DirectionsService()
  directionsDisplay = new google.maps.DirectionsRenderer({
    hideRouteList: false
  })
  
  directionsDisplay.setMap(map);
  
  UIControl = new UIControlCenter()
  
  // auto complete input
  const originInput = document.getElementById('maps-origin')
  const originAuto = new google.maps.places.Autocomplete(originInput)
  originAuto.bindTo('bounds', map)
  
  originAuto.addListener('place_changed', function() {
    UIControl.changeOrigin(originAuto.getPlace())
  })
  
  // auto complete input
  const destinationInput = document.getElementById('maps-destination')
  const destinationAuto = new google.maps.places.Autocomplete(destinationInput)
  destinationAuto.bindTo('bounds', map)
  destinationAuto.addListener('place_changed', function() {
    UIControl.changeDestination(destinationAuto.getPlace())
  })
}

class UIControlCenter {
  constructor() {
    this.originMarker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    })
    this.destinationMarker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    })
    this.travelMode = 'WALKING'
    this.preference = 'time'
    this.originPlace = undefined
    this.destinationPlace = undefined
  }
  placeMarker(place, marker) {
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }
  viewOne(place, marker) {
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
  }
  viewTwo() {
    // create common bounds
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(this.originMarker.position)
    bounds.extend(this.destinationMarker.position)
    map.fitBounds(bounds)
  }
  setLocalPosition(type) {
    if (navigator.geolocation) {
      const that = this
      navigator.geolocation.getCurrentPosition(function(position) {
        const place = {
          icon: 'https://cdn0.iconfinder.com/data/icons/map-3/1024/location-128.png',
          geometry: {
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
        }
        if (type === 'origin') {
          $('#maps-origin').val('My location')
          that.changeOrigin(place)
        }
        else {
          $('#maps-destination').val('My location')
          that.changeDestination(place)
        }
      });
    }
  }
  changeOrigin(place) {
    this.originPlace = place
    this.originMarker.setVisible(false)
    if (!place.geometry) {
      alert("No details available for input " + place.name)
      this.originPlace = undefined
      return
    }
    this.placeMarker(place, this.originMarker)
    if (this.destinationPlace == undefined)
      this.viewOne(this.originPlace, this.originMarker)
    else
      this.viewTwo()
  }
  changeDestination(place) {
    this.destinationPlace = place
    this.destinationMarker.setVisible(false)
    if (!place.geometry) {
      alert("No details available for input " + place.name)
      this.destinationPlace = undefined
      return
    }
    this.placeMarker(place, this.destinationMarker)
    if (this.originPlace == undefined)
      this.viewOne(this.destinationPlace, this.destinationMarker)
    else
      this.viewTwo()
  }
  changeTravelMode(button) {
    this.travelMode = button.getAttribute('data-mode')
    // change css clases
    $(button).closest('#travelModeChoice').find('button').removeClass('active')
    $(button).addClass('active')
  }
  changePreference(select) {
    this.preference = select.value
  }
  search() {
    const preference = this.preference
    const origin = this.originPlace.geometry.location
    const destin = this.destinationPlace.geometry.location
    const travel = this.travelMode
    computeRoute(origin, destin, travel)
      .then(function (dirResults) {
        if (preference === 'time')
          directionsDisplay.setDirections(dirResults);
        else {
          // generate waypoints
          const waypoints = wayPointRoutes(sensorData, dirResults.routes[0].overview_path)
          const routes = waypoints.slice(0, WAYPOINTS_CONSIDERED).map(function f(point) {
            return computeRoute(origin, destin, travel, false, [{
              location: point,
              stopover: false
            }])
          })
          Promise.all(routes).then(function (values) {
            const goodRoutes = values.filter(function f(r) {
              return r.status === 'OK'
            })
            const valuation = valueRoutes(sensorData, goodRoutes.map(function(r) { return r.routes[0].overview_path}))
            console.log(valuation)
            const maxIndex = valuation.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
            const bestRoute = goodRoutes[maxIndex]
            directionsDisplay.setDirections(bestRoute)
          })
        }
      }, function (status) {
        window.alert('Directions request failed due to ' + status);
     })
  }
}