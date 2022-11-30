import mongoose from "mongoose";

export default async () => {

    return mongoose.connect(process.env.MONGODB_URI)
}