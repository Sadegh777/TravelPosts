const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
    type: String,
    required: 'A username is required',
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: 'An email is required',
    unique: true,
    match: [/.+@.+\..+/, 'Must match be an email'],
  },
  password: {
    type: String,
    required: 'Add your password',
    minlength: 6,
  },
  Memories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Memory',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;