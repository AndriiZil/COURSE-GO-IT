const { Schema, model, Types: { ObjectId } } = require('mongoose');

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
    favouriteFilms: [{ type: ObjectId, ref: 'Film' }]
});

module.exports = model('User', UserSchema);
