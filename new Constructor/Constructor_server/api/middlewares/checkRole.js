const { handleError } = require('../controllers/data')
const log = require('../controllers/logs')

module.exports = app => {
    app.use((req, res, next) => {
        try {
            let data = req.query.token ? req.query : req.body
            let event = req.query.token ? req._parsedUrl.pathname : req.url
            data.user = data.user || {}
            let role = data.user.role || 'guest'
            let roleEv = RBAC[role].events
            let isAllowed = roleEv.some((el) => {
                if (el.name == event) return el.when ? el.when(data) : true
            })

            if (isAllowed) next()
            else throw {
                errorCode: 721,
                code: 403,
                message: 'Access Denied'
            }
        } catch(error) {
            throw handleError(error)
        }
    })
}




const RBAC = {
    admin: {
        events: [{ name: '/login' }, { name: '/getPlayables' }, { name: '/getVersions' }, { name: '/showPlayable' }, { name: '/apply' }, { name: '/createUser' }, 
                 { name: '/upload' }, { name: '/getUsers' }, { name: '/getUserPlayables' }, { name: '/download' }, { name: '/getUsersVersions' }, 
                 { name: '/getUsersDefaultVersion' }, { name: '/applydefconf' }, {name: '/getAllVersions'}, { name: '/deleteVersion' }, { name: '/editInfo' },
                 { name: '/createProject' }, { name: '/createPlayable' }, { name: '/saveconf' }, { name: '/edit' }]
    },
    user: {
        events: [{ name: '/login' }, { name: '/getPlayables', when: getPlayablesUser }, { name: '/getVersions', when: getPlayablesUser }, 
                 { name: '/showPlayable', when: getPlayablesUser }, { name: '/apply'}, { name: '/download' }, { name: '/deleteVersion', when: getPlayablesUser }, 
                 { name: '/editInfo', when: getPlayablesUser }, { name: '/saveconf' }]
    },
    guest: {
        events: [{ name: '/login' }]
    }
}


function getPlayablesUser(data) {
    // console.log(data.user._id)
    // console.log(data.find.userid)
    //if (data.user._id == data.find.userid) { log.success(data.user._id + ' --> ' + data.find.userid) } else { log.err(data.user._id + ' --> ' + data.find.userid) }
    return data.user._id == data.find.userid
}
