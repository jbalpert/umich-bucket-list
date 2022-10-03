import { Request, Response } from 'express';
import { getEventByIdService, getEventsService, getEventsbyUserRsvpService, createEventService, rsvpService, unrsvpService, updateEventService, deleteEventService, } from '../services/event';

// Get all events ensure typescript types are correct
export const getEvents = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, approval } = req.query;
        const events = await getEventsService(approval as string, startDate as string, endDate as string);
        res.status(200).json(events);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Get an event by id
export const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const event = await getEventByIdService(id);
        res.json(event);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Get all events that a user has RSVP'd to
export const getEventsByUserId = async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
        const events = await getEventsbyUserRsvpService(userid);
        res.status(200).json(events);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Create an event
export const createEvent = async (req: Request, res: Response) => {
    const event = req.body;
    try {
        const newEvent = await createEventService(event);
        res.status(201).json(newEvent);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

// RSVP to an event
export const rsvpEvent = async (req: Request, res: Response) => {
    const { eventid, userid } = req.params;
    try {
        const rsvp = await rsvpService(eventid, userid);
        res.status(201).json(rsvp);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

export const unrsvpEvent = async (req: Request, res: Response) => {
    const { eventid, userid } = req.params;
    try {
        const unrsvp = await unrsvpService(eventid, userid);
        res.status(201).json(unrsvp);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
    const { id: _id } = req.params;
    const event = req.body;
    try {
        const updatedEvent = await updateEventService(_id, event);
        res.status(201).json(updatedEvent);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedEvent = await deleteEventService(id);
        res.json(deletedEvent);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}
