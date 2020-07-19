const User = require('./../models/userModel');
const Family = require('./../models/familyModel');
const asyncCatch = require('./../utils/asyncCatch');
const globalError = require('./../utils/globalError');

exports.getFamily = asyncCatch(async (req, res, next) => {
  const family = await Family.findById(req.params.id);
  if (!family) {
    return next(new globalError('No document found with id.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      family,
    },
  });
});

exports.removeFamily = asyncCatch(async (req, res, next) => {
  const family = await Family.findOne({ users: { $gte: req.user.id } });
  family.removeUserFromFamily(req.user.id);
  let user = await User.findByIdAndUpdate(
    req.user.id,
    { family: undefined },
    {
      new: true,
    }
  );
  res.status(203).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getAllFamilies = asyncCatch(async (req, res, next) => {
  const family = await Family.find();
  res.status(200).json({
    status: 'success',
    results: family.length,
    data: {
      family,
    },
  });
});

exports.createFamily = asyncCatch(async (req, res, next) => {
  let family = await Family.create(req.body);
  let user = await User.findByIdAndUpdate(req.user.id, { family: family });
  family.addUserToFamily(user.id);
  res.status(201).json({
    status: 'success',
    data: {
      family,
    },
  });
});

exports.joinFamily = asyncCatch(async (req, res, next) => {
  const token = req.body.token;
  const family = await Family.findOne({ inviteToken: token });
  if (!family) {
    return next(new globalError('You provided wrong token'));
  }
  let user = await User.findByIdAndUpdate(req.user.id, { family: family });
  family.addUserToFamily(req.user.id);
  res.status(201).json({
    status: 'success',
    data: {
      family,
    },
  });
});

exports.getMyFamily = asyncCatch(async (req, res, next) => {
  const family = await Family.findById(req.user.family);
  if (!family) {
    return next(new globalError('You dont have registered family yet.'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      family,
    },
  });
});

exports.updateList = async (req, res, next) => {
  const family = await Family.findById(req.user.family);
  if (!family) {
    return next(new globalError('You dont have registered family yet.'));
  }
  const listName = req.body.listName
  if(listName === 'groceries'){
    family.groceries = req.body.listContent
  } else if (listName === 'toDoList') {
    family.toDoList = req.body.listContent
  } else {
    return next(new globalError('Wrong list provided.'))
  }
  family.save();
  res.status(200).json({
    status: 'success',
    data: {
      family,
    },
  });
}
