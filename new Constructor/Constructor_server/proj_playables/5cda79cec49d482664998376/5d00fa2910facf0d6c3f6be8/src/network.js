import settings from './settings'

export default class Network {
    constructor(callback) {
        this.network = settings.network
        this.os = this.getOS()
        this.url = this.os == 'ios' ? settings.iosUrl : settings.androidUrl
        this.initNetwork(callback)
    }
    initNetwork(callback) {
        switch (this.network) {
            case 'ironsource':
                this.importDapi()
                window.dapi.isReady() ? this.initDapi(callback) : window.dapi.addEventListener('ready', () => { this.initDapi(callback) })
                break
            case 'applovin' || 'unity' || 'appreciate' || 'adcolony':
                mraid.getState() === 'loading' ? mraid.addEventListener('ready', () => { callback() }) : callback()
                break
            case 'facebook' || 'vungle':
                callback()
                break
            case 'google':
                this.importGoogle()
                this.initGoogle()
                callback()
                break
            default:
                callback()
                break
        }
    }
    initDapi(callback) {
        window.dapi.getScreenSize()
        window.dapi.getAudioVolume()
        window.dapi.addEventListener('audioVolumeChange', () => {})
        window.dapi.isViewable() && callback() 
        window.dapi.addEventListener("viewableChange", (e) => {
            e.isViewable ? callback() : console.log('PLAYABLE IS NOT VIEWABLE')
        })
    }
    importDapi() {
        let script = document.createElement('script')
        script.innerHTML = 'function getScript(e,i){var n=document.createElement("script");n.type="text/javascript",n.async=!0,i&&(n.onload=i),n.src=e,document.head.appendChild(n)}function parseMessage(e){var i=e.data,n=i.indexOf(DOLLAR_PREFIX+RECEIVE_MSG_PREFIX);if(-1!==n){var t=i.slice(n+2);return getMessageParams(t)}return{}}function getMessageParams(e){var i,n=[],t=e.split("/"),a=t.length;if(-1===e.indexOf(RECEIVE_MSG_PREFIX)){if(a>=2&&a%2===0)for(i=0;a>i;i+=2)n[t[i]]=t.length<i+1?null:decodeURIComponent(t[i+1])}else{var o=e.split(RECEIVE_MSG_PREFIX);void 0!==o[1]&&(n=JSON&&JSON.parse(o[1]))}return n}function getDapi(e){var i=parseMessage(e);if(!i||i.name===GET_DAPI_URL_MSG_NAME){var n=i.data;getScript(n,onDapiReceived)}}function invokeDapiListeners(){for(var e in dapiEventsPool)dapiEventsPool.hasOwnProperty(e)&&dapi.addEventListener(e,dapiEventsPool[e])}function onDapiReceived(){dapi=window.dapi,window.removeEventListener("message",getDapi),invokeDapiListeners()}function init(){window.dapi&&window.dapi.isDemoDapi&&(window.parent.postMessage(DOLLAR_PREFIX+SEND_MSG_PREFIX+JSON.stringify({state:"getDapiUrl"}),"*"),window.addEventListener("message",getDapi,!1))}var DOLLAR_PREFIX="$$",RECEIVE_MSG_PREFIX="DAPI_SERVICE:",SEND_MSG_PREFIX="DAPI_AD:",GET_DAPI_URL_MSG_NAME="connection.getDapiUrl",dapiEventsPool={},dapi=window.dapi||{isReady:function(){return!1},addEventListener:function(e,i){dapiEventsPool[e]=i},removeEventListener:function(e){delete dapiEventsPool[e]},isDemoDapi:!0};init();'
        document.head.appendChild(script)
    }
    importGoogle() {
        let script = document.createElement('script')
        script.src = 'https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js'
        document.head.appendChild(script)
    }
    initGoogle() {
        let title = document.createElement('title')
        title.innerHTML = settings.name
        document.head.appendChild(title)
    }
    openStore() {
        switch (this.network) {
            case 'ironsource':
                window.dapi.openStoreUrl(this.url)
                break
            case 'applovin' || 'unity' || 'appreciate':
                mraid.open(this.url)
                break
            case 'facebook':
                FbPlayableAd.onCTAClick()
                break
            case 'adcolony':
                mraid.openStore(this.url)
                break
            case 'vungle':
                callSDK("download")
                break
            case 'google':
                ExitApi.exit()
                break
            default:
                console.log('CLICK')
                break
        }   
    }
    getOS() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera
      
        if (/windows phone/i.test(userAgent)) return "windows phone"
    
        if (/android/i.test(userAgent)) return "android"
    
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "ios"
    
        return "unknown"
    }
}