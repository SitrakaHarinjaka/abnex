const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarsSchema = new Schema({
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
    },
    postComments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
});

module.exports = mongoose.model('Cars', CarsSchema);