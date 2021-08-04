const checkAuth = require('./middlewares/checkAuth')
const checkRole = require('./middlewares/checkRole')

const auth = require('./routes/auth')
const playables = require('./routes/playables')
const showplayable = require('./routes/showplayable')
const admincabinet = require('./routes/admincabinet')


class Router {
    init(app) {
        checkAuth(app)
        checkRole(app)
        app.use('/', auth)
        app.use('/', playables)
        app.use('/', showplayable)
        app.use('/', admincabinet)
    }
}

module.exports = new Router()