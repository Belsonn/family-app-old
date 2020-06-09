const express = require('express');
const authenticationController = require('./../controllers/authenticationController');
const eventController = require('./../controllers/eventController');
const router = express.Router();

router.post(
  '/create',
  authenticationController.protect,
  eventController.addEvent
);
router.post('/', authenticationController.protect, eventController.getEvents);
router.delete('/:id', authenticationController.protect, eventController.deleteEvent);
module.exports = router;
