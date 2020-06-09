const mongoose = require('mongoose');
const User = require('./userModel');
const crypto = require('crypto');
//const ShortUniqueId = require('short-unique-id');

const familySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Family must have a name'],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    groceries: {
      type: [String],
      default: []
    },
    toDoList: {
      type: [String],
      default: []
    },
    inviteToken: {
      type: String,
      uppercase: true
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

familySchema.pre(/^find/, function (next) {
  this.select('-__v');
  this.populate({
    path: 'users',
    select: '-family',
  });
  next();
});

familySchema.methods.addUserToFamily = async function (userId) {
  this.users.push(userId);
  await this.save();
  return;
};

familySchema.methods.removeUserFromFamily = async function (userId) {
  this.users.splice(this.users.indexOf(userId), 1);
  await this.save();
  return;
};

familySchema.methods.addNewEvent = async function (eventId) {
  if(!this.events) {
    this.events = [];
  }
  this.events.push(eventId);
  await this.save();
  return;
};
familySchema.methods.removeEvent = async function (eventId) {
  this.events.splice(this.events.indexOf(eventId), 1);
  await this.save();
  return;
};


familySchema.pre('save', function (next) {
  if (this.isNew) {
    this.inviteToken = crypto.randomBytes(3).toString('hex');
    this.events = [];
  }
  next();
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
