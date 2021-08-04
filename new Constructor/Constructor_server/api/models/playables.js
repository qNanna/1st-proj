const { Schema, model } = require('mongoose')

const playables = new Schema({
    name: { type: String, required: true },
    userid: { type: String, required: true },
    url: { type: String, required: false },
    path: { type: String, required: false },
    icon: { type: String, required: false }
}, {
    versionKey: false
})

module.exports = model('playables', playables)