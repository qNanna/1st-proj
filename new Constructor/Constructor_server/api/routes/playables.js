const express = require('express')
const router = express.Router()
const { handleError } = require('../controllers/data')
const playableService = require('../controllers/playables')

router.post('/getPlayables', async (req, res) => {
    try {
        let playables = await playableService.getPlayables(req.body)
        res.json({playables})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/getVersions', async(req, res) => {
    try {
        let versions = await playableService.getVersions(req.body)
        res.json({versions})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/deleteVersion', async(req,res) => {
    try {
        let deleted = await playableService.deleteVersion(req.body)
        res.json({deleted})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/editInfo', async (req,res) => {
    try {
        //console.log(req.body)
        let inf = await playableService.saveinfo(req.body)
        res.json({inf})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})


module.exports = router
