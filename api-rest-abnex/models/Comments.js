const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  cars: {
    type: Schema.Types.ObjectId,
    ref: 'Cars',
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
