import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
    },
    first_name: {
        type: String,
        trim: true,
        required: [true, "First name is required"],
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        match: [/^[a-zA-Z0-9_.+-]+@umich.edu$/, "Must be a valid umich email"]
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, "Must be a valid 10 digit phone number"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});

const User = mongoose.model("User", userSchema);
export default User;