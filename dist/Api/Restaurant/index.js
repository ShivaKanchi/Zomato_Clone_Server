"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../database/allModels");
var _restaurant = require("../../Validation/restaurant.Validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Router = _express.default.Router();

/*
*Route    /create
*Desc     create a Order
*Params   none
*Method   POST
*Access   Public
*/
Router.post("/create", async (req, res) => {
  try {
    const {
      data
    } = req.body;
    const newData = await _allModels.RestaurantModel.create(_objectSpread({}, data));
    return res.status(201).json({
      success: true,
      Order: newData
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /
*Desc     Get Restaurant by city
*Params   none
*Method   GET
*Access   Public
*/
Router.get("/", async (req, res) => {
  try {
    //https://localhost:4000/restuarant/?city=mumbai
    const {
      city
    } = req.query;
    //  await ValidateRestaurantCity(req.query);
    const restuarants = await _allModels.RestaurantModel.find({
      city
    });
    if (restuarants.length === 0) return res.status(404).json({
      error: `No Restaurants found in ${city}`
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
*Desc     Get Restaurant by id
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/:_id", async (req, res) => {
  try {
    //https://localhost:4000/restuarant/?city=mumbai
    const {
      _id
    } = req.params;
    const restuarant = await _allModels.RestaurantModel.findById({
      _id
    });
    if (!restuarant) return res.status(404).json({
      error: `No Restaurants found with id ${_id}`
    });
    return res.json({
      restuarant
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
    // await ValidateSearchString(req.params);
    const restuarants = await _allModels.RestaurantModel.find({
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
var _default = Router;
exports.default = _default;