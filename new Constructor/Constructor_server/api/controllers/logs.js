const chalk = require('chalk')

class Log {
    error(content) {
        console.log(chalk.red('<!-----ERROR-----!>'))
        console.log(content)
        console.log(chalk.red('<!---------------!>'))
    }
    err(content) {
        console.log(chalk.red(content))
    }
    success(content) {
        console.log(chalk.green(content))
    }
    notice(content) {
        console.log(chalk.blue('<!-----NOTICE-----!>'))
        console.log(content)
        console.log(chalk.blue('<!----------------!>'))
    }
}

module.exports = new Log()