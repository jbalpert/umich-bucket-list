import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    end_date: {
        type: Date,
        required: [true, 'End date is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    approvedEvent: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rsvps: [
        {
            created: {
                type: Date,
                default: new Date(),
            },
            userid: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
});

const Event = mongoose.model('Event', eventSchema);
export default Event;