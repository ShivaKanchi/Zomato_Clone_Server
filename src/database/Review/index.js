import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    food: { type: mongoose.Types.ObjectId, ref: "foods" },
    restaurant: { type: mongoose.Types.ObjectId, ref: "reviews" },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    isRestaurantReview: { type: Boolean, required: true },
    isFoodReview: { type: Boolean, required: true },
    photos: [{
        type: mongoose.Types.ObjectId, ref: "images"
    }]
}, {
    timestamps: true
})

export const ReviewModel = mongoose.model("reviews", ReviewSchema)