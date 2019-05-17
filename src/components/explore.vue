<template>
<div>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to leave?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click='centerMapOnMarker'>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          If you leave now your data for the new camp will be lost
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click='centerMapOnMarker' >Back</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal"  v-on:click="discardNewCamp" >Quit & Discard</button>
        </div>
      </div>
    </div>
  </div>
  
  <div id='explore'>
    <section class="map-section" style="width: 30vw; transform: translateX(0px);">
      <header>
          <h2>Places to Camp in The Baja!</h2>
          <div id='iconsDiv'>
            <div class="useful-links">
                <p class="centerMap" v-on:click='centerMap'>Center map <img src="../assets/center.svg" alt="Center map"></p>
            </div>
            <div v-show='!isAddingNewCamp' class="useful-links">
                <p class="newCamp" v-on:click='addNewCamp'> Add New Camp <img src="https://i.imgur.com/aAIk82g.png" alt="New Camp"></p>
            </div>
          </div>

      </header>
      <div class="map-state-information">
        <div v-show="loader" class="circle-loader">
          <div class="checkmark draw"></div>
        </div>

        <section v-show="!isSelected && !isAddingNewCamp" class="camps-display">
          <h4>Select a camp!  <img src="https://i.imgur.com/aAIk82g.png" alt="marker"> </h4>  
          <h5>... and see the camp details </h5>
        </section>

        <!-- New Camp Form -->
        <section class="newCampForm" v-if="isAddingNewCamp">
          <h3>New Camp Values</h3> 

          <form v-on:submit.prevent="saveNewCamp">
            <div class="newInputs">
              <button type="submit" class="detailsBtn btn btn-success"><i class="fas fa-cloud-upload-alt"></i></button>
              <input v-model='newCamp.name' class="dataDetails" type="text" id="name" name="name" minlength="3" maxlength="70" placeholder="Name" required>
              <input v-model='newCamp.status' class="dataDetails" type="text" id="status" name="status" minlength="4" maxlength="10" placeholder="Type" required>
              <input v-model='newCamp.picture' class="dataDetails" type="url" id="picture" name="picture" minlength="4" maxlength="400" placeholder="Picture URL" required>
              <select v-model="newCamp.rating" class="dataDetails selectRating" required>
                <option disabled value="">Rating</option>
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
                <option value=4>4</option>
                <option value=5>5</option>
              </select>
            </div>
          </form>
        </section>   

        <!-- Camp Details for Edition -->
        <section class="details-display" v-if="isSelected">
          <h3>Details</h3> 

          <div id='imgDiv'>
            <img id='campPicture' v-bind:src="camp.picture" alt="Camp Picture">
          </div>
            
          <button v-show="btnEdit" class='detailsBtn btn btn-info' v-on:click="changeEdit"><i class="far fa-edit"></i>Edit</button>
          <input type="submit" value="Save Changes" v-show="!btnEdit" class="detailsBtn btn btn-success" v-on:click="saveEdit">
          <input v-model='camp.name' v-on:change='changeName(camp.name)' disabled class="dataDetails" type="text" id="name" name="name" required
            minlength="3" maxlength="70">
          <input v-model='camp.status' v-on:change='changeStatus(camp.status)' disabled class="dataDetails" type="text" id="status" name="status" required
            minlength="4" maxlength="10">        

          <!-- Dynamic Stars Rating -->
          <div id='starsDiv' style="background-color: rgba(113, 226, 241, 0.596); width: 10vw;">
            <br>
            <p v-html="stars"> 
            </p>
            <p>{{camp.rating}} / 5</p>
          </div>
        </section>   

        <!-- Utility button to stop doing request to DB -->
        <button v-show='locations && !isAddingNewCamp' class="btn btn-dark" v-on:click='stopInterval' > Stop getting data</button>
      </div>
    </section>
  </div>
  <pre id="newCampCoordinates"></pre>
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
        locations: '',
      },
      /* Update Properties */
      updateProp:{
        rating: 6,
        name: '',
        status: '',
      },
      campObjectSelected: '',
      locations:  [],
      vMap: null,
      stars: '',
      starSpan: '',
      timer: '',
      newMarker: '',
      btnEdit: false,
      loader: false,
      isSelected: false,
      isAddingNewCamp: false,
      
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
            self.campObjectSelected = Object.assign({}, e);;

            /* Check if addNewCamp is open so display modal - else displayCampDetails */
            if(self.isAddingNewCamp){
              $('#exampleModal').modal('show');
            } else {
              self.displayCampDetails();
            }
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
    displayCampDetails: function(){
      this.setLoader(-1);
      /* Set camp details */
      if(this.isSelected) this.resetInputs();
      this.resetSelfValues();
      this.isSelected = true;
      /* Fly to this camp */
      this.vMap.flyTo({center: this.campObjectSelected.features[0].geometry.coordinates, zoom: 11 });
      this.camp.loc_id = this.campObjectSelected.features[0].properties.loc_id;
      this.camp.name = this.campObjectSelected.features[0].properties.loc_name;
      this.camp.status = this.campObjectSelected.features[0].properties.status;
      this.camp.rating = this.campObjectSelected.features[0].properties.rating;
      this.camp.picture = this.campObjectSelected.features[0].properties.picture;
      this.drawRating();
    },
    
    resetSelfValues: function(){
      this.isSelected = false;
      this.isAddingNewCamp = false;
      this.updateProp = {rating: 6, name: '', status: '',};
      this.btnEdit = true;
    },

    stopInterval: function(){
      clearInterval(this.timer);
    },

    centerMap: function () {
      this.setLoader(-1);
      this.vMap ?  this.vMap.flyTo({
                    center: [-110.127475, 23.895643],
                    zoom: 8 })
                : ''
    },
    centerMapOnMarker: function () {
      this.vMap ?  this.vMap.flyTo({
                    center: this.newCamp.locations,
                    zoom: 11 })
                : ''
    },

    addNewCamp: function () {
      this.setLoader(-1);
      this.resetSelfValues();
      const vueObject = this;
      vueObject.newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(vueObject.vMap.getCenter())
        .addTo(vueObject.vMap);
      vueObject.newCamp.locations = vueObject.newMarker.getLngLat();

      function onDragEnd() {
        vueObject.newCamp.locations = vueObject.newMarker.getLngLat();
        newCampCoordinates.style.display = 'block';
        newCampCoordinates.innerHTML = 'Longitude: ' + vueObject.newCamp.locations.lng + '<br />Latitude: ' + vueObject.newCamp.locations.lat;
      }

      vueObject.newMarker.on('dragend', onDragEnd);
      vueObject.isAddingNewCamp = true;

    },

    discardNewCamp: function (){
      this.resetSelfValues();
      this.newMarker.remove();
      this.displayCampDetails();
    },

    saveNewCamp: function () {
      const vueObject = this;
  
      vueObject.newCamp.locations = `POINT(${this.newCamp.locations.lng} ${this.newCamp.locations.lat})`;
      axios.post('/locations/insert', this.newCamp)
      .then(function (result) {
        vueObject.setLoader(0);
        vueObject.newMarker.remove();
        vueObject.setLoader(1);
        vueObject.resetSelfValues();
        vueObject.resetNewCampInputs();
        window.setTimeout(function (){vueObject.setLoader(-1);},2500);
      }).catch(e => {
        console.log('Error in post: ');
        console.log(e);
      });

    },
    setLoader: function(status){
      switch(status){
        case -1:
          document.getElementsByClassName("checkmark")[0].style.display = "none";
          document.getElementsByClassName("circle-loader")[0].classList.remove("load-complete");
          this.loader = false;
        break;
        case 0:
          this.loader = true; 
          document.getElementsByClassName("checkmark")[0].style.display = "none";
        break;
        case 1:
          document.getElementsByClassName("circle-loader")[0].classList.add("load-complete");
          document.getElementsByClassName("checkmark")[0].style.display = "block";
        break;
      }

    },

    drawRating: function () {
      this.stars = '';
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
          for(i = 0; i<=newRating; i++){
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
      this.setLoader(0);
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
        self.setLoader(1);
        self.drawRating();
        window.setTimeout(function (){self.setLoader(-1);}, 2500);
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
      this.updateProp = {rating: 6, name: '', status: '',};
    },

    resetNewCampInputs: function(){
      this.newCamp.name = '';
      this.newCamp.status = '';
      this.newCamp.picture = '';
      this.newCamp.rating = '';
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
    margin-top: 5em;
    text-align: center;
    font-size: x-large;
  }
  h5{
    margin: 1em 0;
    text-align: center;
    margin-bottom: 4em;
  }

  select option {
    background: rgb(11, 20, 35);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

  #explore { 
    position:absolute; 
    top:0; 
    bottom:0; 
    width:100%; 
  }

  #iconsDiv{
    display: flex;
  }

  #starsDiv{
    text-align: center;
    border-radius: 42px;
    margin: auto;
  }

  #imgDiv{
    text-align: center;
    margin: 1.5em -1.3em;
  }

  #campPicture{
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 3%;
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

  #newCampCoordinates {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    position: absolute;
    bottom: 40px;
    left: 10px;
    padding: 5px 10px;
    margin: 0;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    display: none;
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
      width: 3.5em;
      height: 3.5em;
      fill: #fff;
  }

 .centerMap img  {
    height: 35px;
    transition: .3s ease-in-out;
    font-size: large;
  } 

  .centerMap, .newCamp,  a, button, select {
      cursor: pointer;
  }

  .map-state-information {
      padding: 2em;
      color: #fff;
      margin-top: 12em; 
  }

  .mapDataFilter{
    
    width: 70%;
    height: 3em;
    background-color: transparent;
    color: #57ceda;
    border: 1px solid #fff;
    margin: 1.5em 0;
  }

.newInputs{
  padding-top: 1em;
  font-size: large;
}

.newCampForm{
  padding-top: 3em;
  font-size: large;
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
  margin-top: 5em;
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

.selectRating{
  width: 5em;
  
}

.circle-loader {
  float: left;
  margin: 0.3em 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left-color: #5cb85c;
  animation: loader-spin 1.2s infinite linear;
  position: relative;
  vertical-align: top;
  border-radius: 50%;
  width: 3em;
  height: 3em;
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
  height: 1.8em;
  width: 1em;
  transform-origin: left top;
  border-right: 3px solid #5cb85c;
  border-top: 3px solid #5cb85c;
  content: '';
  left: 0.45em;
  top: 1.3em;
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
    width: 1em;
    opacity: 1;
  }
  40% {
    height: 1em;
    width: 1em;
    opacity: 1;
  }
  100% {
    height: 1.8em;
    width: 1em;
    opacity: 1;
  }
}

</style>
