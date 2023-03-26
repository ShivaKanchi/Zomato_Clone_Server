"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/*
*Route    /
*Desc     Get User details authorized
*Params   token
*Method   GET
*Access   Private
*/
Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      email,
      fullname,
      phone,
      address
    } = req.user;
    return res.json({
      user: {
        email,
        fullname,
        phone,
        address
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /search/:searchstring
*Desc     Get Restaurant by searchstring
*Params   none
*Method   GET
*Access   Public
*/
Router.get("/search/:searchstring", async (req, res) => {
  try {
    //https://localhost:4000/restuarant/?city=mumbai
    const {
      searchstring
    } = req.params;
    const restuarants = await RestaurantModel.find({
      name: {
        $regex: searchstring,
        $options: "i"
      }
    });
    if (!restuarants.length === 0) return res.status(404).json({
      error: `No Restaurants found with name ${searchstring}`
    });
    return res.json({
      restuarants
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /:_id
*Desc     Get User data (For Review)
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const User = await _allModels.UserModel.findById(_id);
    if (!User) {
      return res.status(500).json({
        error: "User Not Found "
      });
    }
    const {
      fullname
    } = User;
    return res.json({
      User
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /:_id
*Desc     Update User data (For Review)
*Params   _id
*Method   PUT
*Access   Public
*/
Router.put("/update/:_id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const {
      userData
    } = req.body;
    userData.password = undefined;
    const updateUserData = await _allModels.UserModel.findByIdAndUpdate(_id, {
      $set: userData
    }, {
      new: true
    });
    return res.json({
      user: updateUserData
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;