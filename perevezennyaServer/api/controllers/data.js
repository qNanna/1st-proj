const log = require('./logs')

class Data {        
    handleError(err) {
        log.error(err)
        return err.errorCode == 721 ? err : { 
            code: 500, 
            message: 'System error' 
        }
    }
}

module.exports = new Data()