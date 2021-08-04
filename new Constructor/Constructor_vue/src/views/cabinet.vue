<template>
    <v-content>
        <v-navigation-drawer class="blue darken-4" dark fixed app permanent :mini-variant="drawer">
            <v-toolbar height="128" flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile>
                        <v-list-tile-title v-if="!drawer" class="title" >
                            Playable views
                        </v-list-tile-title>
                        <v-btn @click="resize" icon>
                            <v-icon style="transition: .5s" :class='{ "arrow-flip": !drawer}' >keyboard_tab</v-icon>
                        </v-btn>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-menu >
                                <template v-slot:activator="{ on }">
                                    <v-btn icon @click="test">
                                        <!-- <input ref="ava" hidden="true" id="fileinp" type="file" multiple> -->
                                        <v-avatar :size="37.5" color="grey lighten-4"> 
                                            <img :src="$store.state.user.avatar">
                                        </v-avatar>  
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-tile v-for="(item, i) in usermenu" ripple :key="i" @click="item.action">
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{this.$store.state.user.username}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-menu bottom left>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-tile v-for="(item, i) in usermenu" ripple :key="i" @click="item.action">
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile ripple v-for="i in playables" :key="i.title" @click="getPlayablesVersions(i._id); currversion = i"  :class="i == currversion ? 'blue darken-3' : ''" >
                    <v-list-tile-action>
                        <v-avatar :size="30" color="grey lighten-4"> 
                            <img :src="i.icon">
                        </v-avatar> 
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ i.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    <v-container fluid full-height>
        <v-layout column>
    <!-- <div>
        <div style="max-width: 250px; margin: 50px; margin-bot: 5px;">
            <v-btn v-if="mainVersion" style="background-color: green" @click="$router.push('/playable/' + mainVersion._id)">{{ mainVersion.name }}</v-btn>
            <v-btn style="display: block; margin: 20px 0;" v-for="i in versions" @click="$router.push('/playable/' + i._id)">{{ i.name }}</v-btn>
        </div>
    </div> -->
    <v-toolbar flat color="transparent">
        <v-toolbar-title>{{ currversion.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat icon color="primary" @click="reloadPlay">
            <v-icon class="preroll" :class='{ "roll" : roll }'>replay</v-icon>
        </v-btn> 
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" @click="newVariation()">New Variation</v-btn>
            </template>
            <v-card style="height:10">
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout wrap >
                            <v-flex v-for="(i, j) in editedItem" v-if="j != 'mod_date' && j !='_id' && j != 'default'" :key="j" xs8>
                                <v-text-field v-model="editedItem[j]" :label="j"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
    <v-data-table 
        :headers="headers[currentHeader]"
        :items="tableItems"
        :loading="this.loading"
        class="elevation-1"
        :rows-per-page-items="[15,30,50,{text: '$vuetify.dataIterator.rowsPerPageAll', value:-1}]"
    >
    <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
            <tr @click="onTrClick($event, props)" :class="{'green lighten-4' : props.item.default }">
                <td v-for="(i, idxx) in props.item" v-if="idxx != 'default' && idxx != '_id'" :key="idxx" class="text-xs-left">{{ i }}</td>
                <td class="justify-end layout pl-4">
                    <v-icon small class="mr-2" v-if="props.item.default != true" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small v-if="props.item.default != true" @click="deleteItem(props.item)">delete</v-icon>
                </td>
            </tr>
        </template>
        <template v-slot:no-data>
            <!-- <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear> -->
            <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
            </v-alert>
        </template>
    </v-data-table>
    </v-layout>
    </v-container>
    </v-content>
</template>

<script>

    import axiosMixin from '../mixins/axios'

    import config from '../config.js'

    export default {

        data() {
                
            return {
                variation: undefined,
                style: undefined,
                playableName: undefined,
                portrait: true,
                playable: {},
                network: undefined,
                playables: [],
                versions: [],
                mainVersion: undefined,
                drawer: false,
                adduser: false,
                roll: false,
                right: null,
                usermenu: [
                    // { title: 'Profile' },
                    // { title: 'Settings' },
                    { title: 'Logout', action: this.logout }
                ],
                dialog: false,
                headers: {
                    users: [],
                    playables: [
                        { text: 'Name', align: 'left' },
                        { text: 'Actions', sortable: false, align: 'right' }
                    ],
                    versions: [
                        { text: 'Name', align: 'left' },
                        { text: 'Description' },
                        { text: 'Last Modified' },
                        { text: 'Actions', sortable: false, align: 'right' }
                    ]
                },
                tableItems: [],
                formTitle: '',
                editedItem: {},
                defaultItem: {},
                editedIndex: -1,
                currentHeader: undefined,
                currversion: {},
                loading: false
            }
        
        },
        mixins: [axiosMixin],
        methods: {
            resize() {
                this.drawer = !this.drawer
            },
            logout() {
                this.$store.commit('replaceState', {})
                this.$router.push('/login')
            },
            onTrClick(e, props) {
                if (e.target.tagName != 'TD') return
                this.$router.push('/playable/' + props.item._id)
            },
            reloadPlay() {
                this.roll = !this.roll
                this.refreshTable()
            },
            close () {
                this.dialog = false
                // setTimeout(() => {
                //     this.editedItem = Object.assign({}, this.defaultItem)
                //     this.editedIndex = -1
                // }, 300)
            },
            save () {
                // if (this.editedIndex > -1) {
                //     Object.assign(this.tableItems[this.editedIndex], this.editedItem)
                // } else {
                //     this.tableItems.push(this.editedItem)
                // }
                this.close()

                let data = {
                    find: { userid: this.$store.state.user._id },
                    ver_id: this.editedItem._id,
                    name: this.editedItem.name,
                    description: this.editedItem.description,
                    mod_date: new Date().toLocaleString()
                }
                this.sendRequest(data, '/editInfo', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        //console.log(res.data)
                        this.refreshTable()
                    }
                })
            },
             editItem (item) {
                this.editedIndex = this.tableItems.indexOf(item)
                this.editedItem = Object.assign({}, item)
                //console.log(this.editedItem)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.tableItems.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.tableItems.splice(index, 1)
                
                let data = {
                    find: {
                        userid: this.$store.state.user._id,
                        name: item.username,
                        _id: item._id
                    },
                    collection: 'versions'
                }

                this.sendRequest(data, '/deleteVersion', (res) =>{
                    if (res.err) {
                        console.log(err)
                        alert('Something wrong')
                    } else {
                        alert('Deleted')
                    } 
                })
            },
            getUsers() {
                let data = {
                    find: {
                        role: 'user',
                    }
                }
                
                this.sendRequest(data, '/getUsers', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        //console.log(res.data.users)
                        this.users = res.data.users
                    }
                })
            },
            async getPlayables() {
                let data = {
                    find: {
                        userid: this.$store.state.user._id
                    },
                    collection: 'playables'
                }

                this.sendRequest(data, '/getPlayables', (res) => {
                    if(res.err){
                        this.$router.push('/login')
                    } else {
                        //console.log(res.data)
                        this.playables = res.data.playables
                        this.currversion = this.playables[0]
                        //this.getPlayablesTable()
                        this.getPlayablesVersions()
                    }
                })
            },
            getPlayablesVersions(id) {
                //console.log(this.currversion._id)
                let _id; if (id) { _id = id } else { _id = this.currversion._id }

                let data = {
                    find:{
                        playableId: _id,
                        userid: this.$store.state.user._id,
                        //default: { $ne: true }
                    }
                }

                this.sendRequest(data, '/getVersions', (res) => {
                    if (res.data.err) {
                        console.log('err')
                    } else {
                        //console.log(res.data)
                        this.versions = res.data.versions
                        this.getPlayablesVersionsTable()
                    }
                })
            },
            getPlayablesVersionsTable() {
                this.currentHeader = 'versions'
                this.tableItems = []

                for (let i in this.versions) {
                    let func = 'push'; if (this.versions[i].default) func = 'unshift' 
                    this.tableItems[func]({
                        name: this.versions[i].name,
                        description: this.versions[i].description,
                        mod_date: this.versions[i].mod_date,
                        _id: this.versions[i]._id,
                        default: this.versions[i].default
                    })

                }
            
            },
            refreshTable() {
                this.tableItems = []
                this.getPlayablesVersions()
            },
            getTime() {
            //var time = new Date(2014, 1, 1)
            var time = new Date().toLocaleString()
            },
            newVariation() {
                for (let i in this.versions) {
                    if (this.versions[i].default == true) {
                        this.$router.push('/playable/' + this.versions[i]._id)
                    }
                }
            },
            test() {
                alert('not yet')
                //if (this.$refs.avatar.files.length) formData.append('File', this.$refs.avatar.files[0], this.$refs.avatar.files[0].name)
            }
        },
        
        mounted() {
            this.getPlayables()
        }
    }

</script>

