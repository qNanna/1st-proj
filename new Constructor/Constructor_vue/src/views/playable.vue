<template>
    <v-content class="playbg" :class="[curract]" >
        <v-toolbar :dark="currtheme == 'dark'" color="transparent" flat absolute class="z1">
            <v-toolbar-side-icon @click='back'><v-icon>arrow_back</v-icon></v-toolbar-side-icon>
            <v-toolbar-title>{{playable.name}}</v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer fixed app permanent fill-height stateless class="tr-nav" right width="900" mini-variant-width="300" :mini-variant="drawer">
            <v-layout>
                <v-navigation-drawer fixed permanent stateless right width="600" v-if="!drawer" fill-height>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <h3 class="display-1 ml-2 mb-3">Options</h3>
                            </v-flex>
                            <v-flex xs12 v-for="(i, index) in playParams" :key="index">
                                <v-subheader ml0 pl0>{{ i.title }}
                                    <v-tooltip max-width="200" v-if="i.tooltip" top>
                                        <template v-slot:activator="{ on }">
                                            <v-icon class="ml-3 help" color="primary" v-on="on">help</v-icon>
                                        </template>
                                        <span>{{ i.tooltip }}</span>
                                    </v-tooltip>
                                </v-subheader>
                                <v-flex xs12 v-if="i.type == 'text'" class="mb-3">
                                    <v-flex xs6 class="ml-3">
                                        <v-text-field :label="i.value" v-model="currentParams[i.description]" required></v-text-field>
                                    </v-flex>
                                </v-flex>
                                <v-radio-group v-if="i.type == 'radio'" v-model="currentParams[i.description]" row class="px-2 mb-3">
                                    <v-flex xs6 class="mb-2" v-for="(j, ind) in i.value" :key="ind">
                                        <v-radio color="blue" :label="j" :value="j" reqired></v-radio>
                                    </v-flex>
                                </v-radio-group>
                                <v-flex xs12 v-if="i.type == 'check'" class="mb-3">
                                    <v-layout wrap class="px-2 pb-3">
                                        <v-flex xs6 v-for="(k, indix) in i.value" :key="indix">
                                            <v-checkbox v-model="currentParams[k]" height="16" color="blue" hide-details :label="k"></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                 <v-flex xs12 v-if="i.type == 'select'" class="mb-3">
                                    <v-select v-model="currentParams[i.title]" class="px-2" :items="i.value" label="Please select an option" outline></v-select>
                                </v-flex>
                                <v-flex xs12 v-if="i.type == 'slider'" class='mb-3 px-4'>
                                    <v-slider height="0" :min="i.value[0]" :max="i.value[1]" v-model="currentParams[i.description]" always-dirty thumb-label ></v-slider>
                                    <v-layout row justify-space-between>
                                        <span class="caption grey--text">{{ i.value[0] }}</span>
                                        <span class="caption grey--text">{{ i.value[1] }}</span>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 v-if="i.type == 'switch'" class="mb-3">
                                    <v-layout wrap class="px-2">
                                        <v-flex xs6 v-for="(k, inx) in i.value" :key="inx">
                                            <v-switch v-model="currentParams[k]" height="0" color="blue" :label="k"></v-switch>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 v-if="i.type == 'color'" class="mb-3">
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="(o, ix) in i.value" :key="ix">
                                            <v-menu :close-on-content-click="false" :nudge-width="180" offset-y>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn large flat icon :color="(currentParams[o.title] ? (currentParams[o.title]) : '#000000')" v-on="on">
                                                        <v-icon class="colorpicker" large >lens</v-icon>
                                                    </v-btn>
                                                    <span class="subheading grey--text text--darken-1">{{ o.title }}</span>
                                                </template>
                                                    <!-- <chromePicker :value="o.hex" @input="(val) => { o.hex = val.hex }"></chromePicker> -->
                                                    <!-- <chromePicker :value="currentParams[o.title]" @input="(val) => { currentParams[o.title] = val.hex }" ></chromePicker> -->
                                                    <chromePicker :value="(currentParams[o.title] ? (currentParams[o.title]) : '#000000' )" @input="(val) => { currentParams[o.title] = val.hex }" ></chromePicker>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-flex>
                            <v-flex xs6 justify-center align-center>
                                <v-btn color="blue" :loading="loader" width="200px" :dark="!loader" :disabled="loader" @click="apply">Create<template v-slot:loader>
            <span style="display:flex;align-items:center;">
                <v-icon class="custom-loader" light>cached</v-icon>Loading
            </span>
      </template></v-btn>

        <v-tooltip max-width="200" top>
            <template v-slot:activator="{ on }">
                <v-icon class="ml-3 help" color="primary" v-on="on">help</v-icon>
            </template>
            <span>Create new version</span>
        </v-tooltip>
        </v-flex>
        
                            <v-flex xs6 justify-center align-center>
                                <v-btn v-if=" playable.default != true || $store.state.user.role == 'admin' " color="blue" :loading="loader" width="200px" :dark="!loader" :disabled="loader" @click="saveconf">Apply<template v-slot:loader>
            <span style="display:flex;align-items:center;">
                <v-icon class="custom-loader" light>cached</v-icon>Loading
            </span>
      </template></v-btn>

        <v-tooltip max-width="200" v-if=" playable.default != true || $store.state.user.role == 'admin' " top>
            <template v-slot:activator="{ on }">
                <v-icon class="ml-3 help" color="primary" v-on="on">help</v-icon>
            </template>
            <span>Apply changes</span>
        </v-tooltip>
        </v-flex>

                        </v-layout>
                    </v-container>
                </v-navigation-drawer>
                <v-container style="max-width: 300px; margin-left: 0"> 
                    <v-layout wrap>
                        <v-flex xs12 class="mb-3">
                            <h4 class="body-2 grey--text text--darken-1" ml0 pl0>Controls</h4>
                        </v-flex>
                        <v-flex xs12 class="mb-4">
                            <v-layout row justify-space-between="">
                                 <v-tooltip style="display: none" bottom open-delay="500">
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" flat icon color="green" @click="rotate">
                                            <v-icon class="rotate1" :class='{ "rotate2" : portrait }'>screen_rotation</v-icon>
                                        </v-btn> 
                                    </template>
                                    <span>Rotate screen</span>
                                </v-tooltip>
                                <v-tooltip style="display: none" bottom open-delay="500">
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" flat icon color="red" @click="reloadPlay">
                                            <v-icon class="preroll" :class='{ "roll" : roll }'>replay</v-icon>
                                        </v-btn> 
                                    </template>
                                    <span>Reload Playable</span>
                                </v-tooltip>
                                <v-tooltip style="display: none" bottom open-delay="500">
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" flat icon color="blue" @click="resize">
                                            <v-icon style="transition: .5s" class="preroll" :class='{ "arrow-flip" : drawer }'>keyboard_tab</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Hide options panel</span>
                                </v-tooltip>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class="mb-4">
                            <h4 class="body-2 grey--text text--darken-1" ml0 pl0>Background</h4>
                        </v-flex>
                        <v-flex xs12 class="mb-5">
                            <v-layout wrap>
                                <v-flex xs3 v-for="(p, ixx) in bgpics" :key="ixx" class="px-2">
                                    <v-img :src="p.url" aspect-ratio="1" class="thumb" :class="{'act' : curract == p.class}" @click="bgAss(p)"></v-img>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <h4 class="body-2 grey--text text--darken-1" ml0 pl0>Devices</h4>
                        </v-flex>
                        <v-flex xs12>
                            <v-radio-group class="ml-2 mb-3" :value="deviceList[0].value">
                                    <v-radio color="blue" v-for="(m, inde) in deviceList" :label="m.title" :value="m.value" :key="inde" @change="devChange"></v-radio>
                            </v-radio-group>
                        </v-flex>
                        <v-flex xs12 text-center>
                            <v-btn dark color="green" :loading="loader" @click="download"><v-icon dark>get_app</v-icon>download</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-layout>
                    <!-- <div v-for="j, i in configurations" :key="i">
                        <template v-if="j.type == 'text'">
                            <span><input id="_text" :type="j.type" v-model="config.name">{{i}}</span>
                        </template>
                        <template v-if="j.type == 'radio'">
                            <span  v-for="k in j.count" :key="k"><input id="_radio" :name="j.count" :type="j.type" @change="config[i] = k" :checked="config[i] == k" >{{k}}</span>
                        </template>
                        <template v-if="j.type == 'checkbox'">
                            <span  v-for="k in j.count" :key="k"><input id="_checkbox" :name="j.count" :type="j.type" @change="config[i] = k" :checked="config[i] == k" >{{k}}</span>
                        </template>
                    </div> -->
        </v-navigation-drawer>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                        <!-- <input v-model="variation" type="text" checked='true' name="chetyre" id="txt1" placeholder="A / B / C"/> 
                        <input v-model="style" type="text" checked='true' name="chetyre" id="txt1" placeholder="1 / 2 / 3"/>
                        <input v-model="network" type="text" checked='true' name="chetyre" id="txt1" placeholder="facebook / tapjoy"/> -->
                        
                        <!-- <div v-for="i, key in obj">
                            <input type="text" :id="key" :placeholder="key" v-model="obj[key]">
                            <label :for="key">{{key}}</label>
                        </div> -->
                    <!-- <img src='http://dashboard.playablefactory.com/public/phone_assets/iphone_hori.png'> -->
                    <div id="device" :class="[currentDevice, { 'rotate': !portrait }]">
                        <iframe ref="iframe" id="playable" v-if="!loader" :src="playable.url" class="devdisplay"></iframe>
                        <div v-if="loader" class="placeholder devdisplay">
                            <v-progress-circular indeterminate color="grey"></v-progress-circular>
                            <p class="grey--text title mt-4">Loading...</p>
                        </div>
                        <div class="devimg" :class="currentDevice"></div>
                        <!-- <iframe :src="playable.url" :class="{'portrait': portrait, 'landscape': !portrait}"></iframe> -->
                    </div>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>

