webpackJsonp([1],{"+ETa":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},a,!1,function(e){n("+ETa")},null,null).exports,s=n("/ocq"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("div",{attrs:{id:"landing-header"}},[t("h1",[this._v("  Where to Camp-App!  ")]),this._v(" "),t("router-link",{staticClass:"btn btn-lg btn-success",attrs:{to:"explore"}},[this._v(" Exploring locations in the Baja! ")])],1),this._v(" "),this._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{staticClass:"slideshow"},[t("li"),this._v(" "),t("li"),this._v(" "),t("li"),this._v(" "),t("li"),this._v(" "),t("li")])}]};var c=n("VU/8")({name:"landing-header",data:function(){return{}}},i,!1,function(e){n("TWGJ")},"data-v-816b76f6",null).exports,l=n("mtWM"),u=n.n(l),d={name:"explore",data:function(){return{locations:[]}},created:function(){},mounted:function(){var e=this,t=n("1e2d");t.accessToken="pk.eyJ1IjoibXJjaXNjb3NlcmthIiwiYSI6ImNqdjdtb3k5ZTAxZGo0ZHFubTFqdzc4bHoifQ.NTXtmesugzahUhMA4We-iw";var o=new t.Map({container:"explore",style:"mapbox://styles/mapbox/satellite-v9",center:[-109.958683,23.565263],zoom:8});u.a.get("/locations").then(function(n){e.locations=n.data;var a=e.locations.features[0].geometry.coordinates[0];console.log(" X: "+a);var r=e.locations.features[0].geometry.coordinates[1];console.log(" Y: "+r);var s=e.locations.features[0].geometry.coordinates;console.log("Coordinates: "+s),e.locations.features.forEach(function(e){s=e.geometry.coordinates;(new t.Marker).setLngLat(s).addTo(o);o.on("click","symbols",function(e){o.flyTo({center:e.features[0].geometry.coordinates})}),o.on("mouseenter","symbols",function(){o.getCanvas().style.cursor="pointer"}),o.on("mouseleave","symbols",function(){o.getCanvas().style.cursor=""})})}).catch(function(e){console.log("Error in: "),console.log(e)})}},p={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{attrs:{id:"explore"}})},staticRenderFns:[]};var f=n("VU/8")(d,p,!1,function(e){n("nWDE")},"data-v-11e9be81",null).exports;o.a.use(s.a);var v=new s.a({routes:[{path:"/",name:"slideshow",component:c},{path:"/explore",name:"explore",component:f}]});o.a.config.productionTip=!1,new o.a({el:"#app",router:v,components:{App:r},template:"<App/>"})},TWGJ:function(e,t){},nWDE:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.14c1770c3c15e96fec0c.js.map