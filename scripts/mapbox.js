


let variable = "LAhalfand10";
let previousVariable = variable;


// // toggles activeness of layer
function handleSwitch(filterVar) {
    variable = filterVar;
    console.log(variable)


    map.setPaintProperty("a", 'fill-color', [
        'step',
        ['to-number', ['get', variable]],
        '#FFEDA0',   // stop_output_0
        20,          // stop_input_0
        '#FED976',   // stop_output_1
        50,          // stop_input_1
        '#FEB24C',   // stop_output_2
        100,          // stop_input_2
        '#FD8D3C',   // stop_output_3
        500,         // stop_input_3
        '#FC4E2A',   // stop_output_4
        1000,         // stop_input_4
        '#E31A1C',   // stop_output_5
        2000,         // stop_input_5
        '#BD0026',   // stop_output_6
        5000,        // stop_input_6
        "#800026"
    ]);
};

mapboxgl.accessToken =
            'pk.eyJ1IjoiZGltZW50aW8iLCJhIjoiY2xhMngzZmEyMDRtdDN2bW93MjYyY2hvbSJ9.lBP2u-C8BEgug7_ye16y2g';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: [-120.79438630057388, 47.53695842091479], // starting position [lng, lat]
    zoom: 6.2, // starting zoom
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
                ['to-number', ['get', variable]], // cast Pop2010 to a number
                '#FFEDA0',   // stop_output_0
                20,          // stop_input_0
                '#FED976',   // stop_output_1
                50,          // stop_input_1
                '#FEB24C',   // stop_output_2
                100,          // stop_input_2
                '#FD8D3C',   // stop_output_3
                500,         // stop_input_3
                '#FC4E2A',   // stop_output_4
                1000,         // stop_input_4
                '#E31A1C',   // stop_output_5
                2000,         // stop_input_5
                '#BD0026',   // stop_output_6
                5000,        // stop_input_6
                "#800026"    // stop_output_7
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
    '0-99',
    '100-499',
    '500-999',
    '1000-1999',
    '2000-5000',
    '5000+'
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
legend.innerHTML = "<b>Population with<br>low access to supermarkets</b>";

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
    // If tract is invalid/missing key props, reset to default values
    if (feature.properties.Pop2010 === undefined || feature.properties.Pop2010 === null) {
        infoPanel.innerHTML = initialContent
    }
    else {
        formatter(feature.properties.MedianFamilyIncome);
        var newContent =  
                    '<h1>' + feature.properties.County + '</h1>' +
                    '<p>Population: ' + formatter(feature.properties.Pop2010) + '</p>' +
                    '<p>Median Income: $' + formatter(feature.properties.MedianFamilyIncome) + '</p>' +
                    '<p>Senior Rate (%): ' + feature.properties.laseniorshalfshare + '</p>' +
                    '<p>Poverty Rate: (%): ' + feature.properties.PovertyRate + '</p>';
        infoPanel.innerHTML = initialContent + newContent
    }
}
// Casts value to str & adds a comma every 3 letter then returns the new str. 
function formatter(value) {
    str_value = String(value);
    var regex = /(\d)(?=(\d{3})+$)/g;
    return str_value.replace(regex, '$1,');
} 
map.on('click', 'a', showCensusTractStats);

// let zoomCoord = [feature.properties.INTPTLON, feature.properties.INTPTLAT,];
//         map.flyTo({
//             center: zoomCoord,
//             zoom: 8,
//             essential: true // this animation is considered essential with respect to prefers-reduced-motion
//             });
