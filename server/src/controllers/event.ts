import { Request, Response } from 'express';
import { getEventByIdService, getEventsService, createEventService, updateEventService, deleteEventService } from '../services/events';

// Get all events
export const getEvents = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, eventApproval } = req.query;
        const events = await getEventsService(eventApproval as string, startDate as string, endDate as string);
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
