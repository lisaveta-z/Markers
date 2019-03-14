// initialize the map
var map = new L.Map('map', {
  center: [50.0, 20.0],
  zoom: 5,
  minZoom: 3,
  maxZoom: 7
});

// create a new tile layer
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
layer = new L.TileLayer(tileUrl, {
    attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
    maxZoom: 18
});

// add the layer to the map
map.addLayer(layer);

// add markers to the map
for (var i = 0; i < markers.length; ++i) {
 L.marker([markers[i].lat, markers[i].lng], {})
  .bindPopup('<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>')
  .addTo(map);
}

var moscowToParisL = [getCordinates("Moscow"), getCordinates("Paris")];

var myIcon = L.icon({
  iconUrl: 'map/images/airplane.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

// moving marker
var moscowToParisMarker = L.Marker.movingMarker(moscowToParisL, [10000], {icon: myIcon}).addTo(map);
var polyline = L.polyline(moscowToParisL).addTo(map);
polyline.setStyle({
    color: 'red'
});

moscowToParisMarker.once('click', function () {
    moscowToParisMarker.start();
    moscowToParisMarker.closePopup();
    moscowToParisMarker.unbindPopup();
    moscowToParisMarker.on('click', function() {
        if (moscowToParisMarker.isRunning()) {
            moscowToParisMarker.pause();
        } else {
            moscowToParisMarker.start();
        }
    });
    setTimeout(function() {
        moscowToParisMarker.bindPopup('<b>Click me to pause!</b>').openPopup();
    }, 2000);
});

moscowToParisMarker.bindPopup('<b>Click me to start!</b>', {closeOnClick: false});
moscowToParisMarker.openPopup();

function getCordinates(name) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].name === name) {
            return([markers[i].lat, markers[i].lng]);
        }
    }
}
