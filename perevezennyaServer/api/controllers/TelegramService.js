const uniqid = require('uniqid')
const log = require('./logs')
const Telegramq = require('telegram-bot-api');
const TelegramApi = new Telegramq({ token: '1044607009:AAFWfkNL0bk3bdGsO_vUh1mnCFi7zXR7CFk', updates: { enabled: true } })

;(async () => { 
    try{ 
        console.log(await TelegramApi.getMe()) 
        await TelegramApi.sendMessage({ chat_id: '-1001183413908', text: `\nstartApi: ${new Date().toLocaleString()}`})
    } catch(err) {
        throw err
    }
})()

class Telegram {
    async sendMessage(data) {
        try {
            let localDate = new Date().toLocaleString()
            await TelegramApi.sendMessage({ chat_id: '-1001183413908', text: `id: ${getNumber(4)} \ncreated: ${localDate} \n \nname: ${data.name} \nsurname: ${data.surname} \nphone: ${data.phone} \nfrom: ${data.from} \nto: ${data.to} \ndate: ${data.date}`})
        } catch (err) {
            throw err
        }
    }
}

function getNumber(num) {
    let token = ''
    for (let i = 0; i < num; i++) token += getRandomInt(10)
    return token
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
        

module.exports = new Telegram()