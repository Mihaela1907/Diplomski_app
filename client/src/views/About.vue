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
    <div class="aboutBanner"></div>
    <div class="aboutBox">
      <br>
      <div class="left imgBox"></div>
      <div class="right textBox" id="tkoMoze">
        <h4>TKO MOŽE DONIRATI KRV?</h4>
      </div>
      <br>
      <div class="left textBox" id="kako">
        <h4>KAKO SE DONIRA KRV?</h4>
      </div>
      <div class="right imgBox"></div>
      <br>
      <div class="left imgBox"></div>
      <div class="right textBox" id="gdje">
        <h4>GDJE I KADA SE MOŽE DONIRATI KRV?</h4>
      </div>
      <br>
      <div class="left textBox" id="tkoJe">
        <h4>TKO JE DONOR KRVI?</h4>
      </div>
      <div class="right imgBox"></div>
      <br>
      <div class="left imgBox"></div>
      <div class="right textBox" id="tkoNemoze">
        <h4>TKO NE SMIJE DONIRATI KRV?</h4>
      </div>
      <br>
      <div class="left textBox" id="kolikoCesto">
        <h4>KOLIKO ČESTO SE MOŽE DONIRATI KRV?</h4>
      </div>
      <div class="right imgBox"></div>
    </div>
  </div>
</template>

<script>
</script>

<style>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 250px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 70px;
  box-shadow: 10px 10px 10px 5px #888888;
}
.sidenav a {
  padding: 6px 15px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.about {
  margin-left: 250px;
  padding: 0px 10px;
}
.aboutBanner {
  height: 370px;
  background-image: url('../assets/about.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.aboutBox {
  /* border: 1px solid black; */
  width: 100%;
  overflow: hidden;
}
.left {
  /* border: 1px solid red; */
  width: 50%;
  float: left;
  height: 250px;
}
.right {
  /* border: 1px solid blue; */
  width: 50%;
  overflow: hidden;
  height: 250px;
}
.imgBox {
  background-color: white;
}
.textBox {
  padding-top: 10px;
  padding-left: 20px;
}
</style>