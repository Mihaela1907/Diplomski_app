<template>
  <div class="home">
    <!-- <div class="homeBanner"></div> -->
<!-- <div class="measure one">
      <div class="name">A+</div>
      <div class="top"></div>

      <div class="bag"></div>
      <div class="outer">
          <div class="inner" data-percent="24.4" style="height: 24.4px;"></div>
      </div>
      <div class="bottom"></div>
    </div> -->
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12 homeBox">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <h5 class="card-title">Crveni križ</h5>
            <p
              class="card-text"
            >Hrvatski Crveni križ – utemeljitelj dobrovoljnog davanja krvi u Republici Hrvatskoj, promiče dobrovoljno davanje krvi, 
            organizira i provodi akcije davanja krvi, okuplja davatelje, dodjeljuje priznanja sukladno Pravilniku o priznanjima...</p>
            <a href="https://www.hck.hr/kako-pomoci/darujte-krv/28" target="_blank" class="btn bg-white">Više informacija</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 homeBox">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">HZTM</h5>
            <p
              class="card-text"
            >Hrvatski zavod za transfuzijsku medicinu je neprofitna zdravstvena ustanova u državnom vlasništvu. HZTM je 
            osnovan 1945.godine sa ciljem obavljanja zdravstvene djelatnosti za potrebe transfuzijskog liječenja bolesnika.</p>
            <a href="https://www.hztm.hr/hr/content/6/djelatnost-i-ustroj/9/djelatnost-i-ustroj/" target="_blank" class="btn bg-white">Više informacija.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 homeBox">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Vue.js</h5>
            <p
              class="card-text"
            >Vue.js features an incrementally adoptable architecture that focuses on declarative rendering and component composition. Advanced features required for complex applications such as routing...</p>
            <a href="https://vuejs.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 homeBox">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <h5 class="card-title">Node.js</h5>
            <p
              class="card-text"
            >As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently.</p>
            <a href="https://nodejs.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
.homeBanner {
  height: 385px;
  background-image: url('../assets/about.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  box-shadow: 0 0 8px 8px lightblue inset;
  margin-bottom: 20px;
}
.homeBox {
  height: 400px;
  margin-bottom: 20px;
}

.homeBox .card {
  height: 370px;
}
</style>