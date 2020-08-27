<template>
  <div class="about">
    <div class="sidenav">
      <a href="#tkoMoze">Tko može donirati krv?</a>
      <a href="#kako">Kako se donira krv?</a>
      <a href="#gdje">Gdje i kada se može donirati krv?</a>
      <a href="#tkoJe">Tko je donor krvi?</a>
      <a href="#tkoNemoze">Tko ne smije donirati krv?</a>
      <a href="#kolikoCesto">Koliko često se može donirati krv?</a>

    </div>
    <div class="aboutBox">
      <br>
      <div class="left imgBox" :style="{'background-image': 'url(' + require('../assets/about1.jpg') + ')'}"></div>
      <div class="right textBox" id="tkoMoze">
        <h5>TKO MOŽE DONIRATI KRV?</h5>
        <p>
          Krv može donirati svaki čovjek dobrog općeg zdravstvenog stanja:<br>
          - dob: od 18 do 65 godina<br>
          - tjelesna težina: iznad 55 kg<br>
          - tjelesna temperatura: do 37°C<br>
          - krvni tlak: sistolični 100 do 180 mmHg, dijastolični 60 do 110 mmHg<br>
          - puls: 50 do 100 otkucaja u minuti<br>
          - hemoglobin: muškarci 135 g/L, žene 125 g/L<br>
       </p>
      </div>
      <br>
      <div class="left textBox" id="kako">
        <h5>KAKO SE DONIRA KRV?</h5>
        <p>
          Doniranje krvi uključuje provjeru zdravlja:<br>
          - provjeru količine željeza u krvi<br>
          - kratak razgovor s liječnikom<br>
          - liječnički pregled<br>
          Donor je smješten na krevet za doniranje krvi te, kroz iglu uvedenu u venu, donira krv u plastičnu vrećicu za krv.
          Doniranje traje od 8 do 12 minuta nakon čega donoru slijedi kratkotrajni odmor uz tekućinu i lagani obrok.
        </p>
      </div>
      <div class="right imgBox" :style="{'background-image': 'url(' + require('../assets/about2.jpg') + ')'}"></div>
      <br>
      <div class="left imgBox" :style="{'background-image': 'url(' + require('../assets/about3.jpg') + ')'}"></div>
      <div class="right textBox" id="gdje">
        <h5>GDJE I KADA SE MOŽE DONIRATI KRV?</h5>
        <p>
          U Osijeku, krv se može donirati ponedjeljkom i petkom od 07:30 do 14:30 sati, utorkom i četvrtkom od
          12:00 do 19:30 sati i srijedom od 07:30 do 18:30 sati na Kliničkom zavodu za transfuzijsku medicinu.<br>
          <br>
          Adresa: Josipa Huttlera 4, HR-31000 Osijek
        </p>
      </div>
      <br>
      <div class="left textBox" id="tkoJe">
        <h5>TKO JE DONOR KRVI?</h5>
        <p>
          Dobrovoljni darivatelj krvi je osoba koja daruje krv, 
          plazmu ili stanične dijelove krvi po svojoj slobodnoj volji i ne prima za to nikakvu naknadu, 
          ni novčanu niti na način koji se može smatrati nadomjestkom novca.<br>
          Dobrovoljni darivatelji krvi je posredan, aktivan sudionik u liječenju bolesnika - on je aktivna veza između 
          zdravog dijela društva i bolesnika.
        </p>
      </div>
      <div class="right imgBox" :style="{'background-image': 'url(' + require('../assets/about4.jpg') + ')'}"></div>
      <br>
      <div class="left imgBox" :style="{'background-image': 'url(' + require('../assets/about5.jpg') + ')'}"></div>
      <div class="right textBox" id="tkoNemoze">
        <h5>TKO NE SMIJE DONIRATI KRV?</h5>
        <p>
          Razlog odbijanja donora uvijek je opasnost od uzimanja krvi za donorovo zdravlje ili opasnost od krvnih 
          pripravaka za bolesnikovo zdravlje.<br>
          Krv ne smiju donirati osobe koje bi time oštetile svoje zdravlje ili bi njihova krv mogla ugroziti bolesnikovo 
          zdravlje i osobe koje boluju od akutne ili kronične bolesti, uzimaju antibiotike ili neke druge lijekove, 
          neispavane osobe, osobe koje su na dugotrajnoj dijeti i osobe s rizičnim ponašanjem.
        </p>
      </div>
      <br>
      <div class="left textBox" id="kolikoCesto">
        <h5>KOLIKO ČESTO SE MOŽE DONIRATI KRV?</h5>
        <p>
          Muškarci mogu donirati punu krv svaka 3 mjeseca, a žene svaka 4 mjeseca.<br>
          Darivatelj krvi staničnim separatorom mogu darivati češće:<br>
          - trombociti: do 12 puta godišnje.<br>
          - plazma: do 25 puta godišnje.<br>
          Razmak između darivanja mora biti 3 dana.
        </p>
      </div>
      <div class="right imgBox" :style="{'background-image': 'url(' + require('../assets/about6.jpg') + ')'}"></div>
    </div>
  </div>
</template>

<script>
</script>

<style>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 300px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: rgb(73, 109, 121);
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 70px;
   box-shadow: 0px 3px 10px 3px #000000;
}
.sidenav a {
  padding: 6px 15px 6px 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: rgb(219, 219, 219);
  display: block;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.about {
  margin-left: 320px;
  margin-right: 20px;
}
.aboutBox {
  width: 100%;
}
.left {
  width: 50%;
  float: left;
  height: 250px;
}
.right {
  width: 50%;
  overflow: hidden;
  height: 250px;
}
.imgBox {
  background-color: lightblue;
  height: 300px;
  background-size: 100%;
  background-repeat: no-repeat;
  box-shadow: 0 0 8px 8px lightblue inset;
}
.textBox {
  height: 300px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: justify;
  text-justify: inter-word;
  color: rgb(100, 100, 100);
  font-weight: 500;
}
.textBox h5 {
  color: rgb(75, 75, 75);
}
</style>