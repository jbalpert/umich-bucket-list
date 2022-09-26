import Event from '../models/event';
import { getRSVPsService } from './rsvp';
import mongoose from 'mongoose';

// Crud Operations --> Create, Read One/ Read Many, Update, Delete <--

export const getEventByIdService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error('No event with that id');
    const event = await Event.findById(id);
    return event;
}

// Get all events filter by date range denoted by start_date and end_date, default is set to get all upcoming events
export const getEventsService = async (eventApproval: string, startDate?: string, endDate = "12/12/3000") => {
    const events = await Event.find({
        start_date: {
            $gte: startDate || new Date().toISOString(),
            $lte: endDate
        },
        approved: eventApproval
    });

    return events;
}

export const createEventService = async (event: any) => {
    const newEvent = new Event(event);
    await newEvent.save();
    return newEvent;
}

export const updateEventService = async (id: string, event: any) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error('No event with that id');
    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
    return updatedEvent;
}

export const deleteEventService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error('No event with that id');
    const deletedEvent = await Event.findByIdAndRemove(id);
    return deletedEvent;
}
