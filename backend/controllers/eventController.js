const asyncCatch = require('./../utils/asyncCatch');
const globalError = require('./../utils/globalError');
const Event = require('./../models/eventModel');
const Family = require('./../models/familyModel')

exports.addEvent = asyncCatch(async (req, res, next) => {
  let family = await Family.findById(req.body.family);
  if(!family) {
    return next(new globalError("No family found with id"));
  }
  const event = await Event.create(req.body);
  family.addNewEvent(event.id);
  res.status(201).json({
    status: 'success',
    data: {
      event,
      familyid: family._id
    },
  });
});

exports.getEvents = asyncCatch(async (req, res, next) => {
  const events = await Event.find({family: req.body.family} )

  if(!events) {
    return next(new globalError("No document found with id"));
  }

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    },
  });
})


exports.deleteEvent = asyncCatch(async (req, res, next) => {
  const family = await Family.findOne({events: {$gte: req.params.id}})
  if(!family) {
    return next(new globalError("No family found with id"));
  }
  await family.removeEvent(req.params.id);

  const event = await Event.findByIdAndDelete(req.params.id);
  if(!event) {
    return next(new globalError("No document found with id"));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
})
