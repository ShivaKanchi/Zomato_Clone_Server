import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { ImageModel } from "../../database/allModels";
import { s3Upload } from "../../Util/s3";
const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
*Route    /:_id
*Desc     Get a Image
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/:_id", async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params._id);
        // console.log(req.params._id);
        return res.json({ image });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

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
            ACL: "public-read", // Access Control List
        };

        const uploadImage = await s3Upload(bucketOptions);

        const dbUpload = await ImageModel.create({
            images: [
                {
                    location: uploadImage.Location,
                },
            ],
        });

        return res.status(200).json({ dbUpload });
    } catch (error) {
        return res.status(500).json({ error: error.message });
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

export default Router;

