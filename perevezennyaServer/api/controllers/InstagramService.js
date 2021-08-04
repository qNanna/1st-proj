const log = require('./logs')
const Instagramq = require('instagram-web-api')
const InstagramApi = new Instagramq({ username: '', password: '' }, { language: 'es-CL' })

var photos; var i = 0; var j = 0;

;(async () => {
    try { 
        //await InstagramApi.login() //InstagramApi.credentials.username
        console.log(await InstagramApi.login())

        // setTimeout(async()=>{
        //     let me = await InstagramApi.getUserByUsername({ username: 'buzinskij' }) 
        //     photos = await InstagramApi.getPhotosByUsername({ username: 'buzinskij' })
        //     photos.me = me.profile_pic_url_hd
        //     log.notice(`${j++} ${photos} : ${new Date().toLocaleString()}`)
        // },3000)

        setInterval(async() => {
            let me = await InstagramApi.getUserByUsername({ username: 'buzinskij' }) 
            photos = await InstagramApi.getPhotosByUsername({ username: 'buzinskij' })
            photos.me = me.profile_pic_url_hd
            log.notice(`${j++} ${photos} : ${new Date().toLocaleString()}`)
        },(1000 * 60 * 60) / 2) // ever 30 minutes 

    } catch(err){
        throw err
    }
})()

class Instagram {
    async getPhotos(data) {
        try {
            log.notice(`${i++} : ${data.log}`)          
            return photos 
        } catch (err) {
            throw err
        }
    }
}

module.exports = new Instagram()
