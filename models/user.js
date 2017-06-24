var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {  
    type: String
  },
  name: {
    type: String
  },
  join_date: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) {
        return callback(err);
    }
    else {
      callback(null, isMatch);
    }
  });
};

module.exports.addUser = function(user, callback) {
  User.create(user, callback);
}