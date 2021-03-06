const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('./recommendation');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: 'This field is required' },
  lastName: { type: String, required: 'This field is required' },
  image: { type: String },
  email: { type: String, required: 'This field is required', unique: true },
  password: { type: String, required: 'This field is required' },
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, {
  id: false
});

userSchema.virtual('followers', {
  localField: '_id',
  foreignField: 'following',
  ref: 'User'
});

userSchema.virtual('recommendations', {
  localField: '_id',
  foreignField: 'creator',
  ref: 'Recommendation'
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordsMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
