// Create a map object.
let myMap = L.map("map", {
    // center: [40.5994, -28.6731],
    center: [3.9014,28.2333],
    zoom: 2
  });

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a legend to display information about our map.
let info = L.control({
    position: "bottomright"
  });

d3.json(link).then(function(data) {
    dataset = data.features;
    //console.log(dataset.length)
    for (let i = 0; i < dataset.length; i++) {

        // Conditionals for earthquakes depth
        let color_to_fill = "";
        
        if (dataset[i].geometry.coordinates[2] > 90) {
            color_to_fill = "#2e0514";
        }
        else if (dataset[i].geometry.coordinates[2] > 70) {
            color_to_fill = "#8b0f3b";
        }
        else if (dataset[i].geometry.coordinates[2] > 50) {
            color_to_fill = "#ed4781";
        }
        else if (dataset[i].geometry.coordinates[2] > 30) {
            color_to_fill = "#f175a1";
        }
        else if (dataset[i].geometry.coordinates[2] > 10) {
        color_to_fill = "#f6a3c0";
        }
        else {
            color_to_fill = "#f6bfa3";
        }
        
        let cordinates = [dataset[i].geometry.coordinates[0],dataset[i].geometry.coordinates[1]]
        L.circle(cordinates, {
            fillOpacity: 0.9,
            color:'grey',
            fillColor: color_to_fill,
            radius:  dataset[i].properties.mag * 50000
            }).bindPopup(`<h1>${dataset[i].properties.place}</h1> <hr> <h3>Magnitude: ${dataset[i].properties.mag}
                </h3><hr> <h3>Depth: ${dataset[i].geometry.coordinates[2]}</h3>`)
            .addTo(myMap); 
    }
    // Create a legend to display information about our map.
    info.onAdd = function() {
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML += '<i style="background:#f6bfa3"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background:#f6a3c0"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background:#f175a1"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background:#ed4781"></i><span>50 - 70</span><br>';
        div.innerHTML += '<i style="background:#740d31"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background:#2e0514"></i><span>90+</span>';
        return div;
    };
    // Add the info legend to the map.
    info.addTo(myMap);
  });



