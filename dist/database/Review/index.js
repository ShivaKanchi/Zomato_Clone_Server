"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ReviewSchema = new _mongoose.default.Schema({
  food: {
    type: _mongoose.default.Types.ObjectId,
    ref: "foods"
  },
  restaurant: {
    type: _mongoose.default.Types.ObjectId,
    ref: "reviews"
  },
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: "users"
  },
  rating: {
    type: Number,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  isRestaurantReview: {
    type: Boolean,
    required: true
  },
  isFoodReview: {
    type: Boolean,
    required: true
  },
  photos: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  }]
}, {
  timestamps: true
});
const ReviewModel = _mongoose.default.model("reviews", ReviewSchema);
exports.ReviewModel = ReviewModel;