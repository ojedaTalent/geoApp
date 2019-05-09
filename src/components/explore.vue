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

        <!-- Filters -->
        <section class="camps-display">
            <!-- <h3>Filter:</h3> 
            <br>
            <select class="mapDataFilter">
              <option selected="selected" value="total">Status</option>
              <option value="rating">Rating > 8 </option>
            </select>

            <input type="radio" id="Valley" name="campType" value="valley">
            <label for="Valley">Valley</label>
            <input type="radio" id="All" name="campType" value="all">
            <label for="All">All Again</label>

            <br>
            <input v-if="filter.status" type="radio" id="Beaches" name="campType" value="beach">
            <label for="Beaches">Beaches</label>
            <input type="radio" id="Waterfall" name="campType" value="waterfall">
            <label for="Waterfall">Waterfall</label> -->

            <h4 v-show='!isSelected'>Select a camp!  <img src="https://i.imgur.com/aAIk82g.png" alt="marker"> </h4>  
        </section>

        <!-- Camp Details -->
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

          <!-- Dynamic Stars Rating -->
          <div id='starsDiv' style="background-color: rgba(113, 226, 241, 0.596); width: 10vw;">
            <br>
            <p v-html="stars"> 
            </p>
            <p>{{camp.rating}} / 5</p>
          </div>
        </section>   

        <!-- Utility button to stop doing request to DB -->
        <button class="btn btn-dark" v-on:click='stopInterval'> Stop getting data</button>

        <!-- <button class="btn btn-light" v-on:click='resumeInterval'> Resume getting data</button> -->
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
      /* Details for selected camp */
      camp:{
        loc_id: '',
        name: '',
        status: '',
        rating: '',
        picture: '',
      },
      /* For dragable Marker */
      newCamp:{
        id: '',
        name: '',
        status: '',
        rating: '',
        picture: '',
      },
      /* Update Properties */
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
      timer: '',
      loader: false,
    }
  },
  created(){
      //
  },
  mounted(){

    /* Get data from DB */
    axios.get('/locations')
    .then(result => {
      
      /* Store camp's data in reactive variable */
      this.locations = result.data; 

      /* Init mapbox GL JS */
      mapboxgl.accessToken = 'pk.eyJ1IjoibXJjaXNjb3NlcmthIiwiYSI6ImNqdjdtb3k5ZTAxZGo0ZHFubTFqdzc4bHoifQ.NTXtmesugzahUhMA4We-iw';
      let map = new mapboxgl.Map({
        container: 'explore',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-110.127475, 23.895643],
        zoom: 8
      });
      
      /* vMap is used to flyTo */
      this.vMap = map;

      /* Using self to avoid use this*/
      let self = this;

      /* This is not used */
      let campLayer = {  //with source
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
      /* This is not used (fill geojson with data) */
      campLayer.source.data = this.locations;

      /* This is used */
      let campLayer_noSource = { // without source
        "id": "symbols",
        "type": "symbol",
        "source": 'camps',
        "layout": {
          "icon-image": "marker",
          "icon-size": 1.2
        }
      };

      /* Init MapBox */
      map.on('load', () => {

        /* Config Marker */
        map.loadImage('https://i.imgur.com/aAIk82g.png', function(error, image) {
          if (error) throw error;
          map.addImage('marker', image);

          /* Add source and layer to map */
          map.addSource('camps', { type: 'geojson', data: self.locations });
          map.addLayer(campLayer_noSource);

          map.on('click', 'symbols', function (e) {

            /* Set camp details */
            if(self.isSelected) self.resetInputs();
            self.newCamp = null;
            self.updateProp = {rating: 6, name: '', status: '',};
            self.btnEdit = true;
            self.isSelected = true;
            self.stars = '';

            /* Fly to this camp */
            map.flyTo({center: e.features[0].geometry.coordinates, zoom: 11 });
            self.camp.loc_id = e.features[0].properties.loc_id;
            self.camp.name = e.features[0].properties.loc_name;
            self.camp.status = e.features[0].properties.status;
            self.camp.rating = e.features[0].properties.rating;
            self.camp.picture = e.features[0].properties.picture;
            self.drawRating();
          });

          //Reload map's data every 4s
          self.timer = window.setInterval(function() {

            //Get data from database
            axios.get('/locations')
            .then(result => {

              //Refresh map's data
              self.locations = result.data; 
              map.getSource('camps').setData(self.locations);

              //Update dataDetails in Frontend when Camp is Selected and it's not in edition
              if(self.isSelected && self.btnEdit){
                let localCamp = self.locations.features.find(x => x.properties.loc_id == self.camp.loc_id);
                self.camp.name = localCamp.properties.loc_name;
                self.camp.status = localCamp.properties.status;
                self.camp.rating = localCamp.properties.rating;
                self.stars = '';
                self.drawRating();
              }
            }).catch(e => {
              console.log('Error get: ');
              console.log(e);
            });
          }, 4000);

          /* EventListener mouse on marker */
          map.on('mouseenter', 'symbols', function () {
            map.getCanvas().style.cursor = 'pointer';
          });

          /* EventListener mouse leave */
          map.on('mouseleave', 'symbols', function () {
            map.getCanvas().style.cursor = '';
          });
        });
      });  
    }).catch(e => {
      console.log('Error in: ');
      console.log(e);
    });


  },
  methods: {
    resumeInterval: function(){
      //
    },
    
    stopInterval: function(){
      clearInterval(this.timer);
    },

    centerMap: function () {
      this.vMap ?  this.vMap.flyTo({
                    center: [-110.127475, 23.895643],
                    zoom: 8 })
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
      let self = this;
      let localCamp = this.locations.features.find(x => x.properties.loc_id == this.camp.loc_id);
      if(this.updateProp.name){

        /* Update the camp object that gona be send to update DB */
        this.camp.name = this.updateProp.name.slice(0);

        /* Update the camp inside the main geoJson  */
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
      .then(function () {
        //Some flash alert-text 
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
  margin-top: 3.5em;
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

.circle-loader {
  margin-bottom: 3.5em;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left-color: #5cb85c;
  animation: loader-spin 1.2s infinite linear;
  position: relative;
  vertical-align: top;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  float: right;
}

.load-complete {
  -webkit-animation: none;
  animation: none;
  border-color: #5cb85c;
  transition: border 500ms ease-out;
}

.checkmark {
  display: none;
}
.checkmark.draw:after {
  animation-duration: 800ms;
  animation-timing-function: ease;
  animation-name: checkmark;
  transform: scaleX(-1) rotate(135deg);
}
.checkmark:after {
  opacity: 1;
  height: 3.5em;
  width: 1.75em;
  transform-origin: left top;
  border-right: 3px solid #5cb85c;
  border-top: 3px solid #5cb85c;
  content: '';
  left: 1.75em;
  top: 3.5em;
  position: absolute;
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 1.75em;
    opacity: 1;
  }
  40% {
    height: 3.5em;
    width: 1.75em;
    opacity: 1;
  }
  100% {
    height: 3.5em;
    width: 1.75em;
    opacity: 1;
  }
}

</style>
