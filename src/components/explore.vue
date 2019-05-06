<template>
  <div id='explore'>
    <section class="map-section" style="width: 30vw; transform: translateX(0px);">
      <header>
          <h2>Europe debt display</h2>
          <div class="useful-links">
              <p class="centerMap">Center map <img src="# " alt="Center Europe"></p>
              <p class="showDebtOverview">Europe debt overview <img src="#" alt="Total Europe overview"></p>
          </div>
      </header>
      <div class="map-state-information">
          <section class="country-display" style="">
              <h3>Filter:</h3> <select id="mapDataFilter">
                  <option selected="selected" value="totalDebt">Total debt</option>
                  <option value="totalPopulation">Total population</option>
                  <option value="totalDebtPerCitizen">Total debt per citizen</option>
              </select>
          </section>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
/* var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); */


export default {
  name: 'explore',
  data () {
    return {
      locations:  [],
      vMap: ''
    }
  },
  created(){
    
    /* var url = 'https://wanderdrone.appspot.com/';
    map.on('load', function () {
      window.setInterval(function() {
        map.getSource('drone').setData(url);
      }, 2000);
      
      map.addSource('drone', { type: 'geojson', data: url });
      map.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "drone",
        "layout": {
        "icon-image": "rocket-15"
        }
      });
    }); */

  },
  mounted(){
    let locationsAux = {
      "type": "FeatureCollection",
      "features": [
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.38930378,24.49878207]},"properties":{"loc_id":44,"loc_name":"Espíritu Santo - North spot","status":"beach","rating":8,"picture":"https://lh5.ggpht.com/p/AF1QipPpKbEYUmVNSaCXBVwlVyYEon_M8KLNpqUNwEmI=w1304"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.39170184,24.56545271]},"properties":{"loc_id":45,"loc_name":"Campsite Fun Baja","status":"beach","rating":9,"picture":"https://lh5.ggpht.com/p/AF1QipN-IwWaJ5raPjGUYajEI7VIdQnSwzV8o2Kjpc46=w1304"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.396266,24.580713]},"properties":{"loc_id":46,"loc_name":"Playa El Embudo","status":"beach","rating":7,"picture":"https://lh5.ggpht.com/p/AF1QipM-kEdabKjXjPV6cmjy8rkCifLW50UgDLbAWt6K=w1366"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.29286882,24.31257349]},"properties":{"loc_id":47,"loc_name":"Playa Balandra","status":"beach","rating":7,"picture":"https://lh5.ggpht.com/p/AF1QipND92QJwRa8TTU--rka97MvXkavK0b_CcFnm91N=w1304"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-109.794982,23.498625]},"properties":{"loc_id":48,"loc_name":"Cañón de la Zorra","status":"waterfall","rating":9,"picture":"https://lh5.ggpht.com/p/AF1QipM1dxJn5h-4NsvH7IuzyWBegIeVgfuP6h2Wdv7p=w1366"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-109.974305,23.548591]},"properties":{"loc_id":49,"loc_name":"Valle Sierra de la Laguna","status":"valley","rating":10,"picture":"https://lh5.ggpht.com/p/AF1QipNOzhCgA0YslRWI9myGZbdjaIVxan0vrYn1Egxz=w1366"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-71.2577,42.40047]},"properties":{"loc_id":50,"loc_name":"Waltham, MA","status":"closed","rating":1,"picture":"none"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-71.46259,42.99019]},"properties":{"loc_id":51,"loc_name":"Manchester, NH","status":"closed","rating":1,"picture":"none"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-96.75724,32.90977]},"properties":{"loc_id":52,"loc_name":"TI Blvd, TX","status":"closed","rating":1,"picture":"none"}}
      ]
    }

    /* axios.get('/locations')
    .then(result => {
      this.locations = result.data; */
     this.locations = locationsAux;
     /*  debugger;
      let x = this.locations.features[0].geometry.coordinates[0];
      console.log(' X: ' + x);
      let y = this.locations.features[0].geometry.coordinates[1];
      console.log(' Y: ' + y);
      let coordinates = this.locations.features[0].geometry.coordinates;
      console.log('Coordinates: ' + coordinates); */

      let coordinates = this.locations.features[0].geometry.coordinates;
      console.log('Coordinates: ' + coordinates);
      
    mapboxgl.accessToken = 'pk.eyJ1IjoibXJjaXNjb3NlcmthIiwiYSI6ImNqdjdtb3k5ZTAxZGo0ZHFubTFqdzc4bHoifQ.NTXtmesugzahUhMA4We-iw';
    var map = new mapboxgl.Map({
      container: 'explore',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-110.127475, 23.895643],
      zoom: 8
    });
    /* this.vMap = map; */
    let campLayer = {
      "id": "symbols",
      "type": "symbol",
      "source": {
          "type": "geojson",
          "data": {
              /* "type": "FeatureCollection",
              "features": [] */
          }
      },
      "layout": {
        "icon-image": "star-15"
      }
    };
    campLayer.source.data = locationsAux;
    debugger;
    
    map.on('load', function() {
      debugger;

      map.addLayer(campLayer);

      map.on('click', 'symbols', function (e) {
        map.flyTo(
          {
            center: e.features[0].geometry.coordinates,
            zoom: 11
          });
      });

      map.on('mouseenter', 'symbols', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'symbols', function () {
        map.getCanvas().style.cursor = '';
      });
    });

        

      /* this.locations.features.forEach(mark => {
        coordinates = mark.geometry.coordinates;

        const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
      }); */
      
   /*  }).catch(e => {
      console.log('Error in: ');
      console.log(e);
    }); */


  },
  methods: {
    status: function status(e){
      debugger;
      
    }
  },
  
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

  body { 
    margin:0; 
    padding:0; 
  }

  #explore { 
    position:absolute; 
    top:0; 
    bottom:0; 
    width:100%; 
  }

  .map-section {
    height: 100vh;
    width: 30vw;
    background-color: rgba(5,9,36,.9);
    position: absolute;
    right: 0;
    transform: translateX(30vw);
    will-change: transform;
    transition: 1.25s ease-in-out;
    z-index: 2;
    overflow-y: scroll;
}

</style>
