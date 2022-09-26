import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const User = mongoose.model("User", userSchema);
export default User;