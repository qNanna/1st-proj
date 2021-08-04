const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = require('./api/router')
const cors = require('cors')
const log = require('./api/controllers/logs')


app.use(express.urlencoded());
app.use(express.json());

app.use(cors())

router.init(app)

let port = process.env.port || 4300
http.listen(port, () => {
    console.clear()
    log.success(`App listening on port ${port}!`)
})
