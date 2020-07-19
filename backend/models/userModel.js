const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Family = require('./familyModel');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name.'],
      minlength: 3
    },
    email: {
      type: String,
      required: [true, 'User must provide an email.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Provide a valid email.'],
    },
    photo: {
      type: String,
      default: 'default.jpg'
    },
    role: {
      type: String,
      enum: ['admin', 'parent', 'children'],
    },
    password: {
      type: String,
      required: [true, 'User must provide a password.'],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'User must confirm password'],
      validate: {
        validator: function (pass) {
          return pass === this.password;
        },
        message: 'Passwords must be the same',
      },
    },
    role: {
      type: String,
      enum: ['parent', 'children']
    },
    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
  },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

userSchema.pre(/^find/, function (next) {
  this.select("-__v");
  // this.populate({
  //   path: 'family', 
  //   select: '_id name'
  // });
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.pre(/^find/, function (next) {
//   // this points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
