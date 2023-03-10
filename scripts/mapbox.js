


let variable = "LATracts_half";
let previousVariable = variable;


// // toggles activeness of layer
function handleSwitch(filterVar) {
    variable = filterVar;
    console.log(variable)
    setFilter(variable);


    map.setPaintProperty("a", 'fill-color', [
        'step',
        ['to-number', ['get', variable]],
        '#FFEDA0',   // stop_output_0
        5,          // stop_input_0
        '#FED976',   // stop_output_1
        10,          // stop_input_1
        '#FEB24C',   // stop_output_2
        20,          // stop_input_2
        '#FD8D3C',   // stop_output_3
        40,         // stop_input_3
        '#FC4E2A',   // stop_output_4
        60,         // stop_input_4
        // '#E31A1C',   // stop_output_5
        // 2000,         // stop_input_5
        // '#BD0026',   // stop_output_6
        // 5000,        // stop_input_6
        "#800026"
    ]);
};

mapboxgl.accessToken =
            'pk.eyJ1IjoiZGltZW50aW8iLCJhIjoiY2xhMngzZmEyMDRtdDN2bW93MjYyY2hvbSJ9.lBP2u-C8BEgug7_ye16y2g';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: [-120.79438630057388, 47.53695842091479], // starting position [lng, lat]
    zoom: 5.9, // starting zoom
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
    map.addSource('WA_QGIS', {
        type: 'geojson',
        data: 'assets/WA_POLYGON.geojson'
    });
    console.log(variable);
    console.log("heyheyheyhey");
    

    // median income layer
    map.addLayer({
        'id': 'a',
        'type': 'fill',
        'source': 'WA_QGIS',
        'paint': {
            'fill-color': [
                'step',
                ['coalesce' , ['to-number', ['get', variable]], 0], // cast Pop2010 to a number
                '#FFEDA0',   // stop_output_0
                5,          // stop_input_0
                '#FED976',   // stop_output_1
                10,          // stop_input_1
                '#FEB24C',   // stop_output_2
                20,          // stop_input_2
                '#FD8D3C',   // stop_output_3
                40,         // stop_input_3
                '#FC4E2A',   // stop_output_4
                60,         // stop_input_4
                // '#E31A1C',   // stop_output_5
                // 2000,         // stop_input_5
                // '#BD0026',   // stop_output_6
                // 5000,        // stop_input_6
                "#800026"
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7,
        }
    });

   


});


// const grades = [50000, 75000, 100000],
//     colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
//     radii = [4, 8, 12];

// map.on('click', 'median_income', (event) => {
//     new mapboxgl.Popup()
//         .setLngLat(event.features[0].geometry.coordinates)
//         .setHTML(`<strong>Median Family Income ($):</strong> ${event.features[0].properties.MedianFamilyIncome}`)
//         .addTo(map);
// });

// // create legend object, it will anchor to the div element with the id legend.
// const legend = document.getElementById('legend');

// //set up legend grades and labels
// var labels = ['<strong>Median Family Income ($):</strong>'],
//     vbreak;
// //iterate through grades and create a scaled circle and label for each
// for (var i = 0; i < grades.length; i++) {
//     vbreak = grades[i];
//     // you need to manually adjust the radius of each dot on the legend 
//     // in order to make sure the legend can be properly referred to the dot on the map.
//     dot_radius = 2 * radii[i];
//     labels.push(
//         '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
//         'px; height: ' +
//         dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
//         '</span></p>');
// }



const layers = [
    '0-4',
    '5-9',
    '10-19',
    '20-39',
    '40-59',
    '60+'
];
const colors = [
    '#FED976',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#800026'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Population with<br>low access to supermarkets</b><br><b>(%)</b>";

const source =
    '<p style="text-align: center; font-size:10pt">Source: <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data/">USDA</a></p>';

// combine all the html codes.
legend.innerHTML = legend.innerHTML + source;

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
});

// map.on('click', 'a', (event) => {
//     console.log(event.features)
//     new mapboxgl.Popup()
//         .setLngLat(event.features[0].geometry.coordinates[0][0])
//         .setHTML(`<strong>Rate:</strong> ${event.features[0].properties.rates}`)
//         .addTo(map);
// });



