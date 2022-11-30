"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));
var _allModels = require("../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const GoogleStrategy = _passportGoogleOauth.default.Strategy;
var _default = passport => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      fullname: profile.displayName,
      email: profile.emails[0].value,
      //primary email
      profilePic: profile.photos[0].value //profile pic
    };

    try {
      const user = await _allModels.UserModel.findOne({
        email: newUser.email
      }); //does user already exits
      if (user) {
        const token = user.generateJwtToken();
        done(null, {
          user,
          token
        });
      } else {
        const user = await _allModels.UserModel.create(newUser);
        const token = user.generateJwtToken();
        done(null, {
          user,
          token
        });
      }
    } catch (error) {
      done(error, null);
    }
  }));
  passport.serializeUser((userData, done) => done(null, _objectSpread({}, userData))); //serialize the data to proper format
  passport.deserializeUser((id, done) => done(null, id));
};
exports.default = _default;