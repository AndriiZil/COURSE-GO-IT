const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, requred: true, enum: ['created', 'verified' ], default: 'created' },
    verificationToken: { type: String, default: '', required: false }
});

module.exports = model('user', UserSchema);
