const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    name: {type: String, required: true },
    steps: {type: [String], required: true},
});

module.exports = mongoose.model('Guide', guideSchema);