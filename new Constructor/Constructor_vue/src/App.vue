<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
    
  },
  beforeCreate() {
      try {
        var user = JSON.parse(window.localStorage.getItem('user'))
      } catch(err) {
        user = {} 
      } 
      this.$store.commit('replaceState', user)
    }
}
</script>

<style>
@-webkit-keyframes rel-spin {
  0%   { -webkit-transform: rotateZ(0deg); }
  100% { -webkit-transform: rotateZ(-360deg) }
}
@-moz-keyframes rel-spin {
  0%   { -moz-transform: rotateZ(0deg); }
  100% { -moz-transform: rotateZ(-360deg) }
}
@-o-keyframes rel-spin {
  0%   { -o-transform: rotateZ(0deg); }
  100% { -o-transform: rotateZ(-360deg) }
}
@keyframes rel-spin {
  0%   { transform: rotateZ(0deg); }
  100% { transform: rotateZ(-360deg) }
}
@-webkit-keyframes pre-spin {
  0%   { -webkit-transform: rotateZ(-0deg); }
  100% { -webkit-transform: rotateZ(-360deg) }
}
@-moz-keyframes pre-spin {
  0%   { -moz-transform: rotateZ(-0deg); }
  100% { -moz-transform: rotateZ(-360deg) }
}
@-o-keyframes pre-spin {
  0%   { -o-transform: rotateZ(-0deg); }
  100% { -o-transform: rotateZ(-360deg) }
}
@keyframes pre-spin {
  0%   { transform: rotateZ(-0deg); }
  100% { transform: rotateZ(-360deg) }
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
* {
  font-family:'Roboto', sans-serif
}
html {
  overflow-y: auto
}
iframe {
  border: 0
}
tr:nth-child(2n-1) {
  background-color: #f7f7f7
}
thead tr {
  background-color: #fff !important
}
.v-table__overflow {
      height: calc( 100vh - 180px) !important;
      overflow-y: auto;
}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #121212 !important
}
.loginbg {
    background-image: url('./assets/logbg.jpg');
    background-size: cover;
    height: 100vh
}
.playbg {
    background-color: #ddd;
    background-size: cover;
    height: 100vh;
    overflow-x: hidden
}
.pl1 {
    background-image: url('./assets/playbg/1.jpg')
}
.pl2 {
    background-image: url('./assets/playbg/2.jpg')
}
.pl3 {
    background-image: url('./assets/playbg/3.jpg')
}
.pl4 {
    background-image: url('./assets/playbg/4.jpg')
}
.logcard {
  width: 420px
}
.text-center {
  text-align: center
}
.colorpicker {
    border-radius: 100%;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
}
.z1 {
  z-index: 10
}
.thumb {
  border: 3px solid #fcfcfc;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
  transition: .3s;
  cursor: pointer;
}
.thumb:hover {
  box-shadow: 0 0 9px 1px rgba(0,0,0,.3)
}
.act {
  border-color: #333
}
/* .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
} */
.arrow-flip {
  transform: rotateZ(-180deg);
}
.help {
  cursor: default
}
.tr-nav {
  background-color: rgba(255,255,255,.7) !important
}
.rotate1 {
  transform: rotateZ(45deg);
}
.rotate2 {
  transform: rotateZ(-45deg) !important
}
#device {
  margin:0;
  position: relative;
  display:flex;
  justify-content: center;
  align-items: center;
  transition: transform .3s
}
.rotate {
  transform: rotateZ(-90deg)
}
.preroll {
  -webkit-animation: pre-spin .5s 1;
  -moz-animation: pre-spin .5s 1;
  -o-animation: pre-spin .5s 1;
  animation: pre-spin .5s 1;
}
.roll {
  -webkit-animation: rel-spin .5s 1;
  -moz-animation: rel-spin .5s 1;
  -o-animation: rel-spin .5s 1;
  animation: rel-spin .5s 1;
}
.devdisplay {
  width:100%;
  height:100%;
  background: #000;
}
.devimg {
  width: 100%;
  height:100%;
  position: absolute;
  pointer-events: none;
  z-index: 2
}
.iphone678 {
  width: 309px;
  height: 623px;
  background-image: url('./assets/devices/iphone7.png');
}
.iphone678 .devdisplay {
  width: 263px;
  height: 471px;
  padding-top: 4px;
}
.iphone678.rotate .devdisplay {
  transform: rotateZ(90deg);
    width: 471px;
    height: 263px;
    padding-left: 4px;
    padding-top: 0;
    position: absolute
}
.iphonexs {
  width: 330px;
  height: 658px;
  background-image: url('./assets/devices/iphonexs.png');
}
.iphonexs .devdisplay {
  width: 288px;
  height: 620px;
  padding-top: 23px;
}
.iphonexs.rotate .devdisplay {
  transform: rotateZ(90deg);
  width: 620px;
  height: 288px;
  padding-left: 23px;
  padding-top: 0;
  position: absolute
}
.pixel3 {
  width: 315px;
  height: 667px;
  background-image: url('./assets/devices/pixel3.png');
}
.pixel3 .devdisplay {
  width: 284px;
  height: 569px;
  padding-top: 0;
}
.pixel3.rotate .devdisplay {
  transform: rotateZ(90deg);
    width: 569px;
    height: 284px;
    padding-left: 0;
    padding-top: 0;
    position: absolute
}
.mix3 {
  width: 339px;
  height: 710px;
  background-image: url('./assets/devices/mix3.png');
}
.mix3 .devdisplay {
    width: 311px;
    height: 680px;
    padding-top: 0;
    padding-bottom: 5px;
}
.mix3.rotate .devdisplay {
  transform: rotateZ(90deg);
    width: 680px;
    height: 311px;
    padding-left: 0;
    padding-right: 5px;
    padding-bottom: 0;
    position: absolute
}
.ipad97 {
  width: 600px;
  height: 845px;
  background-image: url('./assets/devices/ipad97.png');
}
.ipad97 .devdisplay {
  width: 526px;
  height: 698px;
  padding-top: 0;
}
.ipad97.rotate .devdisplay {
  transform: rotateZ(90deg);
    width: 698px;
    height: 526px;
    padding-left: 0;
    padding-top: 0;
    position: absolute
}
@media only screen and (max-width: 420px) {
  .logcard {
    width: 90%
  }
}
</style>

