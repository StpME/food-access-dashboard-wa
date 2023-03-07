
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
                data: 'assets/WA_POLYGON.geojson'
            });

            map.addLayer({
                'id': 'median_income',
                'type': 'fill',
                'source': 'median',
                
                'paint': {
                'fill-color': [
                    'step',
                    ['to-number', ['get', 'Pop2010']], // cast Pop2010 to a number
                    '#FFEDA0',   // stop_output_0
                    1,          // stop_input_0
                    '#FED976',   // stop_output_1
                    5,          // stop_input_1
                    '#FEB24C',   // stop_output_2
                    10,          // stop_input_2
                    '#FD8D3C',   // stop_output_3
                    20,         // stop_input_3
                    '#FC4E2A',   // stop_output_4
                    100,         // stop_input_4
                    '#E31A1C',   // stop_output_5
                    500,         // stop_input_5
                    '#BD0026',   // stop_output_6
                    1000,        // stop_input_6
                    "#800026"    // stop_output_7
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7,
    }
});
});

const layers = [
    '0-9',
    '10-19',
    '20-49',
    '50-99',
    '100-199',
    '200-499',
    '500-999',
    '1000 and more'
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
legend.innerHTML = "<b>Population Density<br>(people/sq.mi.)</b><br><br>";

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

map.on('mousemove', ({point}) => {
    const state = map.queryRenderedFeatures(point, {
        layers: ['median_income']
    });
    document.getElementById('text-description').innerHTML = state.length ?
        `<h3>${state[0].properties.name}</h3><p><strong><em>${state[0].properties.Pop2010}</strong> people per square mile</em></p>` :
        `<p>Hover over a state!</p>`;
});



        //     map.addLayer({
        //         'id': 'median_income',
        //         'type': 'circle',
        //         'source': 'median',
        //         'paint': {
        //             // increase the radii of the circle (not working)
        //             'circle-radius': {
        //                 'property': 'laasianhalf',
        //                 'stops': [
        //                     [grades[0], radii[0]],
        //                     [grades[1], radii[1]],
        //                     [grades[2], radii[2]]
        //                 ]
        //             },
        //             'circle-color': {
        //                 'property': 'laasianhalf',
        //                 'stops': [
        //                     [grades[0], colors[0]],
        //                     [grades[1], colors[1]],
        //                     [grades[2], colors[2]]
        //                 ]
        //             },
        //             'circle-stroke-color': 'white',
        //             'circle-stroke-width': 1,
        //             'circle-opacity': 0.6



                    
        //         }
        //     });

        // });

        // const grades = [50000, 75000, 100000],
        //     colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
        //     radii = [4, 8, 12];

        // map.on('click', 'median_income', (event) => {
        //     new mapboxgl.Popup()
        //         .setLngLat(event.features[0].geometry.coordinates)
        //         .setHTML(`<strong>Median Family Income ($):</strong> ${event.features[0].properties.laasianhalf}`)
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

        // /*const source =
        //     '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">NYTimes</a></p>'; */

        // // combine all the html codes.
        // legend.innerHTML = labels.join('') + source;
  