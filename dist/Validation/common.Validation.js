"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateId = exports.validateCategory = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validateId = id => {
  const Schema = _joi.default.object({
    _id: _joi.default.string().required()
  });
  return Schema.validateAsync(id);
};
exports.validateId = validateId;
const validateCategory = category => {
  const Schema = _joi.default.object({
    category: _joi.default.string().required()
  });
  return Schema.validateAsync(id);
};

// //to check common string validation
// export const validRequiredString = (string) => {
//     const Schema = joi.object({
//       string: joi.string().required(),
//     });
//     return Schema.validateAsync(string);
//   };
exports.validateCategory = validateCategory;