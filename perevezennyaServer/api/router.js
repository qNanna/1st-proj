const routes = require('./routes/routes')

class Router {
    init(app) {
        app.use('/', routes)
    }
}

module.exports = new Router()