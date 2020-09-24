<template>
    <div class="footer">
        <div class="footerContainer">
            <div class="footerBox footerBox1">
                <label>Navigacija</label>
                <router-link to="/home" class="footerLink">HOME</router-link>
                <router-link to="/about" class="footerLink">O DARIVANJU</router-link>
                <router-link to="/login" class="footerLink" v-if="!isLoggedIn">PRIJAVA</router-link>
                <router-link to="/register" class="footerLink" v-if="!isLoggedIn">REGISTRACIJA</router-link>
                <router-link to="/profile" class="footerLink" v-if="isLoggedIn && isBasic">PROFIL</router-link>
                <router-link to="/donations" class="footerLink" v-if="isLoggedIn && isBasic">DONACIJE</router-link>
                <router-link to="/adminmain" class="footerLink" v-if="isLoggedIn && !isBasic">NASLOVNICA</router-link>
                <router-link to="/donors" class="footerLink" v-if="isLoggedIn && !isBasic">DONORI</router-link>
                <router-link to="/finddonor" class="footerLink" v-if="isLoggedIn && !isBasic">NAĐI DONORE</router-link>
            </div>
            <div class="footerBox footerBox2">
                <label>Posjetite</label>
                <a href="https://hztm.hr/hr/content/22/zalihe-krvi/831/zalihe-krvi" class="footerLink hztm">HZTM</a>
                <a href="http://www.kbco.hr/informacije/darivanje-krvi/" class="footerLink kbc">KBC OSIJEK</a>
                <a href="https://www.hck.hr/kako-pomoci/darujte-krv/28" class="footerLink ck">CRVENI KRIŽ</a>
            </div>
            <div class="footerBox footerBox3">
                <label>Diplomski rad</label>
                <p class="footerLink">Fakultet elektrotehnike, računarstva i informacijskih tehnologija, Osijek</p>
                <p class="footerLink">Izradila: <br>Mihaela Dijanešić</p>
                <p class="footerLink">Mentor: <br>Prof.dr.sc. Goran Martinović</p>
            </div>
        </div>
        <div class="footerLink" style="width:10%;margin:0 auto">Osijek, 2020.</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Footer",
    computed: {
        ...mapGetters(["isLoggedIn"]),
        ...mapGetters(["user"]),
        isBasic () {
            return this.user && this.user.role == "basic";
        }
    },
    created () {
        this.getProfile();
    },
    methods: {
        ...mapActions(["getProfile"]),
        ...mapActions(["logout"]),
        logoutUser() {
            this.logout();
        }
    }
}
</script>

<style>
.footer {
    width: 100%;
    background-color: #343A40;
    height: auto;
    box-shadow: 10px 3px 10px 10px #464646;
    position: relative;
    z-index: 1000;
    
}
.footer label {
    color: rgb(22, 22, 22);
    font-size: 20px;
    font-weight: 500;
    padding-left: 15px;
    padding-bottom: 10px;
}
.footerLink {
    font-size: 15px;
    display: block;
    color: rgb(139, 139, 139);
    padding-left: 15px;
    padding-bottom: 20px;
}
.footerContainer {
    width: 95%;
    height: auto;
    margin: 0 auto;
    padding-top: 20px;
}
.footerBox {
    float: left;
    width: 33.33%;
    height: 250px;
    padding: 15px;
}
.ck, .hztm, .kbc {
    padding-left: 30px;
    line-height: 20px;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    margin-left: 15px;
}
.ck {
    background-image: url('../assets/crveni-kriz.png');
}
.hztm {
    background-image: url('../assets/hztm.png');
}
.kbc {
    background-image: url('../assets/kbc-osijek.png');
}
.footerBox3 p{
    padding: 0;
    padding-left: 15px;
}
</style>