const mongoose = require('mongoose');

let postModel = new mongoose.Schema({
    name: String,
    autor: String
});

module.exports = mongoose.model('Post',postModel);