// Side Panel
var infoPanel = document.getElementById('side-panel');
// Initial Title/Description from index
var initialContent = infoPanel.innerHTML;

function showCensusTractStats(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['a'] });
    if (!features.length) {
        return;
    }
    var feature = features[0];
    // Zoom to tract on-click
    let zoomCoord = [feature.properties.INTPTLON, feature.properties.INTPTLAT,];
         map.flyTo({
             center: zoomCoord,
             zoom: 8,
             essential: true // this animation is considered essential with respect to prefers-reduced-motion
             });

    // If tract is invalid/missing key props, reset to default values
    if (feature.properties.Pop2010 === undefined || feature.properties.Pop2010 === null) {
        var newContent =  
        '<h3><b>County</3>: missing</h1>' +
        '<p><b>Population:</b> missing </p>' +
        '<p><b>Median Income:</b> missing</p>' +
        '<p><b>Poverty Rate: (%):</b> missing</p>';
        infoPanel.innerHTML = initialContent + newContent
    }
    else {
        var newContent =  
                    '<h3><b>' + feature.properties.County + '</b></h3>' +
                    '<p><b>Population:</b> ' + formatter(feature.properties.Pop2010) + '</p>' +
                    '<p><b>Median Income:</b> $' + formatter(feature.properties.MedianFamilyIncome) + '</p>' +
                    '<div><canvas id="myChart1" class="chart"></canvas></div>' + 
                    '<p><b>Poverty Rate: (%):</b> ' + feature.properties.PovertyRate + '</p>' +
                    '<div><canvas id="myChart2" class="chart"></canvas></div>';
        infoPanel.innerHTML = initialContent + newContent
        // charts
        const ctx1 = document.getElementById('myChart1')
        const ctx2 = document.getElementById('myChart2')

        new Chart(ctx1, {
            type: 'bar',
            data: {
              labels: ['State Median Income Avg', 'Census Tract Median Income'],
              datasets: [{
                label: '$',
                data: [87236.66, feature.properties.MedianFamilyIncome],
                borderWidth: 1,
                backgroundColor: [
                    'rgba(110, 38, 14)',
                ],
                borderColor: [
                    'rgba(110, 38, 14)',
                ]
              }]
            },
            options: {
                indexAxis: 'y',
            }
        });
        new Chart(ctx2, {
            type: 'bar',
            data: {
              labels: ['State Poverty Rate Avg %', 'Census Tract Poverty Rate %'],
              datasets: [{
                label: '%',
                data: [12.05, feature.properties.PovertyRate],
                borderWidth: 1,
                backgroundColor: [
                    '#9bb291',
                ],
                borderColor: [
                    '#9bb291',
                ]
              }]
            },
            options: {
                indexAxis: 'y',
            }
        });
    }
}
map.on('click', 'a', showCensusTractStats);

// Casts value to str & adds a comma every 3 letter then returns the new str. 
function formatter(value) {
    str_value = String(value);
    var regex = /(\d)(?=(\d{3})+$)/g;
    return str_value.replace(regex, '$1,');
} 
 

function setFilter(filter) {
    const filterBtn = document.getElementById("filter-btn");
    let display = "None";
    if(filter === "lawhitehalfshare") {
        display = "White";
    }
    if(filter === "lablackhalfshare") {
        display = "Black";
    }
    if(filter === "laasianhalfshare") {
        display = "Asian";
    }
    if(filter === "lahisphalfshare") {
        display = "Hispanic";
    }
    if(filter === "laaianhalfshare") {
        display = "Native";
    }
    if(filter === "lanhopihalfshare") {
        display = "Hawaiian/PacIsl";
    }
    if(filter === "laomultirhalfshare") {
        display = "Other/Mixed";
    }
    if(filter === "lakidshalfshare") {
        display = "Kids";
    }
    if(filter === "laseniorshalfshare") {
        display = "Seniors";
    }
    if(filter === "lalowihalfshare") {
        display = "Low Income";
    }
    if(filter === "lahunvhalfshare") {
        display = "No Vehicle";
    }


    filterBtn.innerText = `Filter: ${display}`;
  }

  