const { Schema, model } = require('mongoose');

const filmShema = new Schema({
    name: { type: String, required: true, unique: true },
    genre: String
});

module.exports = model('Film', filmShema);