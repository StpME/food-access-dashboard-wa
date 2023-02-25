mapboxgl.accessToken =
    'pk.eyJ1IjoibWl0Y2hlbGxzIiwiYSI6ImNsZWRlaDcwMTAzNDgzcnBjbnFwd24yNzEifQ.ObmlR1g0krQvk3b0S0V3qQ';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 6.7, // starting zoom - washington state level
    center: [-120.7, 47.5] // starting center - washington state
});
// Full Screen toggle
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
// Zoom/nav control
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
// Load Map
map.on('load', () => {

    // Add Source
    
    /*map.addSource('WA-base', {
        'type': 'raster',
        'tiles': [
            'assets/wa-basemap/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
    });

    // Add Layer

    map.addLayer({
        'id': 'WA basemap',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'king-base'
    }); */
});




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
