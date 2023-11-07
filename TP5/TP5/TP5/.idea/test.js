





var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 9,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


// Créez un objet qui mappe les noms des pays aux coordonnées géographiques
var coordinates = {
    "france": [48.8566, 2.3522], // Paris, France
    "belgique": [50.8503, 4.3517], // Brussels, Belgium
    "italie": [41.9028, 12.4964], // Rome, Italy
    "canada": [45.4215, -75.6919], // Ottawa, Canada
    "japon": [35.6895, 139.6917] // Tokyo, Japan
    // Ajoutez d'autres pays et leurs coordonnées si nécessaire
};

$(document).ready(function() {
    // ... Votre code existant ...

    // Utilisez le nom du pays pour obtenir les coordonnées et mettre à jour la carte
    $( "#droppable" ).droppable({
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function( event, ui ) {
            // Obtenez le nom du pays depuis l'élément déposé
            var countryName = ui.helper.text().trim().toLowerCase();

            // Obtenez les coordonnées du pays à partir de l'objet coordinates
            var countryCoordinates = coordinates[countryName];

            // Si les coordonnées existent, définissez la vue de la carte sur ces coordonnées
            if (countryCoordinates) {
                var latlng = L.latLng(countryCoordinates[0], countryCoordinates[1]);
                map.setView(latlng, 6); // Zoom sur le pays avec un niveau de zoom de 6
            } else {
                alert("Coordonnées non disponibles pour ce pays.");
            }
        }
    });
});
