<template>
  <div id="home" class="home">
    <div class="mainImg" :style="{'background-image': 'url(' + require('../assets/home-main.jpg') + ')'}"></div>
    <div class="titles">GDJE DONIRATI?</div>
    <div class="hospitalBox">
      <div class="hospitalMapDesc">Krv možete donirati svakodnevno na organiziranim akcijama doniranja krvi kao i u nekim transfuzijskim centrima.<br>
      Redovite akcije doniranja krvi provode se u svim većim radnim organizacijama i mjesnim zajednicama. <br>
      Vrijeme i mjesto održanja akcija najavljuju se putem javnih glasila (novine, radio, TV, na web stranicama), a mjesto doniranja obilježeno je plakatima. <br>
      Donori krvi u Zagrebu mogu dati krv svakoga dana u Hrvatskom zavodu za transfuzijsku medicinu, u Petrovoj 3, od ponedjeljka do petka, od 07:30 do 19:00 sati, a subotom od 07:30 do 15:00 sati. <br>
      U Osijeku, krv se može donirati ponedjeljkom i petkom od 07:30 do 14:30 sati, utorkom i četvrtkom od
      12:00 do 19:30 sati i srijedom od 07:30 do 18:30 sati na Kliničkom zavodu za transfuzijsku medicinu, u Hutlerovoj 4.<br>
      Informacije o mogućnosti doniranja krvi u drugim transfuzijskim centrima možete dobiti izravno u svakom centru, a na karti, prijelazom miša, možete pogledati adrese Gradskih
      društava Crvenog križa i bolnica u kojima možete donirati krv.
      </div>
      <HospitalsMap class="hospitalMap"></HospitalsMap>
    </div>
    <div class="titles">PROCES DONACIJE</div>
    <div class="processBox">
      <div class="processStep" >
        <div class="processImg" :style="{'background-image': 'url(' + require('../assets/hemoglobin.jpg') + ')'}"></div>
        <p>Provjera količine željeza u krvi</p></div>
      <div class="processStep">
        <div class="processImg" :style="{'background-image': 'url(' + require('../assets/razgovor.jpg') + ')'}"></div>
        <p>Kratak razgovor s liječnikom</p></div>
      <div class="processStep">
        <div class="processImg" :style="{'background-image': 'url(' + require('../assets/pregled.jpg') + ')'}"></div>
        <p>Liječnički pregled</p></div>
      <div class="processStep">
        <div class="processImg" :style="{'background-image': 'url(' + require('../assets/donacija.jpg') + ')'}"></div>
        <p>Doniranje</p></div>
      <div class="titles">STATISTIKA</div>
      <div class="dataBox">
        <p>Krv može donirati oko 60% svih muškaraca i oko 50% žena.</p>
        <p>U Hrvatskoj krv donira 3,8% stanovništva, odnosno skupi se 38 doza na 1000 stanovnika.</p>
        <p>U Hrvatskom registru donora krvi evidentirano je oko 100000 donora koji godišnje daju oko 160000 doza krvi.</p>
        <p>70% donora krvi su muškarci, a 30% su žene.</p>
        <p>85% svih donora su višestruki donori krvi koji doniraju krv do 2 puta godišnje, odnosno 3 do 5 puta u životu.</p>
      </div>
      <div class="titles">Doniraj krv, <router-link to="/register" >registriraj se.</router-link></div>
    </div>
  </div>
</template>

<script>
import HospitalsMap from '@/components/HospitalsMap'
  export default {
    components: {
      HospitalsMap
    }
  };
</script>

<style>
.home {
  min-height: 1860px;
}
.mainImg {
  margin: 0 auto;
  margin-top: 20px;
  height: 390px;
  width: 1200px;
  background-size: 1200px 390px;
}
.titles {
  width: 500px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 3px solid rgba(190, 0, 0, 0.74);
  color: rgb(87, 87, 87);
  font-size: 25px;
  font-weight: 500;
  text-align: center;
}
.hospitalBox {
  overflow: hidden;
}
.hospitalMapDesc {
  width: 50%;
  height: 570px;
  margin-left: 30px;
  margin-right: 40px;
  float: left;
  text-align: justify;
  font-size: 18px;
  font-weight: 500;
  color: rgb(59, 59, 59);
  padding-top: 80px;
}
.hospitalMap {
  float: left;
}
.processStep {
  width: 25%;
  height: 300px;
  float: left;
  font-size: 20px;
  font-weight: 500;
  color:  rgb(59, 59, 59);
}
.processStep p {
  padding-left: 20px;
}
.processImg {
  margin: 0 auto;
  height: 250px;
  width: 90%;
}
.dataBox p {
  font-size: 25px;
  font-weight: 500;
  text-align: center;
}
</style>