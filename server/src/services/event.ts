import Event from '../models/event';
import User from '../models/user';
import mongoose from 'mongoose';
// Crud Operations --> Create, Read One/ Read Many, Update, Delete <--

export const getEventByIdService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error('No event with that id');
    const event = await Event.findById(id);
    return event;
}

// Get all events filter by date range denoted by start_date and end_date, default is set to get all upcoming events
export const getEventsService = async (approval?: string, startDate?: string, endDate = "12/12/3000") => {
    const events = await Event.find({
        start_date: { $gte: startDate, $lte: endDate },
        // if approval is true return all approved events, if false return all unapproved events, else return all events
        approval: approval === "true" ? true : approval === "false" ? false : { $in: [true, false] },
    });
    if (!events) throw Error('No events found');
    return events;
}

// Get all events that a user has RSVP'd to
export const getEventsbyUserRsvpService = async (userId: string) => {
    // query the events table for rsvp events by user id
    const events = await Event.find({ rsvps: { $elemMatch: { userid: userId } } });
    if (!events) throw Error('No events found');
    return events;
}


export const createEventService = async (event: any) => {
    const newEvent = new Event(event);
    await newEvent.save();
    return newEvent;
}

export const rsvpService = async (eventId: string, userId: string) => {
    // check if userId exists
    if (!mongoose.Types.ObjectId.isValid(userId)) throw Error('No user with that id');
    if (!mongoose.Types.ObjectId.isValid(eventId)) throw Error('No event with that id');
    // check if user has already rsvp'd to event
    const hasRsvped = await Event.findOne({ _id: eventId, rsvps: { $elemMatch: { userid: userId } } });
    if (hasRsvped) throw Error('User has already RSVP to this event');

    const rsvp = { userid: userId, rsvpDate: new Date().toISOString() };
    const event = await Event.updateOne({ _id: eventId }, { $push: { rsvps: rsvp } });
    // update the user table to add the event id to the user's rsvp list
    const user = await User.updateOne({ _id: userId }, { $push: { events: eventId } });
    return { event, user };
}

export const unrsvpService = async (eventId: string, userId: string) => {
    // remove the event id from the user's rsvp list
    if (!mongoose.Types.ObjectId.isValid(userId)) throw Error('No user with that id');
    if (!mongoose.Types.ObjectId.isValid(eventId)) throw Error('No event with that id');

    // if the user doesn't have an rsvp for the event, return an error
    const hasRsvped = await User.findOne({ _id: userId, events: eventId });
    if (!hasRsvped) throw Error('User has not RSVPd to this event');

    const user = await User.updateOne({ _id: userId }, { $pull: { events: eventId } });
    // remove the user id from the event's rsvp list
    const event = await Event.updateOne({ _id: eventId }, { $pull: { rsvps: { userid: userId } } });
    return { event, user };
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
