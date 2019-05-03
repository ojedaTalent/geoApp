<template>
<div>
  <div id="landing-header">
      <h1>  Where to Camp-App!  </h1>
      <!-- <a href="/explore" class="btn btn-lg btn-success">Exploring locations in the Baja!</a> -->
      <router-link to='explore' class="btn btn-lg btn-success" > Exploring locations in the Baja! </router-link>
  </div>
  <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'landing-header',
  data () {
    return {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
    background-color: #000;
  }

  #landing-header {
  z-index: 1;
  position: relative;
  text-align: center;
  padding-top: 40vh;
}

#landing-header h1 {
    color: #fff;
  }

.slideshow { 
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .slideshow li { 
    width: 100%;
    height: 100%;
    position: absolute; /* Take up the entire space of the page */
    top: 0;
    left: 0;
    background-size: cover; /* Take up the entire space of the page */
    background-position: 50% 50%; /* center the image perfectly to the page */
    background-repeat: no-repeat; /* No repeat vertically or horizontally */
    opacity: 0;
    z-index: 0;
    animation: imageAnimation 50s linear infinite; 
  }
  
  .slideshow li:nth-child(1) { 
    background-image: url(https://lh5.ggpht.com/p/AF1QipPpKbEYUmVNSaCXBVwlVyYEon_M8KLNpqUNwEmI=w1304) 
  }
  .slideshow li:nth-child(2) { 
    background-image: url(https://lh5.ggpht.com/p/AF1QipN-IwWaJ5raPjGUYajEI7VIdQnSwzV8o2Kjpc46=w1304);
    animation-delay: 10s; 
  }
  .slideshow li:nth-child(3) { 
    background-image: url(https://lh5.ggpht.com/p/AF1QipNg4Bcx0jTfEn_0U6qy0AeBxSHM4PqrkbFxZU2U=w1304);
    animation-delay: 20s; 
  }
  .slideshow li:nth-child(4) { 
    background-image: url(https://lh5.ggpht.com/p/AF1QipND92QJwRa8TTU--rka97MvXkavK0b_CcFnm91N=w1304);
    animation-delay: 30s; 
  }
  .slideshow li:nth-child(5) { 
    background-image: url(https://lh5.ggpht.com/p/AF1QipMe6__2jsXQ6Zl8hsyvc-rO1re2fzN90VOL8vyW=w1304);
    animation-delay: 40s; 
  }

  @keyframes imageAnimation { 
    0% { 
      opacity: 0; 
      animation-timing-function: ease-in;
    }
    10% {
      opacity: 1;
      animation-timing-function: ease-out;
    }
    20% {
      opacity: 1
    }
    30% {
      opacity: 0
    }
  }

  

/* Older browser support - .no-cssanimations class added by modernizr */
.no-cssanimations .slideshow li {
	opacity: 1;
}

</style>
