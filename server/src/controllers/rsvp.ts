import { Request, Response } from "express";
import { getRSVPByIdService, getRSVPsService, createRSVPService, deleteRSVPService } from "../services/rsvp";

// Get all RSVPs
export const getRSVPs = async (req: Request, res: Response) => {
    try {
        // get query params from request
        const { start_date, end_date } = req.query;
        const rsvps = await getRSVPsService(start_date as string, end_date as string);
        res.status(200).json(rsvps);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Get an RSVP by id
export const getRSVPById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rsvp = await getRSVPByIdService(id);
        res.json(rsvp);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Create an RSVP
export const createRSVP = async (req: Request, res: Response) => {
    const rsvp = req.body;
    try {
        const newRSVP = await createRSVPService(rsvp);
        res.status(201).json(newRSVP);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

// Delete an RSVP
export const deleteRSVP = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRSVP = await deleteRSVPService(id);
        res.status(200).json(deletedRSVP);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}
