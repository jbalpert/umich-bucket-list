import mongoose from "mongoose";
import { Schema } from "mongoose";
const rsvpSchema = new Schema({
    event_id: String,
    user_id: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Rsvp = mongoose.model("Rsvp", rsvpSchema);
export default Rsvp;