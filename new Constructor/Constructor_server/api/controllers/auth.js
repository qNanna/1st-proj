const dbOp = require('./dbOp')
const uniqid = require('uniqid')


class Auth {
    async login(data) {
        try {
            let obj = {
                find: {
                    username: data.username
                },
                collection: 'users'
            }
            let doc = await dbOp.findDoc(obj)
            if (!doc) 
                throw {
                    errorCode: 721,
                    code: 404,
                    errorObject: 'username',
                    message: 'User not found'
                }
            let result = data.password == doc.password
            if (!result)
                throw {
                    errorCode: 721,
                    code: 403,
                    errorObject: 'password',
                    message: 'Incorrect password'
                }
            doc.token = this.generateToken(1)
            await doc.save()
            return doc
        } catch (err) {
            throw err
        }
    }

    generateToken(num) {
        let token = ''
        for (let i = 0; i < num; i++) token += uniqid()
        return token
    }
}

module.exports = new Auth()