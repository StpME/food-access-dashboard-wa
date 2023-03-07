
// Use this for layer template

// which layers are active
let status = [
    "median_income-active",
    "median_income2-active"
];

// toggles activeness of layer
function handleSwitch(layer) {
    let index = 1;
    if (layer == "median_income") {
        index = 0;
    } else if (layer == "median_income2") {
        index = 1;
    }

    if (status[index] == layer + "-active") {
        status[index] = layer;
        map.setLayoutProperty(layer, "visibility", "none");
      } else if (status[index] == layer) {
        status[index] = layer + "-active";
        map.setLayoutProperty(layer, "visibility", "visible");
      }
};

mapboxgl.accessToken =
            'pk.eyJ1IjoiZGltZW50aW8iLCJhIjoiY2xhMngzZmEyMDRtdDN2bW93MjYyY2hvbSJ9.lBP2u-C8BEgug7_ye16y2g';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: [-120.79438630057388, 47.53695842091479], // starting position [lng, lat]
    zoom: 6.5, // starting zoom
    projection: 'mercator'
});
// Full Screen toggle
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
// Zoom/nav control
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
// Prevent user from tilting or rotating
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.on('load', () => {
    map.addSource('median', {
        type: 'geojson',
        data: 'assets/WA_QGIS.geojson'
    });

    map.addLayer({
        'id': 'median_income',
        'type': 'circle',
        'source': 'median',
        'paint': {
            // increase the radii of the circle (not working)
            'circle-radius': {
                'property': 'MedianFamilyIncome',
                'stops': [
                    [grades[0], radii[0]],
                    [grades[1], radii[1]],
                    [grades[2], radii[2]]
                ]
            },
            'circle-color': {
                'property': 'MedianFamilyIncome',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]]
                ]
            },
            'circle-stroke-color': 'green',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6

        }
    });

    map.addLayer({
        'id': 'median_income2',
        'type': 'circle',
        'source': 'median',
        'paint': {
            // increase the radii of the circle (not working)
            'circle-radius': {
                'property': 'MedianFamilyIncome',
                'stops': [
                    [grades[0], radii[0]],
                    [grades[1], radii[1]],
                    [grades[2], radii[2]]
                ]
            },
            'circle-color': {
                'property': 'MedianFamilyIncome',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6

        }
    });


});

const grades = [50000, 75000, 100000],
    colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
    radii = [4, 8, 12];

map.on('click', 'median_income', (event) => {
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(`<strong>Median Family Income ($):</strong> ${event.features[0].properties.MedianFamilyIncome}`)
        .addTo(map);
});

// create legend object, it will anchor to the div element with the id legend.
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<strong>Median Family Income ($):</strong>'],
    vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radius = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p>');
}






// Side Panel
function showCensusTractStats(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['median_income'] });
    if (!features.length) {
        return;
    }

    var feature = features[0];
    var infoPanel = document.getElementById('side-panel');
    infoPanel.innerHTML = 
                        '<h1 id="title">Washington Statistics</h1>' +
                        '<p id="description"> Identifying which populations in WA state are most susceptible to food insecurity. Click on a census tract to learn more.</p>' +
                        '<p>Census Tract: ' + feature.properties.CensusTract + '</p>' +
                        '<p>Population: ' + feature.properties.Pop2010 + '</p>' +
                        '<p>Median Income: $' + feature.properties.MedianFamilyIncome + '</p>';
}
map.on('click', 'median_income', showCensusTractStats);
/*const source =
    '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">NYTimes</a></p>'; */

// combine all the html codes.
// legend.innerHTML = labels.join('') + source;




// Starter code from lab 3 - choropleth layers
/*
map.addLayer({
        'id': 'rate-point',
        'type': 'fill',
        'source': 'rates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#FFEDA0',   // stop_output_0
                19,          // stop_input_0
                '#FED976',   // stop_output_1
                39,          // stop_input_1
                '#FEB24C',   // stop_output_2
                59,          // stop_input_2
                '#FD8D3C',   // stop_output_3
                79,         // stop_input_3
                '#FC4E2A',   // stop_output_4
                99,         // stop_input_4
                '#E31A1C',   // stop_output_5
                119,         // stop_input_5
                '#BD0026',   // stop_output_6
                139,        // stop_input_6
                "#800026"    // stop_output_7
            
            ],
            'fill-outline-color': '#000000',
            'fill-opacity': 0.7,
        }
    }); */

    
// Starter code from lab 3 - interactive data display on click

    // On county click: show rate pop up box  
    /*map.on('click', 'rate-point', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates[0][0])
            .setHTML(`<strong>COVID-19 Rate: </strong>${e.features[0].properties.rates}`)
            .addTo(map);
    }); */


// starter code from lab 3 - legend 
/*const layers = [
'0-19',
'20-39',
'40-59',
'60-79',
'80-99',
'100-119',
'120-139',
'140+'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70',
    '#BD002670',
    '#80002670'
];
const legend = document.getElementById('legend');
legend.innerHTML = "<b>Rate of COVID-19 cases (per 1000)</b><br>";
layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
}); */


// Starter code from lab 4 - map checks

    // After the last frame rendered before the map enters an "idle" state.
/*map.on('idle', () => {
    // If these two layers were not added to the map, abort
    if (!map.getLayer('King County Basemap') || !map.getLayer('Landslide Risk') || !map.getLayer('Landslide + Basemap') || !map.getLayer('Land Features')) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['King County Basemap', 'Landslide Risk', 'Landslide + Basemap', 'Land Features'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'inactive';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            // preventDefault() tells the user agent that if the event does not get explicitly handled, 
            // its default action should not be taken as it normally would be.
            e.preventDefault();
            // The stopPropagation() method prevents further propagation of the current event in the capturing 
            // and bubbling phases. It does not, however, prevent any default behaviors from occurring; 
            // for instance, clicks on links are still processed. If you want to stop those behaviors, 
            // see the preventDefault() method.
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            // if it is currently visible, after the clicking, it will be turned off.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else { //otherise, it will be turned on.
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };

        // in the menu place holder, insert the layer links.
        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
}); */
