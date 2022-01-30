// Store our API endpoint inside queryUrl. In the Past 30 days M4.5+ Earthquakes updated every minute
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"



//code used from Activity 10 Day 1 of Map Unit (week 17)

//-----------------------------Perform a GET request to the query URL-------------------------------------------------
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

//function for handling Features array from GeoJSON
function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  
  
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.mag + " Magnitude Earthquake </h3><p>" + "<h3>" + feature.geometry.coordinates[2]+ " km Depth </h3><p>"+ feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }



  

  //function for setting color of each circle marker
    function setColor (depth){

        switch(true){

          case depth>60:
            return "#800026";
          case depth>45:
              return "#BD0026";
          case depth>30:
            return "#E31A1C";
          case depth>15:
              return "#FC4E2A";
          case depth>5:
                return "#FD8D3C";
          default:
                return "#FFEDA0";
       }
    }

    // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {

    pointToLayer: (earthquakeData, latlng) => {
            
      return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
      stroke: true,
      weight: 1,
      fillOpacity: 1,
      color: "black",
      fillColor: setColor(earthquakeData.geometry.coordinates[2]),
      radius: earthquakeData.properties.mag*3.0
    });
  },


  onEachFeature: onEachFeature
  });


  // Sending our earthquakes layer to the createMap function

  createMap(earthquakes);

}




//---------------------------------------overall function for creating Map---------------------------------
function createMap(earthquakes) {





  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
   
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    worldCopyJump:true,
  
    layers: [streetmap, earthquakes]
  });





  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

//getColor function and create legend code taken from https://leafletjs.com/examples/choropleth/

  function getColor(d) {
    return d > 60 ? '#800026' :
           d > 45 ? '#BD0026' :
           d > 30 ? '#E31A1C' :
           d > 15 ? '#FC4E2A' :
           d > 5  ? '#FD8D3C' :
                                '#FFEDA0';
}
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 15, 30, 45, 65],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};



legend.addTo(myMap);



}
 