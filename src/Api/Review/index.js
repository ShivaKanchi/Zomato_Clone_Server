import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/*
*Route    /create
*Desc     GET a Review of a restaurant
*Params   none
*Method   GET
*Access   Public
*/
Router.get("/:resid", async (req, res) => {
    try {
        const { resid } = req.params;
        const reviews = await ReviewModel.find({ restaurant: resid }).sort({
            createdAt: -1,
        });
        return res.json({ reviews });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


/*
*Route    /
*Desc     Post a review by a user id 
*Params   _id
*Method   Post
*Access   Private
*/
Router.post(
    "/new",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { _id } = req.user;
            const { reviewData } = req.body;

            const review = await ReviewModel.create({ ...reviewData, user: _id });

            return res.json({ review });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);




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
Router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;

            const data = await ReviewModel.findOneAndDelete({
                _id: id,
                user: user._id,
            });

            if (!data) {
                return res.json({ message: "Review didnt deleted" });
            }

            return res.json({ message: "Review was Deleted", data });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

export default Router;

