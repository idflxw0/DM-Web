

var map = L.map('map').setView([51.505, -0.09], 13);

var countryCoordinates = {
    "France": [46.603354, 1.888334],
    "Canada": [56.130367, -106.346771],
    "Italie": [42.504154, 12.646361],
    "Belgique": [50.640735, 4.66696],
    "Japan": [36.204823, 138.252930]
};

// Initialize map, layers, and markers as before...

$(function() {
    $(".ui-widget-content").draggable({
        revert: true // This will make the item return to its spot after dragging.
    });

    $("#map").droppable({
        drop: function(event, ui) {
            var countryName = ui.draggable.text().trim();
            var coordinates = countryCoordinates[countryName];
            if (coordinates) {
                map.setView(coordinates, 13);
            } else {
                alert("Coordinates for " + countryName + " not found!");
            }
        }
    });
});


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);


marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}



$( function() {
    $( "#draggable" ).draggable();
    $( "#draggable-2" ).draggable();
    $( "#draggable-3" ).draggable();
    $( "#draggable-4" ).draggable();
    $( "#draggable-5" ).draggable();
    $( "#draggable-6" ).draggable();
  } );

map.on('click', onMapClick);