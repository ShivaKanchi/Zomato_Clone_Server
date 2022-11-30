"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  address: [{
    detail: {
      type: String
    },
    for: {
      type: String
    }
  }],
  phone: [{
    type: Number
  }]
}, {
  timestamps: true
});

//attachments of model
//signing a token /creating
UserSchema.methods.generateJwtToken = function () {
  return _jsonwebtoken.default.sign({
    user: this._id.toString()
  }, "ZomatoClone");
};

//helper functions
//to check if this data exists or not

//email and phone check
UserSchema.statics.findByEmailAndPhone = async ({
  email,
  phone
}) => {
  const checkUserByEmail = await UserModel.findOne({
    email
  });
  const checkUserByPhone = await UserModel.findOne({
    phone
  });
  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already existed with this fields...");
  }
  return false;
};

//email and password check
UserSchema.statics.findByEmailAndPassword = async ({
  email,
  password
}) => {
  const user = await UserModel.findOne({
    email
  });
  if (!user) throw new Error("User does not exist...");
  const doesPasswordMatch = await _bcryptjs.default.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Wrong ceredentials...");
  return user;
};

//hasing password
UserSchema.pre('save', function (next) {
  const user = this;
  //password is encrypted here
  if (!user.isModified('password')) return next();
  //generate bcrypt salt
  _bcryptjs.default.genSalt(8, (error, salt) => {
    if (error) return next(error);
    _bcryptjs.default.hash(user.password, salt, (error, hash) => {
      if (error) return next(arrow);
      //asssigning hashed password
      user.password = hash;
      return next();
    });
  });
});
const UserModel = _mongoose.default.model("users", UserSchema);
exports.UserModel = UserModel;