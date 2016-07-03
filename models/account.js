var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String,
  organizationName: String,
  locationCode: String,
  userToken: { type: String, required: true },
  voteThreshold: Number,
  voteAvailableTime: Number
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
