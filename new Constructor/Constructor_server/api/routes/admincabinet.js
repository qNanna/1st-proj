const express = require('express')
const router = express.Router()
const { handleError } = require('../controllers/data')
const usersService = require('../controllers/users')
const fileService = require('../controllers/files')
const playableService = require('../controllers/playables')

router.post('/createUser', async (req, res) => {
    try {
        let register = await usersService.createUser(req.body, req.files)
        res.json({register})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/getUsers', async (req, res) => {
    try {
        //console.log("admin: /getUsers")
        let users = await usersService.getUsers(req.body)
        res.json({users})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/upload', async (req, res) => {
    try {
        let uploaded = await fileService.uploadFile(req.body, req.files)
        res.json({uploaded})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/edit', async (req, res) => {
    try {
        let f = await playableService.edit(req.body)
        res.json({f})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/applydefconf', async (req, res) => {
    try {
        await fileService.applydefconf(req.body)
        res.json({done: 'done'})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/getUserPlayables', async (req, res) => {
    try {
        let usersplayables = await usersService.getUserPlayables(req.body)
        res.json({usersplayables}) 
    } catch (err) {
        res.json({err: handleError(err)})
    }
}) 

router.post('/getUsersVersions', async (req,res) => {
    try {
        //console.log(req.body)
        let userversions = await playableService.getVersions(req.body)
        res.json({userversions})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/getAllVersions', async (req, res) => {
    try {
        let allVersions = await playableService.getAllVersions(req.body)
        res.json({allVersions})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/createProject', async (req, res) => {
    try {
        let n = await playableService.createProject(req.body, req.files)
        res.json({n})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

router.post('/createPlayable', async (req, res) => {
    try{
        await fileService.uploadPlayable(req.body, req.files, (n) => {
            res.json({n})
        })
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

module.exports = router