import express from "express";
import passport from "passport";
import { OrderModel } from "../../database/allModels";

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
//         const newData = await OrderModel.create({
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

/*
*Route    /
*Desc     Get all orders by user id
*Params   _id
*Method   GET
*Access   Private
*/
Router.get("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const getOrders = await OrderModel.findOne({ user: user._id });
        if (!getOrders) {
            return res.status(404).json({ message: "No Orders found" });
        }
        return res.status(200).json({ orders: getOrders })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
*Route    /
*Desc     Get all orders by user id
*Params   _id
*Method   GET
*Access   Private
*/
Router.put(
    "/new",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { user } = req;

            const { orderDetails } = req.body;

            const addNewOrder = await OrderModel.findOneAndUpdate(
                {
                    user: user._id,
                },
                {
                    $push: {
                        orderDetails: orderDetails,
                    },
                },
                {
                    new: true,
                }
            );
            console.log(addNewOrder)
            return res.json({ Order: addNewOrder });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);



// /*
// *Route    /
// *Desc     Get Restaurant by city
// *Params   none
// *Method   GET
// *Access   Public
// */
// Router.get("", async (req, res) => {
//     try {

//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });

export default Router;

