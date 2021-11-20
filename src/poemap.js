
var zoom = 20;
var position = [51.505, -0.09];
var pointer = null;


// var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});



var map = L.map('map').setView(position, zoom); 


// var mymap = L.tileLayer('https://tile.jawg.io/57edef43-19ba-4c3b-837c-37038a3659ac/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
// 	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	minZoom: 0,
// 	maxZoom: 22,
// 	subdomains: 'abcd',
// 	accessToken: 'm9lpIChVnMzST5AL590p4exXv8yC5yKpFdUJJNfCkAIgEjMpsLS5JERPP0LzZXQo'
// }).addTo(map);

var mymap =  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

// var mymap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	minZoom: 10,
// 	maxZoom: 20,
// 	ext: 'png'
// }).addTo(map);


// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();



function setup(data){

    xSize = 0.00015
    ySize = 0.0002
    position = [data.coords.latitude,data.coords.longitude]

    map.panTo(new L.LatLng(position[0],position[1]));

    // L.marker(position).addTo(map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup();

    // new L.Marker(position, {
    //     icon: new L.DivIcon({
    //         className: 'my-div-icon',
    //         html: '<div class="poem">📜</div>'
    //     })
    // }).addTo(map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup();

    bound1 = [position[0] - xSize/2 ,position[1] - ySize/2]
    bound2 = [position[0] + xSize/2 ,position[1] + ySize/2]
    L.rectangle([bound2,bound1], {color: "#FFFFFF", weight: 1}).addTo(map);

    pointer = L.circleMarker(position,{color: "#AAAAFF", radius: 20}).addTo(map);

    console.log(position)
}

function updateposition(data){
    position = [data.coords.latitude,data.coords.longitude]
    map.panTo(new L.LatLng(position[0],position[1]));
    pointer.setLatLng(position)
}

function reposition(){
    navigator.geolocation.getCurrentPosition(updateposition)
}

navigator.geolocation.getCurrentPosition(setup)

var updatepos = setInterval(reposition, 1000)
