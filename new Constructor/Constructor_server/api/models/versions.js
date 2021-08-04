const { Schema, model } = require('mongoose')

const versions = new Schema({
    playableId: { type: String, required: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, requerid: true },
    userid: { type: String, required: true},
    config_path: { type: String, required: false },
    configurations: { type: Object, required: false},
    config: { type: Object, required: false },
    default: { type: Boolean, required: false},
    mod_date: { type: String, required: false},
    description: { type: String, required: false}
}, {
    versionKey: false
})

module.exports = model('versions', versions)