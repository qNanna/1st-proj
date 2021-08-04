const express = require('express')
const router = express.Router()
const { handleError } = require('../controllers/data')
const playableService = require('../controllers/playables')
const fileService = require('../controllers/files')

router.post('/showPlayable', async (req, res) => {
    try {
        let showedplayable = await playableService.showPlayable(req.body)
        res.json({showedplayable})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/apply', async (req, res) => {
    try {
        //console.log(req.body)
        let b1 = await fileService.createFolder(req.body)
        await fileService.changeFile(b1, {rule: 'GLOBAL_CHANGES', replacer: JSON.stringify(b1.config)}) 
        let data = await fileService.compileFile(b1)
        res.json({data})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.get('/download', async (req, res) => {
    try {
        var file = __dirname + `../../../${req.query.path}`
        res.download(file)
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/saveconf', async (req,res) => {
    try {
        await fileService.changeFile(req.body, {rule: 'GLOBAL_CHANGES', replacer: JSON.stringify(req.body.config)})
        let q = await fileService.saveconf(req.body)
        res.json({q})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

module.exports = router
