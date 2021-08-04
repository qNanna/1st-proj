const express = require('express')
const router = express.Router()
const { handleError } = require('../controllers/data')
const authService = require('../controllers/auth')

router.post('/login', async (req, res) => {
    try {
        let user = await authService.login(req.body)
        res.json({user})
    } catch (err) {
        res.json({err: handleError(err)})
    }
})

module.exports = router