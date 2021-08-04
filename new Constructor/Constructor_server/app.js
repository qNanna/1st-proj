const express = require('express');
const app = express();
const http = require('http').Server(app);
const db = require('./api/db')
const log = require('./api/controllers/logs')
const router = require('./api/router')
const cors = require('cors')
const fileUpload = require('express-fileupload')


db.init(() => {
    app.get('/', (req, res) => {
        res.send("AKSDASHDIASHIODHASIODH")
    })
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors())


    app.use(express.static('versions'))
    app.use(express.static('uploadfiles'))

    app.use(fileUpload())
    
    
    router.init(app)
    
    let port = 4300
    http.listen(port, () => {
        console.clear()
        log.success(`App listening on port ${port}!`)
        
    })
})