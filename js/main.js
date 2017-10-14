const BROKER_URL = 'http://api.thingtia.cloud/data/myProvider1'
const IDENTITY_KEY = 'c61a6bfe99345f8912c455c9f80f04221fdfb9f094619063518481404564ae77'

function displayRoute() {
  directionsService.route({
    origin: new google.maps.LatLng(41.377118, 2.171646),
    destination: new google.maps.LatLng(41.385321, 2.173234),
    travelMode: 'WALKING',
    provideRouteAlternatives: true,
  }, function(response, status) { console.log(response)
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function displaySensors() {
  if (!heatmap) {
    heatmap = new HeatmapOverlay(map, {
      radius: 0.001,
      maxOpacity: 0.5, 
      scaleRadius: true,
      useLocalExtrema: true
    })
  }
  heatmap.setData({
    max: 8,
    data: genData()
  })
}

function parseSensorData(resp) {
    return JSON.parse(resp)
}

function genData() {
  const from = {
    lat: 41.392101,
    lon: 2.130498
  }
  const to = {
    lat: 41.359744,
    lon: 2.171751
  }
  const n = 500
  let res = []
  for (i = 0; i < n; ++i) {
    res.push({
      lat: Math.random() * (to.lat - from.lat) + from.lat,
      lng: Math.random() * (to.lon - from.lon) + from.lon,
      value: Math.random()
    })
  }
  return res
}

function getSensorData() {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      if (xmlHttp.responseText != undefined) {
        sensorData = parseSensorData(xmlHttp.responseText)
      }
  }
  xmlHttp.open('GET', BROKER_URL, true)
  xmlHttp.setRequestHeader('IDENTITY_KEY', IDENTITY_KEY)
  xmlHttp.send(null);
}

displayRoute()
displaySensors()