const express = require('express');
const authenticationController = require('./../controllers/authenticationController');
const familyController = require('./../controllers/familyController');
const router = express.Router();

router.get(
  '/myFamily',
  authenticationController.protect,
  familyController.getMyFamily
);
router.get(
  '/removeFamily',
  authenticationController.protect,
  familyController.removeFamily
);
router.get('/', familyController.getAllFamilies);
router.get('/:id', familyController.getFamily);
router.post(
  '/create',
  authenticationController.protect,
  familyController.createFamily
);
router.post(
  '/list/update',
  authenticationController.protect,
  familyController.updateList
);
router.post(
  '/joinFamily',
  authenticationController.protect,
  familyController.joinFamily
);
module.exports = router;
