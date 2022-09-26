import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    created_by: String, // user id
});

const Event = mongoose.model('Event', eventSchema);
export default Event;