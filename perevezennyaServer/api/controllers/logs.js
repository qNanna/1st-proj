const chalk = require('chalk')

class Log {
    error(content) {
        console.log(chalk.red('<!-----ERROR-----!>'))
        console.log(content)
        console.log(chalk.red('<!---------------!>'))
    }
    success(content) {
        console.log(chalk.green(content))
    }
    notice(content) {
        console.log(chalk.blue(content))
    }
}

module.exports = new Log()