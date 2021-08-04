<template>
    <v-container fluid fill-height d-flex align-center class="loginbg">
        <v-layout row align-center justify-center>
            <div class="logcard">
                <v-card>
                    <v-form ref="form" v-model="valid" @submit.prevent="loginUser" lazy-validation>
                        <v-container fluid>
                            <v-layout row justify-center>
                                <v-flex xs10>
                                    <h3 class="display-1 mb-0 text-center">Playable constructor</h3>
                                </v-flex>
                            </v-layout>
                            <v-layout row justify-center>
                                <v-flex xs12 sm10>
                                    <v-text-field @keydown="errorusername = false" color="blue" v-model="login" :rules="loginRules" type="text" label="Username" required></v-text-field>
                                    <v-text-field @keydown="errorpassword = false" color="blue" v-model="password" :rules="passRules" type="password" label="Password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row justify-center>
                                <v-flex xs10 class="text-center">
                                    <v-btn color="info blue" type="submit">Login</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card>
            </div>
        </v-layout>
    </v-container>
</template>

<script>

    import axiosMixin from '../mixins/axios'
    import config from '../config.js'

    export default {
        data() {
            return {
                login: undefined,
                password: undefined,
                errorpassword: false,
                errorusername: false,
                loginRules: [
                    v => !!v || 'Please enter your username',
                    () => this.errorusername
                    
                ],
                passRules: [
                    v => !!v || 'Please enter your password',
                    () => this.errorpassword
                ],
                valid: true
            }
        },

        mixins: [axiosMixin],
        methods: {
            validate () {
                return this.$refs.form.validate()
            },
            loginUser () {
                this.errorpassword = false
                this.errorusername = false
                if (!this.validate()) return 

                let data = {
                    'username': this.login,
                    'password': this.password
                }

                this.sendRequest(data, '/login', (res) => {
                    var {data} = res
                    if (data.err) {
                        console.log(data.err)
                        this[`error${data.err.errorObject}`] = data.err.message
                        this.validate()
                    } else {
                        //console.log(data.user)
                        this.$store.commit('replaceState', data.user)
                        if (data.user.role == 'admin') {
                            this.$router.push('/admincabinet')
                        } else {
                            this.$router.push('/cabinet')
                        }
                        
                    }
                })

            }
        },
        mounted() {
            
        }
    }
</script>