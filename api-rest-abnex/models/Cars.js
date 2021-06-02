const mongoose = require('mongoose');

const CarsSchema = mongoose.Schema({
    mark: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Cars', CarsSchema);