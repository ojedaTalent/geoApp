webpackJsonp([1],{"+ETa":function(t,e){},Bilg:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=a("VU/8")({name:"App"},i,!1,function(t){a("+ETa")},null,null).exports,r=a("/ocq"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{attrs:{id:"landing-header"}},[e("h1",[this._v("  Where to Camp-App!  ")]),this._v(" "),e("router-link",{staticClass:"btn btn-lg btn-success",attrs:{to:"explore"}},[this._v(" Exploring locations in the Baja! ")])],1),this._v(" "),this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"slideshow"},[e("li"),this._v(" "),e("li"),this._v(" "),e("li"),this._v(" "),e("li"),this._v(" "),e("li")])}]};var c=a("VU/8")({name:"landing-header",data:function(){return{}}},o,!1,function(t){a("TWGJ")},"data-v-816b76f6",null).exports,p=a("BO1k"),l=a.n(p),u=(a("mtWM"),a("1e2d")),d=a.n(u),m={name:"explore",data:function(){return{camp:{loc_id:"",name:"",status:"",rating:"",picture:""},newCamp:{id:"",name:"",status:"",rating:"",picture:""},updateProp:{rating:6,name:"",status:""},locations:[],vMap:null,isSelected:!1,stars:"",starSpan:"",btnEdit:!1}},created:function(){},mounted:function(){var t={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[-110.38930378,24.49878207]},properties:{loc_id:44,loc_name:"Espíritu Santo - North spot",status:"beach",rating:4,picture:"https://lh5.ggpht.com/p/AF1QipPpKbEYUmVNSaCXBVwlVyYEon_M8KLNpqUNwEmI=w1304"}},{type:"Feature",geometry:{type:"Point",coordinates:[-110.39170184,24.56545271]},properties:{loc_id:45,loc_name:"Campsite Fun Baja",status:"beach",rating:3,picture:"https://lh5.ggpht.com/p/AF1QipN-IwWaJ5raPjGUYajEI7VIdQnSwzV8o2Kjpc46=w1304"}},{type:"Feature",geometry:{type:"Point",coordinates:[-110.396266,24.580713]},properties:{loc_id:46,loc_name:"Playa El Embudo",status:"beach",rating:4,picture:"https://lh5.ggpht.com/p/AF1QipM-kEdabKjXjPV6cmjy8rkCifLW50UgDLbAWt6K=w1366"}},{type:"Feature",geometry:{type:"Point",coordinates:[-110.29286882,24.31257349]},properties:{loc_id:47,loc_name:"Playa Balandra",status:"beach",rating:4,picture:"https://lh5.ggpht.com/p/AF1QipND92QJwRa8TTU--rka97MvXkavK0b_CcFnm91N=w1304"}},{type:"Feature",geometry:{type:"Point",coordinates:[-109.794982,23.498625]},properties:{loc_id:48,loc_name:"Cañón de la Zorra",status:"waterfall",rating:4,picture:"https://lh5.ggpht.com/p/AF1QipM1dxJn5h-4NsvH7IuzyWBegIeVgfuP6h2Wdv7p=w1366"}},{type:"Feature",geometry:{type:"Point",coordinates:[-109.974305,23.548591]},properties:{loc_id:49,loc_name:"Valle Sierra de la Laguna",status:"valley",rating:5,picture:"https://lh5.ggpht.com/p/AF1QipNOzhCgA0YslRWI9myGZbdjaIVxan0vrYn1Egxz=w1366"}},{type:"Feature",geometry:{type:"Point",coordinates:[-71.2577,42.40047]},properties:{loc_id:50,loc_name:"Waltham, MA",status:"closed",rating:1,picture:"none"}},{type:"Feature",geometry:{type:"Point",coordinates:[-71.46259,42.99019]},properties:{loc_id:51,loc_name:"Manchester, NH",status:"closed",rating:1,picture:"none"}},{type:"Feature",geometry:{type:"Point",coordinates:[-96.75724,32.90977]},properties:{loc_id:52,loc_name:"TI Blvd, TX",status:"closed",rating:3,picture:"none"}}]};this.locations=t;var e=this.locations.features[0].geometry.coordinates;console.log("Coordinates: "+e),d.a.accessToken="pk.eyJ1IjoibXJjaXNjb3NlcmthIiwiYSI6ImNqdjdtb3k5ZTAxZGo0ZHFubTFqdzc4bHoifQ.NTXtmesugzahUhMA4We-iw";var a=new d.a.Map({container:"explore",style:"mapbox://styles/mapbox/satellite-v9",center:[-110.127475,23.895643],zoom:8});this.vMap=a;var s=this,i={id:"symbols",type:"symbol",source:"camps",layout:{"icon-image":"marker","icon-size":1.2}};a.on("load",function(){a.loadImage("https://i.imgur.com/aAIk82g.png",function(t,e){if(t)throw t;a.addImage("marker",e),a.addSource("camps",{type:"geojson",data:s.locations}),a.addLayer(i),a.on("click","symbols",function(t){s.isSelected&&s.resetInputs(),s.newCamp=null,s.updateProp={rating:6,name:"",status:""},s.btnEdit=!0,s.isSelected=!0,s.stars="",a.flyTo({center:t.features[0].geometry.coordinates,zoom:11}),s.camp.loc_id=t.features[0].properties.loc_id,s.camp.name=t.features[0].properties.loc_name,s.camp.status=t.features[0].properties.status,s.camp.rating=t.features[0].properties.rating,s.camp.picture=t.features[0].properties.picture,s.drawRating()});window.setInterval(function(){a.getSource("camps").setData(s.locations)},4e3);a.on("mouseenter","symbols",function(){a.getCanvas().style.cursor="pointer"}),a.on("mouseleave","symbols",function(){a.getCanvas().style.cursor=""})})})},methods:{status:function(t){},centerMap:function(){this.vMap&&this.vMap.flyTo({center:[-110.127475,23.895643],zoom:8})},drawRating:function(){for(var t=this.camp.rating,e=1;e<=t;e++)this.stars+=" <span id=star_"+e+' class="fa fa-star"></span> ';for(;t<5;t++)this.stars+=" <span id=star_"+parseInt(t+1)+' class="far fa-star"></span> '},changeEdit:function(){this.btnEdit=!1,document.querySelectorAll("input[type=text]").forEach(function(t){t.disabled=!1}),document.getElementById("starsDiv").removeAttribute("style"),this.starSpan=document.getElementsByTagName("span");var t=this.starSpan,e=this.updateProp,a=!0,s=!1,i=void 0;try{for(var n,r=l()(this.starSpan);!(a=(n=r.next()).done);a=!0){var o=n.value;o.style.cssText="cursor: pointer;",o.addEventListener("click",function(a){var s=a.target.id,i=parseInt(s.slice(s.length-1));e.rating=i;var n=void 0;for(n=0;n<i;n++)t[n].style.cssText="cursor: pointer; color: red";if(i<5)for(;n<5;n++)t[n].style.cssText="cursor: pointer;"})}}catch(t){s=!0,i=t}finally{try{!a&&r.return&&r.return()}finally{if(s)throw i}}},changeName:function(t){this.updateProp.name=t},changeStatus:function(t){this.updateProp.status=t},saveEdit:function(){var t=this,e=this.locations.features.find(function(e){return e.properties.loc_id==t.camp.loc_id});this.updateProp.name&&(this.camp.name=this.updateProp.name.slice(0),e.properties.loc_name=this.updateProp.name.slice(0)),this.updateProp.status&&(this.camp.status=this.updateProp.status.slice(0),e.properties.status=this.updateProp.status.slice(0)),this.updateProp.rating<6&&(this.camp.rating=this.updateProp.rating,e.properties.rating=this.updateProp.rating),this.resetInputs()},resetInputs:function(){this.btnEdit=!0,document.querySelectorAll("input[type=text]").forEach(function(t){t.disabled=!0}),document.getElementById("starsDiv").style.cssText="background-color: rgba(113, 226, 241, 0.596); width: 10vw;";var t=!0,e=!1,a=void 0;try{for(var s,i=l()(this.starSpan);!(t=(s=i.next()).done);t=!0){s.value.removeAttribute("style")}}catch(t){e=!0,a=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw a}}this.newCamp=null,this.updateProp={rating:6,name:"",status:""}}}},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"explore"}},[s("section",{staticClass:"map-section",staticStyle:{width:"30vw",transform:"translateX(0px)"}},[s("header",[s("h2",[t._v("Places to Camp in The Baja!")]),t._v(" "),s("div",{staticClass:"useful-links"},[s("p",{staticClass:"centerMap",on:{click:t.centerMap}},[t._v("Center map "),s("img",{attrs:{src:a("QYCG"),alt:"Center Europe"}})])])]),t._v(" "),s("div",{staticClass:"map-state-information"},[s("section",{staticClass:"camps-display"},[s("h4",{directives:[{name:"show",rawName:"v-show",value:!t.isSelected,expression:"!isSelected"}]},[t._v("Select a camp!  "),s("img",{attrs:{src:"https://i.imgur.com/aAIk82g.png",alt:"marker"}})])]),t._v(" "),t.isSelected?s("section",{staticClass:"details-display"},[s("h3",[t._v("Details:")]),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:t.btnEdit,expression:"btnEdit"}],staticClass:"detailsBtn btn btn-info",on:{click:t.changeEdit}},[s("i",{staticClass:"far fa-edit"}),t._v("Edit")]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.btnEdit,expression:"!btnEdit"}],staticClass:"detailsBtn btn btn-success",attrs:{type:"submit",value:"Save Changes"},on:{click:t.saveEdit}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.camp.name,expression:"camp.name"}],staticClass:"dataDetails",attrs:{disabled:"",type:"text",id:"name",name:"name",required:"",minlength:"3",maxlength:"70"},domProps:{value:t.camp.name},on:{change:function(e){return t.changeName(t.camp.name)},input:function(e){e.target.composing||t.$set(t.camp,"name",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.camp.status,expression:"camp.status"}],staticClass:"dataDetails",attrs:{disabled:"",type:"text",id:"status",name:"status",required:"",minlength:"4",maxlength:"10"},domProps:{value:t.camp.status},on:{change:function(e){return t.changeStatus(t.camp.status)},input:function(e){e.target.composing||t.$set(t.camp,"status",e.target.value)}}}),t._v(" "),s("div",{staticStyle:{"background-color":"rgba(113, 226, 241, 0.596)",width:"10vw"},attrs:{id:"starsDiv"}},[s("br"),t._v(" "),s("p",{domProps:{innerHTML:t._s(t.stars)}}),t._v(" "),s("p",[t._v(t._s(t.camp.rating)+" / 5")])])]):t._e()])])])},staticRenderFns:[]};var h=a("VU/8")(m,g,!1,function(t){a("Bilg")},"data-v-068a9043",null).exports;s.a.use(r.a);var v=new r.a({routes:[{path:"/",name:"slideshow",component:c},{path:"/explore",name:"explore",component:h}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:v,components:{App:n},template:"<App/>"})},QYCG:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9Ijk2IiB3aWR0aD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTQ4IDRDMjMuNyA0IDQgMjMuNyA0IDQ4YzAgMjQuMzAxIDE5LjcgNDQgNDQgNDQgMjQuMzAxIDAgNDQtMTkuNjk5IDQ0LTQ0QzkyIDIzLjcgNzIuMzAxIDQgNDggNHptNCA3OS43NzNWNzJhNCA0IDAgMCAwLTggMHYxMS43NzNDMjcuMzE1IDgxLjkyOCAxNC4wNzIgNjguNjg1IDEyLjIyNyA1MkgyNGE0IDQgMCAwIDAgMC04SDEyLjIyN0MxNC4wNzIgMjcuMzE1IDI3LjMxNSAxNC4wNzIgNDQgMTIuMjI3VjI0YTQgNCAwIDAgMCA4IDBWMTIuMjI3QzY4LjY4NSAxNC4wNzIgODEuOTI4IDI3LjMxNSA4My43NzMgNDRINzJhNCA0IDAgMCAwIDAgOGgxMS43NzNDODEuOTI4IDY4LjY4NSA2OC42ODUgODEuOTI4IDUyIDgzLjc3M3oiLz48L3N2Zz4="},TWGJ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.e0ec0fe5bdb58da08aa4.js.map