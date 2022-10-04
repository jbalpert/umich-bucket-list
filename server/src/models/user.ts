import mongoose from "mongoose";
import { Schema } from "mongoose";

// interface for the event model
export interface IUser extends mongoose.Document {
    _id?: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    google_id: string;
    profile_picture: string;
    phone?: string;
    created_at?: Date;
    events: Array<string>;
}

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
        match: [/^[a-zA-Z0-9_.+-]+@umich.edu$/, "Only umich.edu emails are allowed to login 〽️ Go BLUE!"],
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, "Must be a valid 10 digit phone number"],
    },
    google_id: {
        type: String,
        required: [true, "Google ID is required"],
        unique: [true, "Google ID already exists"],
    },
    profile_picture: {
        type: String,
        required: [true, "Profile picture is required"],
    },
    is_public: {
        type: Boolean,
        default: true,
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


const User = mongoose.model<IUser>("User", userSchema);
export default User;