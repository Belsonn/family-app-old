const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event must have a name'],
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
    },
    allDay: {
      type: Boolean,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
