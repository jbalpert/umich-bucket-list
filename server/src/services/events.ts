import Event from '../models/events';
import mongoose from 'mongoose';

// Crud Operations --> Create, Read One/ Read Many, Update, Delete <--

export const getEventByIdService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error('No event with that id');
    const event = await Event.findById(id);
    return event;
}

export const getEventsService = async () => {
    const events = await Event.find();
    return events;
}

export const createEventService = async (event: any) => {
    const newEvent = new Event(event);
    await newEvent.save();
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
