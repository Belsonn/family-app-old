const User = require('./../models/userModel');
const asyncCatch = require('./../utils/asyncCatch');
const globalError = require('./../utils/globalError');
const multer = require('multer');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './img')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })

  const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `${req.user.id}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`img/users/${req.file.filename}`);
  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((element) => {
    if (allowedFields.includes(element)) newObj[element] = obj[element];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = asyncCatch(async (req, res, next) => {
  let query = User.findById(req.params.id);
  const user = await query;

  res.status(200).json({
    status: 'success',
    data: {
      user,
      
    },
  });
});

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new globalError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};
