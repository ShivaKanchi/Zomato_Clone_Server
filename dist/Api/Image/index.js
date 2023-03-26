"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _multer = _interopRequireDefault(require("multer"));
var _allModels = require("../../database/allModels");
var _s = require("../../Util/s3");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
const storage = _multer.default.memoryStorage();
const upload = (0, _multer.default)({
  storage
});

/*
*Route    /:_id
*Desc     Get a Image
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/:_id", async (req, res) => {
  try {
    const image = await _allModels.ImageModel.findById(req.params._id);
    // console.log(req.params._id);
    return res.json({
      image
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/*
*Route    /:_id
*Desc     Upload a Image to s3 bucket and save link to mongoDB
*Params   _id
*Method   POST
*Access   Public
*/
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucketOptions = {
      Bucket: "zomato-clone-shivakanchi",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" // Access Control List
    };

    const uploadImage = await (0, _s.s3Upload)(bucketOptions);
    const dbUpload = await _allModels.ImageModel.create({
      images: [{
        location: uploadImage.Location
      }]
    });
    return res.status(200).json({
      dbUpload
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// /*
// *Route    /:_id
// *Desc     Upload many Images to s3 bucket and save link to mongoDB
// *Params   _id
// *Method   POST
// *Access   Public
// */
// Router.post("/", upload.array('file', 4), async (req, res) => {
//     try {
//         const file = req.files;
//         const bucketOptions = {
//             Bucket: "zomato-clone-shivakanchi",
//             Key: file.originalname,
//             Body: file.buffer,
//             ContentType: file.mimetype,
//             ACL: "public-read"
//         }
//         const uploadImage = await s3Upload(bucketOptions);
//         const dbUpload = await ImageModel.create({
//             images: [{
//                 location: uploadImage.Location
//             }]
//         })
//         return res.status(200).json({ uploadImage });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

// /*
// *Route    /create
// *Desc     create a Image
// *Params   none
// *Method   POST
// *Access   Public
// */
// Router.post("/create", async (req, res) => {
//     try {
//         const { data } = req.body;
//         const resCreate = await ImageModel.create({
//             ...data
//         });
//         return res.status(201).json({
//             success: true,
//             images: data
//         }); } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })
var _default = Router;
exports.default = _default;