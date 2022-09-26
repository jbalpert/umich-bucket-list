import mongoose from "mongoose";
import { Schema } from "mongoose";
const rsvpSchema = new Schema({
    event_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Rsvp = mongoose.model("Rsvp", rsvpSchema);
export default Rsvp;