"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../database/allModels");
var _common = require("../../Validation/common.Validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

// /*
// *Route    /create
// *Desc     create a Food
// *Params   none
// *Method   POST
// *Access   Public
// */
// Router.post("/create", async (req, res) => {
//     try {
//         const { data } = req.body;
//         const resCreate = await FoodModel.create({
//             ...data
//         });
//         return res.status(201).json({
//             success: true,
//             restaurant: data
//         }); } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

/*
*Route    /:_id
*Desc     Get Food by id
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const food = await _allModels.FoodModel.findById(_id);
    if (!food) return res.status(404).json({
      error: `No Food found`
    });
    return res.json({
      food
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /r/:_id
*Desc     Get Food by Restaurant id
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/r/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const foods = await _allModels.FoodModel.find({
      restaurant: _id
    });
    if (foods.length === 0) return res.status(404).json({
      error: `No Food found with in that restaurant`
    });
    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /c/:category
*Desc     Get Food by category
*Params   category
*Method   GET
*Access   Public
*/
Router.get("/c/:category", async (req, res) => {
  try {
    const {
      category
    } = req.params;
    const foods = await _allModels.FoodModel.find({
      category: {
        $regex: category,
        $options: "i"
      }
    });
    if (foods.length === 0) return res.status(404).json({
      error: `No Food Mactched with ${category}`
    });
    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;