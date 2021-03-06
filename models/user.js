var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require ('custom-env').env('secret')
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    hash: String,
    salt: String
})

userSchema.methods.setPassword = pw => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(pw, this.salt, 1000, 64, 'sha512').toString('hex');
};


userSchema.methods.validPassword = pw => {
    var hash = crypto.pbkdf2Sync(pw, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, 'secret'); 
  };

userSchema.methods.toAuthJson = () =>{
    return {
        _id : this._id,
        email: this.email,
        token: this.generateJWT()
    }    
}
module.exports = mongoose.model('Users', userSchema);