import config from '../config.js'
import axiosMixin from '../mixins/axios'
import { Chrome as chromePicker } from 'vue-color'
import { setTimeout } from 'timers';

export default {
    
    data() {
        return {
            playableName: undefined,
            roll: false,
            drawer: false,
            devgroup: 1,
            currentDevice: 'iphone678',
            curract: 'pl1',
            currtheme: 'light',
            bgpics: [{
                url: '../assets/playbg/1th.jpg',
                theme: 'light',
                class: 'pl1'
            }, {
                url: '../assets/playbg/2th.jpg',
                theme: 'dark',
                class: 'pl2'
            }, {
                url: '../assets/playbg/3th.jpg',
                theme: 'dark',
                class: 'pl3'
            }, {
                url: '../assets/playbg/4th.jpg',
                theme: 'light',
                class: 'pl4'
            }, ],
            deviceList: [{
                title: 'Iphone 6/7/8',
                value: 'iphone678'
            }, {
                title: 'Iphone X/Xs/Xs Max/Xʀ',
                value: 'iphonexs'
            }, {
                title: 'iPad 9.7/10.5/12.3',
                value: 'ipad97'
            }, {
                title: 'Android 18:9',
                value: 'pixel3'
            }, {
                title: 'Android 19.5:9',
                value: 'mix3'
            }],
            loader: false,
            portrait: true,
            playable: {},
            playables: [],
            config: {},
            config_path: undefined,
            configurations: {},
            currentParams: {
                // iosUrl: 'http://iphone/...',
                // androidUrl: 'http://android/...',
                // name: 'kakoeto imya',
                // network: 'facebook',
            },
            playParams: []
        }
    
    },
    mixins: [axiosMixin],
    components: {
        chromePicker
    },
    methods: {
        devChange(value) {
            this.currentDevice = value
        },
        bgAss(p) {
            this.curract = p.class
            this.currtheme = p.theme
        },
        resize() {
            this.drawer = !this.drawer
        },
        reloadPlay() {
            this.roll = !this.roll
            this.$refs.iframe.src += ''
        },
        rotate() {
            this.portrait = !this.portrait
        },
        back() {
            this.$store.state.user.role == 'user' ? (this.$router.push(`/cabinet`)) : this.$router.push(`/admincabinet`) 
        },
        // updateValue (value) {
        //     this.hex = this.value
        // },
        apply() {
            this.loader = true
            this.send()
        },
        send() {
            const data = {
                config: this.currentParams,
                data: {
                    name: this.currentParams.name,
                    target: this.playable.userid,
                    playableId: this.playable.playableId,
                    config_path: this.config_path
                }
            }

            this.sendRequest(data, '/apply', (res) => {
                if (res.err) {
                    console.log(err)
                } else {
                    //console.log(res.data)
                    this.playable = res.data.data
                    this.loader = false
                }
            })
        },
        download() {
            window.open(`${config.domain}/download?token=${this.$store.state.user.token}&_id=${this.$store.state.user._id}&path=${this.playable.path}`)
        },
        showPlayable() {
            let data
            if (this.$store.state.user.role == 'admin') data = { find: { _id: this.$route.params.id } }
            else data = { find: { _id: this.$route.params.id, userid: this.$store.state.user._id }}
            
            this.sendRequest(data, '/showPlayable', (res) => {
                if (res.err) {
                    console.log(err)
                } else {
                    //console.log(res.data)
                    this.playable = res.data.showedplayable[0]
                    this.config_path = this.playable.config_path
                    this.configurations = this.playable.configurations.config
                    this.playParams = this.configurations
                    if (this.playable.config) this.currentParams = this.playable.config
                    
                }
                
            })
        },
        saveconf() {
            this.loader = true

            let data = {
                config: this.currentParams,
                data: {
                    find: { userid: this.playable.userid },
                    name: this.currentParams.name,
                    _id: this.playable._id,
                    target: this.playable.userid,
                    playableId: this.playable.playableId,
                    config_path: this.config_path,
                    url: this.playable.url
                }
            }

            this.sendRequest(data, '/saveconf', (res) => {
                if (res.err) {
                    console.log(err)
                } else {
                    //console.log(res.data)
                    this.playable = res.data.q
                    this.loader = false
                }
            })
        }

    },
    mounted() {
        this.showPlayable()
    }
}
</script>


<style scoped>  
    .portrait {
        width: 320px;
        height: 568px;
    }
    .landscape {
        width: 568px;
        height: 320px;
    }
</style>

