const express = require('express')
const router = express.Router()
const { handleError } = require('../controllers/data')
const TelegramService = require('../controllers/TelegramService')
const InstagramService = require('../controllers/InstagramService')

router.post('/sendTeltoTelegram', async (req, res) => {
    try {
        let msg = await TelegramService.sendMessage(req.body)
        res.json({msg})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/getPhotos', async (req, res) => {
    try {
        let photos = await InstagramService.getPhotos(req.body)
        res.json({photos})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

module.exports = router