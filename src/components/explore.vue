<template>
  <div id='explore'>
  </div>
</template>

<script>
  
export default {
  name: 'explore',
  data () {
    return {
      //
    }
  },
  mounted(){
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibXJjaXNjb3NlcmthIiwiYSI6ImNqdjdtb3k5ZTAxZGo0ZHFubTFqdzc4bHoifQ.NTXtmesugzahUhMA4We-iw';
    var map = new mapboxgl.Map({
    container: 'explore',
    style: 'mapbox://styles/mapbox/streets-v11'
    });

    var url = 'https://wanderdrone.appspot.com/';
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
    });
  }
}

  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body { margin:0; padding:0; }

#explore { position:absolute; top:0; bottom:0; width:100%; }

</style>
