import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: String,
    description: String,
    start_date: String,
    end_date: String,
    location: String,
    image: String,
    approved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;