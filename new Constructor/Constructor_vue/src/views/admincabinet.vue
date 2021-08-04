<template>
    <v-content>
        <v-navigation-drawer class="blue darken-4" dark fixed app permanent :mini-variant="drawer">
            <v-toolbar height="128" flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile>
                        <v-list-tile-title v-if="!drawer" class="title">
                            Admin cabinet
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
                                        <v-avatar :size="37.5" color="grey lighten-4"> 
                                            <img src="https://advons.com/img/BigLogo.svg">
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
                            <v-list-tile-title>{{ pidor }}</v-list-tile-title>
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
                <v-list-tile ripple v-for="(item, i) in items" :key="i.title" @click="item.action" >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-container fluid fill-height>
            <v-layout column>
            <v-toolbar flat color="transparent">
                <v-btn icon @click="back">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>{{ currentHeader }}</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn flat icon color="primary" @click="reloadPlay">
                    <v-icon class="preroll" :class='{ "roll" : roll }'>replay</v-icon>
                </v-btn> 

                <template>
                    <v-dialog v-model="dialog4" max-width="500px">
                    <!-- <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Add user</v-btn>
                    </template> -->
                    <v-card style="height:10">
                        <v-card-title>
                        <span class="headline">qq</span>
                        </v-card-title>
            
                        <v-card-text>
                        <v-container grid-list-md fluid>
                            <v-layout wrap >
                            <v-flex v-for="(i, j) in editedItem" :key='j' xs8>
                                <v-text-field v-if="j != '_id' && j != 'Role' && j != 'userid' && j != 'mod_date' && j != 'default' " v-model="editedItem[j]" :label="j"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>
            
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog4 = false"> Cancel </v-btn>
                        <v-btn color="primary" flat @click="dialog4 = false; edit()"> Done </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </template>

                <template v-if="currentHeader == 'playables'">
                <!-- <div class="text-xs-center"> -->
                    <v-dialog v-model="dialog2" width="500">
                    <template v-slot:activator="{ on }">
                        <!-- <v-btn v-if="currentHeader == 'playables'" v-on="on" fab dark color="indigo" style="transform: scale(0.6)">
                            <v-icon dark>add</v-icon>
                        </v-btn> -->
                        <v-btn v-on="on" color="primary" dark>Add Project</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>Create project (Playable)</v-card-title>
                        <v-card-text>
                            <v-flex>
                                <v-text-field v-model="projName" @keydown="errorenter = false" :rules="loginRules" label='Name' required></v-text-field>
                            </v-flex>
                            <v-layout justify-space-between>
                                <input ref="icon" id="fileinp" type="file" multiple>
                                <v-tooltip style="display: none" max-width="200" top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="ml-3 help" color="primary" v-on="on">help</v-icon>
                                    </template>
                                    <span>Load playable icon</span>
                                </v-tooltip>
                            </v-layout>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog2 = false"> Cancel </v-btn>
                        <v-btn color="primary" flat @click="dialog2 = false; createProject()"> Done </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                <!-- </div> -->
                </template>

                <template v-if="currentHeader == 'versions'">
                    <v-dialog v-model="dialog3" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" color="green lighten-1" dark>Add Playable</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>Create playable</v-card-title>
                        
                        <v-layout v-if='loadexec' style='height: 180px' align-center justify-center> 
                            <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
                        </v-layout> 

                        <v-layout v-if='loadexec == false' column>  
                        <v-card-text>
                            <v-flex>
                                <v-text-field v-model="projName" @keydown="errorenter = false" :rules="loginRules" label='Name' required></v-text-field>
                            </v-flex>
                            <v-layout justify-space-between>
                                <input ref="project" id="fileinp" type="file" multiple>
                                <v-tooltip style="display: none" max-width="200" top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="ml-3 help" color="red" v-on="on">error</v-icon>
                                    </template>
                                    <span>Load playable project in archive. Only zip archive</span>
                                </v-tooltip>
                            </v-layout>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog3 = false"> Cancel </v-btn>
                        <v-btn color="primary" flat @click="createPlayable()"> Done </v-btn>
                        </v-card-actions>
                        </v-layout>
                    </v-card>
                    </v-dialog>
                </template>

                <template v-if="currentHeader == 'users'">
                <v-dialog v-model="dialog" max-width="500px">
                    <template  v-slot:activator="{ on }">
                        <v-btn  color="primary" dark class="mb-2" v-on="on" @click="formttl = 'Create new user'; editedItem = { role : 'user' }">Add User</v-btn>
                    </template>
                    <v-form ref='container' v-model="valid" @submit.prevent="register" lazy-validation>
                    <v-card style="height:10">
                        <v-card-title class="headline grey lighten-2" primary-title>{{ formttl }}
                        </v-card-title >
                        <v-card-text>
                        <v-container grid-list-md fluid>
                            <v-layout wrap >
                            <!-- <v-flex v-for="(i, j) in editedItem" v-if="j !='_id'" :key='j' xs8>
                                <v-text-field v-model="editedItem[j]" :label="j"></v-text-field>
                            </v-flex> -->
                            <v-flex>
                                <v-text-field v-model="editedItem.username" @keydown="errorenter = false" :rules="loginRules" label='Username' required></v-text-field>
                                <v-text-field v-model="editedItem.password" @keydown="errorpassword = false" :rules="passRules" type="password" label='Password' required></v-text-field>
                                    <v-radio-group v-model="editedItem.role">
                                        <v-radio value='user'  label='User' color='cyan' ></v-radio> 
                                        <v-radio value='admin' label='Admin' color='cyan' ></v-radio>
                                    </v-radio-group>
                                    <v-layout justify-space-between>
                                        <input ref="avatar" id="fileinp" type="file" multiple>
                                        <v-tooltip style="display: none" max-width="200" top>
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="ml-3 help" color="primary" v-on="on">help</v-icon>
                                            </template>
                                            <span>Load playable icon</span>
                                        </v-tooltip>
                                    </v-layout>
                                
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>
            
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat type='submit'>Add</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-form>
                </v-dialog>
                </template>                
                
            </v-toolbar>
            <v-data-table
                :headers="headers[currentHeader]"
                :items="tableItems"
                class="elevation-1"
                :rows-per-page-items="[15,30,50,{text: '$vuetify.dataIterator.rowsPerPageAll', value:-1}]"
                :disable-initial-sort="true"
            >
                <template v-slot:items="props">
                    <tr @click="onTrClick($event, props)" :class="{ 'green lighten-4' : props.item.default }">
                        <td v-for="(i, idxx) in props.item" v-if="idxx != 'default' && idxx != '_id'" :key="idxx" class="text-xs-left" >{{ i }}</td>
                        <td class="justify-end layout pl-4" >
                            <v-icon small class="mr-2" @click="editItem(props.item); dialog4 = true">edit</v-icon>
                            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                        </td>
                    </tr>
                </template>
                <template v-slot:no-data>
                    <!-- <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear> -->
                    <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
                    <v-alert :value="true" color="red lighten-3" icon="warning">
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
                currentHeader: 'users',
                username: undefined,
                password: undefined,
                role: undefined,
                variation: undefined,
                style: undefined,
                playableName: undefined,
                portrait: true,
                playable: {},
                network: undefined,
                playables: [],
                versions: [],
                mainVersion: undefined,
                newuser: undefined,
                file: undefined,
                users: [],
                usersplayables: [],
                visible: false,
                roll: false,
                uploadvisible : false,
                confvisible: false,
                userplayables: [],
                configurations: {},
                config: {},
                drawer: false,
                adduser: false,
                formttl: undefined,
                lastprop: {},
                items: [
                    { title: 'Users', icon: 'directions_walk', action: this.getUsers },
                    { title: 'Playables', icon: 'videogame_asset', action: this.getUsersPlayables },
                    { title: 'Versions', icon: 'settings_ethernet', action: this.getAllVersions }
                ],
                right: null,
                usermenu: [
                    // { title: 'Profile' },
                    // { title: 'Settings' },
                    { title: 'Logout', action: this.logout }
                ],
                dialog: false,
                dialog2: false,
                dialog3: false,
                dialog4: false,
                headers: {
                    users: [
                        { text: 'Username', align: 'left', value: 'username' },
                        { text: 'Password', sortable: false },
                        { text: 'Role', value: 'Role' },
                        { text: 'Actions', sortable: false, align: 'right' }
                    ],
                    playables: [
                            { text: 'name', sortable: false },
                            { text: 'userid', sortable: false },
                            { text: 'Actions', sortable: false, align: 'right' }
                    ],
                    versions: [
                        { text: 'Name' },
                        { text: 'Description' },
                        { text: 'Last Modified' },
                        { text: 'Actions', sortable: false, align: 'right' },
                    ]
                },
                tableItems: [],
                editedItem: {},
                defaultItem: {},
                editedIndex: -1,
                defaultversion: false,
                pidor: undefined,
                errorenter: false,
                errorpassword: false,
                loginRules: [
                    v => !!v || 'No data',
                    () => this.errorenter 
                ],
                passRules: [
                    v => !!v || 'Please enter your password',
                    () => this.errorpassword
                ],
                valid: true,
                projName: undefined,
                Usr : {},
                loadexec : false
            }          
        },
        mixins: [axiosMixin],
        methods: {
            validate() {
                return this.$refs.container.validate()
            },
            resize() {
                this.drawer = !this.drawer
            },
            logout() {
                this.$store.commit('replaceState', {})
                this.$router.push('/login')
            },
            reloadPlay() {
                this.roll = !this.roll
                this.lastprop._id ? this.refreshTable(this.lastprop) : this.refreshTable()
            },
            onTrClick(e, props) {
                if (e.target.tagName != 'TD') return

                switch(this.currentHeader) {
                    case 'users':
                        this.lastprop.user = props.item
                        this.getUsersPlayables(e, this.lastprop)
                        break
                    case 'playables':
                        this.lastprop.playable = props.item
                        this.getUsersVersions(e, this.lastprop)
                        break
                    case 'versions':
                        this.$router.push('/playable/' + props.item._id)
                        break
                    default:
                        alert('chto za header?')
                        break
                }    
            },
            back () {
                this.currentHeader == 'versions' ? this.currentHeader = 'playables' : this.currentHeader == 'playables' ? this.currentHeader = 'users' : this.currentHeader = 'users'
                this.refreshTable(this.lastprop)
            },
            close () {
                this.dialog = false
                this.dialog2 = false
                this.dialog3 = false
                this.dialog4 = false
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
            },
            editItem(item) {
                console.log(item)
                this.editedIndex = this.tableItems.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog4 = true
                
            },
            edit() {
                let data = {
                    find: {
                        _id: this.editedItem._id
                    },
                    update: {},
                    collection: this.currentHeader
                }
                switch(this.currentHeader) {
                    case 'users':
                        data.update = {
                            username: this.editedItem.username,
                            password: this.editedItem.password
                        }
                        break
                    case 'playables':
                        data.update = {
                            name: this.editedItem.name
                        }
                        break
                    case 'versions':
                        data.update = {
                            name: this.editedItem.name,
                            description: this.editedItem.description,
                            mod_date: new Date().toLocaleString()
                        }
                        break
                    default:
                        alert('?')
                        break
                }
                //console.log(data)
                this.sendRequest(data, '/edit', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        this.dialog4 = false
                        this.refreshTable(this.lastprop)
                    }
                })
            },
            test() {
                alert('not yet')
            },
            deleteItem (item) {

                const index = this.tableItems.indexOf(item)
+                confirm('Are you sure you want to delete this item?') && this.tableItems.splice(index, 1)

                let data = {
                    find: {
                        //name: item.username,
                        _id: item._id
                    },
                    collection: this.currentHeader
                }

                this.sendRequest(data, '/deleteVersion', (res) =>{
                    if (res.err) {
                        console.log(err)
                        alert('Something wrong')
                    } else {
                        if (res.data.deleted.n != 0 || res.data.deleted.deletedCount != 0) {
                            console.log(res.data.deleted)
                            //this.refreshTable(this.lastprop)
                            alert('Deleted')
                        } else {
                            alert('Something wrong')
                        }
                    }
                })
            },
            register() {
                console.log(this.editedItem)

                this.errorenter = false
                if (!this.validate()) return 

                let formData = new FormData();
                formData.append('username', this.editedItem.username)
                formData.append('password', this.editedItem.password)
                formData.append('role', this.editedItem.role)
                if (this.$refs.avatar.files.length) formData.append('File', this.$refs.avatar.files[0], this.$refs.avatar.files[0].name)

                this.sendRequestForm(formData, '/createUser', (res) => {
                    if (res.err) {
                        console.log(err)
                        this[`error${res.err.errorObject}`] = res.err.message
                        this.validate()
                    } else {
                        console.log(res.data)
                        if (res.data.register == undefined) { alert('uje sushestvuet/chtoto poshlo ne tak'); /*location.reload()*/ }
                        console.log('registered ', res.data.register)
                        this.newuser = res.data.register
                        this.close()
                        this.refreshTable()
                    }
                })
            },
            createProject() {

                let formData = new FormData()
                formData.append('name', this.projName)
                formData.append('userid', this.lastprop.user._id)
                formData.append('username', this.lastprop.user.username)
                if (this.$refs.icon.files.length) formData.append('File', this.$refs.icon.files[0], this.$refs.icon.files[0].name)

                this.sendRequestForm(formData, '/createProject', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        console.log(res.data)
                        this.loadexec = false
                        this.refreshTable(this.lastprop)
                    }
                })
            },
            createPlayable() {
                this.loadexec = true

                let formData = new FormData();
                formData.append('name', this.projName)
                formData.append('playableId', this.lastprop.playable._id)
                formData.append('userid', this.lastprop.playable.userid)
                if (this.$refs.project.files.length) formData.append('File', this.$refs.project.files[0], this.$refs.project.files[0].name)

                this.sendRequestForm(formData, '/createPlayable', (res) => {
                    if (res.err) {
                        console.log(err)
                        alert('Something wrong')
                        this.$router.go()
                    } else {
                        console.log(res.data)
                        if (res.data.n) {
                            this.loadexec = false
                            this.close()
                            this.refreshTable(this.lastprop)
                        }
                    }
                })
            },
            getUsers() {
                this.tableItems = []
                this.currentHeader = 'users'
                let data = {
                    find: {
                        role: 'user',
                    }
                }
                
                this.sendRequest(data, '/getUsers', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        this.users = res.data.users
                        this.getUsersTable(this.users)
                         
                    }
                })
            },
            getUsersPlayables(e, param) {
                this.currentHeader = 'playables'
                this.tableItems = []
                this.userplayables = []
                this.mainVersion = undefined

                let data = {
                    find: {
                        userid: param ? param.user._id : undefined
                    },
                    collection: 'playables'
                }

                this.sendRequest(data, '/getUserPlayables', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        console.log(res.data)
                        this.playables = res.data.usersplayables
                        this.getUsersPlayablesTable(this.playables)
                    }
                })
            },
            getUsersVersions(e, id) {
                this.tableItems = []
                this.currentHeader = 'versions'

                let data = {
                    find: { 
                        playableId: id.playable,
                    },
                    collection: 'versions'
                }

                this.sendRequest(data, '/getUsersVersions', (res) => {
                    if (res.err) {
                        console.log(err)
                    } else {
                        console.log(res.data)
                        this.userplayables = res.data.userversions
                        this.getUserVersionsTable(this.userplayables)
                    }
                })
            },
            getAllVersions() {
                this.tableItems = []
                this.currentHeader = 'versions'


                let data = {
                    find: {},
                    collection: 'versions'
                }

                this.sendRequest(data, '/getAllVersions', (res) => {
                    if (res.err) {
                        console.log('err')
                    } else {
                        console.log(res.data.allVersions)
                        let playables = res.data.allVersions

                        for (let i in playables) {
                            this.tableItems.push({
                                username: playables[i].name,
                                default: playables[i].default,
                                description: playables[i].description,
                                mod_date: playables[i].mod_date,
                                _id: playables[i]._id
                            })
                        }
                     } 
                })
            },
            getUsersTable(users) {
                this.currentHeader = 'users'
                for (let i in users) this.tableItems.push({
                    username: users[i].username,
                    password: users[i].password,
                    _id: users[i]._id,
                    Role: users[i].role,                   
                }) 
            },
            getUsersPlayablesTable(playables) {
                this.loadingTable = true
                this.currentHeader = 'playables'

                    for (let i in playables) { 
                        this.tableItems.push({
                            name: playables[i].name,
                            userid: playables[i].userid,     
                            _id: playables[i]._id   
                        }) 
                    }
            },
            getUserVersionsTable(playables) {
                this.tableItems = []
                this.currentHeader = 'versions'
            
                for (let i in playables) {
                    let func = 'push'; if (playables[i].default) func = 'unshift' 
                    this.tableItems[func]({
                        name: playables[i].name,
                        description: playables[i].description,
                        mod_date: playables[i].mod_date,
                        _id: playables[i]._id,
                        default: playables[i].default
                    })

                }
                
            },
            refreshTable(lastprop) {
                this.tableItems = []

                switch(this.currentHeader) {
                    case 'users':
                        this.getUsers()
                        break
                    case 'playables':
                        this.getUsersPlayables('', lastprop)
                        break
                    case 'versions':
                        this.getUsersVersions('', lastprop)
                        break
                    default:
                        alert('chto za header?')
                        break
                }
            },
        },

        mounted() {
                this.getUsers()
                this.pidor = this.$store.state.user.username
            }
    }

</script>


<style>

</style>