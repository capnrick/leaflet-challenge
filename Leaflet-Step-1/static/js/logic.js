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

          case depth>65:
            return "blue";
          case depth>45:
              return "green";
          case depth>30:
            return "lightgreen";
          case depth>15:
              return "greenyellow";
          case depth>5:
                return "yellow";
          default:
                return "white";
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
    zoom: 2.5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// // Loop through the features array and create one marker for each feature object
// for (var i = 0; i < feature.length; i++) {

//   // Conditionals for countries points
//   var color = "";
//   if (feature.geometry.coordinates[2] >= 10) {
//     color = "dark-green";
//   }
//   else if (feature.geometry.coordinates[2] >= 5) {
//     color = "green";
//   }
//   else if (feature.geometry.coordinates[2]  >= 3) {
//     color = "yellow-green";
//   }
//   else {
//     color = "yellow";
//   }


//   // // Add circles to map
//   // L.circleMarker(feature[i].location, {
//   //   fillOpacity: 0.75,
//   //   color: "white",
//   //   fillColor: color,
//   //   // Adjust radius
//   //   radius: feature.properties.mag *5,
//   // }).addTo(myMap);
// }
 




  