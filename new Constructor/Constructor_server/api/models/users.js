const { Schema, model } = require('mongoose')
const { generateToken } = require('../controllers/auth')

const user = new Schema({
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
    avatar: { type: String, required: false },
    token: { type: String, default: generateToken(1) }
}, {
    versionKey: false
})

module.exports = model('users', user)