<script>

import config from '../config'

export default {
    methods: {
        sendRequest(data, to, callback) {
            if (!this.$store.state.user) this.$store.state.user = {}
            data._id = this.$store.state.user._id
            data.token = this.$store.state.user.token

            this.axios
                .post(`${config.domain}${to}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if (res.data.code == 157) {
                        this.$store.commit('replaceState', {})
                        this.$router.push('/login')
                        return
                    }
                    callback(res)
                })
        },
        sendRequestForm(formData, to, callback) {
            if (!this.$store.state.user) this.$store.state.user = {}
            formData.append('_id', this.$store.state.user._id)
            formData.append('token', this.$store.state.user.token)

            this.axios
                .post(`${config.domain}${to}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    if (res.data.code == 157) {
                        this.$store.commit('replaceState', {})
                        console.log(res.err)
                        return
                    }
                    callback(res)
                })
        }
    }
}
</script>
