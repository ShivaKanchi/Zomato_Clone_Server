import express from "express";

import { MenuModel } from "../../database/allModels";

const Router = express.Router();


// /*
// *Route    /create
// *Desc     create a Order
// *Params   none
// *Method   POST
// *Access   Public
// */
// Router.post("/create", async (req, res) => {
//     try {
//         const { data } = req.body;
//         const newData = await MenuModel.create({
//             ...data
//         });
//         return res.status(201).json({
//             success: true,
//             Order: newData
//         }); } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

/*
*Route    /list
*Desc     Get Menu by id
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await MenuModel.findById(_id)
        return res.status(201).json({
            success: true,
            menus
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
*Route    /image
*Desc     Get Menu Images
*Params   _id
*Method   GET
*Access   Public
*/
Router.get("/image/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menuImages = await MenuModel.findByid(_id)
        if (!menuImages) {
            return res.status(404).json({ message: "No menu images found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;

