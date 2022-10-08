import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Make rsvp typescript safe
export interface IRsvp {
    _id: string;
    created: Date;
    userid: string;
}

// Make model typescript friendly
export interface IEvent extends mongoose.Document {
    _id?: string;
    title: string;
    description: string;
    location: string;
    start_date: Date;
    end_date: Date;
    rsvps: Array<IRsvp>;
    approval: boolean;
    creator: string;
    image_url: string;
    created_at?: Date;
}

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
    approval: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
    image_url: {
        type: String,
        required: true,
        default: "https://www.collegeevaluator.com/images/institute/170976-university-of-michigan-ann-arbor.jpg"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: "6338e2c6630f55761758f55a", // Jon's ID
    },
    rsvps: [
        {
            created: {
                type: Date,
                default: new Date(),
            },
            userid: {
                type: Schema.Types.ObjectId,
                required: [true, "userid is required"],
                ref: 'User',
            },
        },
    ],
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;