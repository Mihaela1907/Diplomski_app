<template>
    <div class="bloodSupply">
        <div id="focusArea" 
        @mousemove="getPos($event)" 
        @mouseout="stopTracking()">
            <p>Mouse Over This Text And Get The Cursor Position!</p>
        </div>

        <p id="displayArea"></p>
    </div>
</template>

<script>
export default {
    methods: {
        getPos(e) {
            var x = e.clientX;
            var y = e.clientY;
            var cursor="Your Mouse Position Is : " + x + " and " + y ;
            document.getElementById("displayArea").style.display = 'block';
            document.getElementById("displayArea").innerHTML=cursor;
            document.getElementById("displayArea").style.left =  x + 30  + 'px';
            document.getElementById("displayArea").style.top =  y + 'px';
        },
        stopTracking() {
            document.getElementById("displayArea").style.display = 'none';
            document.getElementById("displayArea").innerHTML="";
        }
    }
}
</script>

<style>
.bloodSupply {
    height: 500px;
}
#displayArea {
    background:#fff; 
    border:1px solid #ccc;
    padding:5px;
    float:left;
    width:auto;
    display:none;
    position:absolute;
    top:0
}
#focusArea {
    cursor:pointer; 
    position:relative;
    width:100%;
    height:50px
}
</style>