<template>
  <div id='explore'>
    <section class="map-section" style="width: 30vw; transform: translateX(0px);">
      <header>
          <h2>Places to Camp in The Baja!</h2>
          <div class="useful-links">
              <p class="centerMap" v-on:click='centerMap'>Center map <img src="../assets/center.svg" alt="Center Europe"></p>
          </div>
      </header>
      <div class="map-state-information">
          <section class="camps-display">
              <!-- <h3>Filter:</h3> 
              
              <br>
              <input type="radio" id="Valley" name="campType" value="valley">
              <label for="Valley">Valley</label>
              <input type="radio" id="All" name="campType" value="all">
              <label for="All">All Again</label>
              <select class="mapDataFilter">
                  <option selected="selected" value="total">Status</option>
                  <option value="rating">Rating > 8 </option>
              </select>

              <br>
              <input v-if="filter.status" type="radio" id="Beaches" name="campType" value="beach">
              <label for="Beaches">Beaches</label>
              <input type="radio" id="Waterfall" name="campType" value="waterfall">
              <label for="Waterfall">Waterfall</label> -->
              <h4 v-show='!isSelected'>Select a camp!  <img src="https://i.imgur.com/aAIk82g.png" alt="marker"> </h4>  
              <!-- <i class="fa fa-star"></i> -->
              <!-- https://i.imgur.com/E8TdgXD.png -->

          </section>
          <section class="details-display" v-if="isSelected">
              <h3>Details:</h3> 
              <button v-show="btnEdit" class='detailsBtn btn btn-info' v-on:click="changeEdit"><i class="far fa-edit"></i>Edit</button>
              <input type="submit" value="Save Changes" v-show="!btnEdit" class="detailsBtn btn btn-success" v-on:click="saveEdit">
              <input v-model='camp.name' v-on:change='changeName(camp.name)' disabled class="dataDetails" type="text" id="name" name="name" required
                minlength="3" maxlength="70">
              <input v-model='camp.status' v-on:change='changeStatus(camp.status)' disabled class="dataDetails" type="text" id="status" name="status" required
                minlength="4" maxlength="10">        
              <!-- <input v-model='camp.rating' disabled class="dataDetails" type="text" id="rating" name="rating" required
              minlength="4" maxlength="8" size="10">     -->    
              <div id='starsDiv' style="background-color: rgba(113, 226, 241, 0.596); width: 10vw;">
                <br>
                <p v-html="stars"> 
                </p>
                <p>{{camp.rating}} / 5</p>
              </div>
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
      camp:{
        loc_id: '',
        name: '',
        status: '',
        rating: '',
        picture: '',
      },
      newCamp:{
        id: '',
        name: '',
        status: '',
        rating: '',
        picture: '',
      },
      updateProp:{
        rating: 6,
        name: '',
        status: '',
      },
      locations:  [],
      vMap: null,
      isSelected: false,
      stars: '',
      starSpan: '',
      btnEdit: false,
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

    /* let locationsAux = {
      "type": "FeatureCollection",
      "features": [
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.38930378,24.49878207]},"properties":{"loc_id":44,"loc_name":"Espíritu Santo - North spot","status":"beach","rating":4,"picture":"https://lh5.ggpht.com/p/AF1QipPpKbEYUmVNSaCXBVwlVyYEon_M8KLNpqUNwEmI=w1304"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.39170184,24.56545271]},"properties":{"loc_id":45,"loc_name":"Campsite Fun Baja","status":"beach","rating":3,"picture":"https://lh5.ggpht.com/p/AF1QipN-IwWaJ5raPjGUYajEI7VIdQnSwzV8o2Kjpc46=w1304"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.396266,24.580713]},"properties":{"loc_id":46,"loc_name":"Playa El Embudo","status":"beach","rating":4,"picture":"https://lh5.ggpht.com/p/AF1QipM-kEdabKjXjPV6cmjy8rkCifLW50UgDLbAWt6K=w1366"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-110.29286882,24.31257349]},"properties":{"loc_id":47,"loc_name":"Playa Balandra","status":"beach","rating":4,"picture":"https://lh5.ggpht.com/p/AF1QipND92QJwRa8TTU--rka97MvXkavK0b_CcFnm91N=w1304"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-109.794982,23.498625]},"properties":{"loc_id":48,"loc_name":"Cañón de la Zorra","status":"waterfall","rating":4,"picture":"https://lh5.ggpht.com/p/AF1QipM1dxJn5h-4NsvH7IuzyWBegIeVgfuP6h2Wdv7p=w1366"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-109.974305,23.548591]},"properties":{"loc_id":49,"loc_name":"Valle Sierra de la Laguna","status":"valley","rating":5,"picture":"https://lh5.ggpht.com/p/AF1QipNOzhCgA0YslRWI9myGZbdjaIVxan0vrYn1Egxz=w1366"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-71.2577,42.40047]},"properties":{"loc_id":50,"loc_name":"Waltham, MA","status":"closed","rating":1,"picture":"none"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-71.46259,42.99019]},"properties":{"loc_id":51,"loc_name":"Manchester, NH","status":"closed","rating":1,"picture":"none"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-96.75724,32.90977]},"properties":{"loc_id":52,"loc_name":"TI Blvd, TX","status":"closed","rating":3,"picture":"none"}}
      ]
    } */
    /* this.locations = locationsAux; */
    axios.get('/locations')
    .then(result => {
      //Beware with arrow functions and THIS
      this.locations = result.data; 

      /* let x = this.locations.features[0].geometry.coordinates[0];
      console.log(' X: ' + x);
      let y = this.locations.features[0].geometry.coordinates[1];
      console.log(' Y: ' + y);
      let coordinates = this.locations.features[0].geometry.coordinates;
      console.log('Coordinates: ' + coordinates); */

      let coordinates = this.locations.features[0].geometry.coordinates;
      console.log('Coordinates: ' + coordinates);
      
      mapboxgl.accessToken = 'pk.eyJ1IjoibXJjaXNjb3NlcmthIiwiYSI6ImNqdjdtb3k5ZTAxZGo0ZHFubTFqdzc4bHoifQ.NTXtmesugzahUhMA4We-iw';
      let map = new mapboxgl.Map({
        container: 'explore',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-110.127475, 23.895643],
        zoom: 8
      });
      this.vMap = map;
      let self = this;

      let campLayer = { //with source
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
          "icon-image": "cat",
          "icon-size": 1.2
        }
      };

      let campLayer_noSource = { // without source
        "id": "symbols",
        "type": "symbol",
        "source": 'camps',
        "layout": {
          "icon-image": "marker",
          "icon-size": 1.2
        }
      };
      campLayer.source.data = this.locations;
      
      /* 
      http://localhost:8080/assets/robonomics.png 
      https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png
      */

      map.on('load', () => {
        map.loadImage('https://i.imgur.com/aAIk82g.png', function(error, image) {
          if (error) throw error;
          map.addImage('marker', image);
          map.addSource('camps', { type: 'geojson', data: self.locations });
          map.addLayer(campLayer_noSource);

        map.on('click', 'symbols', function (e) {
          if(self.isSelected) self.resetInputs();
          self.newCamp = null;
          self.updateProp = {rating: 6, name: '', status: '',};
          self.btnEdit = true;
          self.isSelected = true;
          self.stars = '';
          map.flyTo(
            {
              center: e.features[0].geometry.coordinates,
              zoom: 11
            });
          self.camp.loc_id = e.features[0].properties.loc_id;
          self.camp.name = e.features[0].properties.loc_name;
          self.camp.status = e.features[0].properties.status;
          self.camp.rating = e.features[0].properties.rating;
          self.camp.picture = e.features[0].properties.picture;
          self.drawRating();
        });

        //Reload map's data every 4s
        let timer = window.setInterval(function() {
            map.getSource('camps').setData(self.locations);
            /* window.clearInterval(timer); */
        }, 4000);

        map.on('mouseenter', 'symbols', function () {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'symbols', function () {
          map.getCanvas().style.cursor = '';
        });
        /*"properties": {
          "description": "<strong>Make it Mount Pleasant</strong> <p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
          "icon": "theatre"
          }, */
        });
      });


      /* this.locations.features.forEach(mark => {
        coordinates = mark.geometry.coordinates;

        const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
      }); */
      
    }).catch(e => {
      console.log('Error in: ');
      console.log(e);
    });


  },
  methods: {
    status: function status(e){
      
    },
    centerMap: function () {
    this.vMap
      ?  this.vMap.flyTo({
          center: [-110.127475, 23.895643],
          zoom: 8
        })
      : ''
    },
    drawRating: function () {
      let howMany = this.camp.rating;
      for(var i=1; i<=howMany; i++){
        this.stars += ` <span id=star_${i} class="fa fa-star"></span> `;
      }
      for(howMany; howMany<5; howMany++){
        this.stars += ` <span id=star_${parseInt(howMany+1)} class="far fa-star"></span> `;
      }
    },
    changeEdit: function (){
      this.btnEdit = false;
      const inputs = document.querySelectorAll("input[type=text]");
      inputs.forEach(input => {
          input.disabled = false;
      });
      document.getElementById('starsDiv').removeAttribute("style");
      this.starSpan = document.getElementsByTagName('span');

      let spans = this.starSpan;
      let aux = this.updateProp;
      
      for (let item of this.starSpan) {
        item.style.cssText = "cursor: pointer;";
        item.addEventListener("click", function(e){        
          const id_raiting = e.target.id;
          const newRating = parseInt(id_raiting.slice(id_raiting.length-1));
          aux.rating = newRating;
          let i;
          //To-do: change star class to empty or full when edition complete (maybe drawRating)
          for(i = 0; i<newRating; i++){
            spans[i].style.cssText = "cursor: pointer; color: red";
          }
          if(newRating<5)
            for(i; i<5; i++){
              spans[i].style.cssText = "cursor: pointer;";
            }
        }); 
      }
    },
    changeName: function(property){
      this.updateProp.name = property;
    },
    changeStatus: function(property){
      this.updateProp.status = property;
    },
    saveEdit: function (){
      let localCamp = this.locations.features.find(x => x.properties.loc_id == this.camp.loc_id);

      if(this.updateProp.name){
        this.camp.name = this.updateProp.name.slice(0);
        localCamp.properties.loc_name = this.updateProp.name.slice(0);  
      } 
      if(this.updateProp.status){
        this.camp.status = this.updateProp.status.slice(0);
        localCamp.properties.status = this.updateProp.status.slice(0);
      }
      if(this.updateProp.rating < 6){
        this.camp.rating = this.updateProp.rating;
        localCamp.properties.rating = this.updateProp.rating;
      }
      axios.post('/locations/update', this.camp)
      .then(result => {
        axios.get('/locations')
        .then(result => {
          //Beware with arrow functions and THIS
          this.locations = result.data; 
          //Some flash message
        }).catch(e => {
        console.log('Error get: ');
        console.log(e);
      });
      }).catch(e => {
        console.log('Error in post: ');
        console.log(e);
      });

      this.resetInputs();
    },
    resetInputs: function(){
      this.btnEdit = true;
      const inputs = document.querySelectorAll("input[type=text]");
      inputs.forEach(input => {
        input.disabled = true;
      });
     document.getElementById('starsDiv').style.cssText="background-color: rgba(113, 226, 241, 0.596); width: 10vw;"
     for (let item of this.starSpan) {
        item.removeAttribute("style");
      }
      this.newCamp = null;
      this.updateProp = {rating: 6, name: '', status: '',};
    }
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';


  body { 
    margin:0; 
    padding:0; 
  }
  header {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #00031e;
    padding-bottom: 1em;
    position: fixed;
    width: 100%;
  }

  header h2 {
    font-size: 2.5em;
    text-align: center;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  
  h3{
        margin: 0.8em 0;
        text-align: center;
  }

  h4{
    margin: 3.2em 0;
    text-align: center;
    font-size: x-large;
  }

  #explore { 
    position:absolute; 
    top:0; 
    bottom:0; 
    width:100%; 
  }
  #starsDiv{
    text-align: center;
    border-radius: 42px;
    margin: auto;
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

  .useful-links {
      display: flex;
  }

  .gesture-information-icons p, .useful-links p {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      margin: .75em 1.25em;
  }

  .useful-links p img {
      width: 2em;
      height: 2em;
      fill: #fff;
  }

 .centerMap img,  {
    height: 35px;
    transition: .3s ease-in-out;
    font-size: large;
}

.centerMap, a, button, select {
    cursor: pointer;
}



.map-state-information {
    padding: 2em;
    color: #fff;
}

.mapDataFilter{
    
    width: 70%;
    height: 3em;
    background-color: transparent;
    color: #57ceda;
    border: 1px solid #fff;
    margin: 1.5em 0;
}

.camps-display{
  padding-top: 7em;
  font-size: large;
}

.dataDetails{
  border-radius: 42px;
  text-transform: capitalize;
  width: 70%;
  height: 1.5em;
  background-color: transparent;
  color: #a5efdc;
  margin: 0.3em 0;
  text-align: center;

}

.details-display{
  font-size: large;
}

.dataDetails:disabled{
  background-color: rgba(113, 226, 241, 0.596) ;
  border: none;
}

.detailsBtn{
  /* color: #0f56d882; */
  border-radius: 0.5em;
  align-items: center;
  margin: .75em 1.25em;
  float: right;
  display: inline-grid;
}
</style>
