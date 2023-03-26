"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Router = _express.default.Router();

/*
*Route    /create
*Desc     GET a Review of a restaurant
*Params   none
*Method   GET
*Access   Public
*/
Router.get("/:resid", async (req, res) => {
  try {
    const {
      resid
    } = req.params;
    const reviews = await _allModels.ReviewModel.find({
      restaurant: resid
    }).sort({
      createdAt: -1
    });
    return res.json({
      reviews
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /
*Desc     Post a review by a user id 
*Params   _id
*Method   Post
*Access   Private
*/
Router.post("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    const {
      reviewData
    } = req.body;
    const review = await _allModels.ReviewModel.create(_objectSpread(_objectSpread({}, reviewData), {}, {
      user: _id
    }));
    return res.json({
      review
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// /*
// *Route    /create
// *Desc     create a Review
// *Params   none
// *Method   POST
// *Access   Public
// */
// Router.post("/create", async (req, res) => {
//     try {
//         const { data } = req.body;
//         const newData = await ReviewModel.create({
//             ...data
//         });
//         return res.status(201).json({
//             success: true,
//             Order: newData
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

/**
 * Route     /delete/:id
 * Des       Delete a users review
 * Params    _id
 * Access    Private
 * Method    Delete
 */
Router.delete("/delete/:id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      id
    } = req.params;
    const data = await _allModels.ReviewModel.findOneAndDelete({
      _id: id,
      user: user._id
    });
    if (!data) {
      return res.json({
        message: "Review didnt deleted"
      });
    }
    return res.json({
      message: "Review was Deleted",
      data
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;