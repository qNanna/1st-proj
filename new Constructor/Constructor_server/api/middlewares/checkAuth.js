const dbOp = require('../controllers/dbOp')
const { handleError } = require('../controllers/data')
const dontNeedAuth = [ '/login' ]
const log = require('../controllers/logs')
module.exports = app => {
    app.use( async (req, res, next) => {
        let data = req.query.token ? req.query : req.body
        try {
            if (dontNeedAuth.indexOf(req.url) > -1) {
                next()
                return
            }
            let obj = {
                find: {
                    _id: data._id,
                    token: data.token
                },
                collection: 'users'
            }
            let user = await dbOp.findDoc(obj)
            if (!user) 
                throw {
                    errorCode: 721,
                    code: 403,
                    msg: 'Auth required'
                }
            data.user = user           
            next()
        } catch (error) {
            throw handleError(error)
        }
    })
}