var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vote = new Schema({
  username: { type: String, required: true },
  voteCode: { type: Number, required: true },
  voteDate: { type: Date, required: true }
});


module.exports = mongoose.model('Vote', Vote);
