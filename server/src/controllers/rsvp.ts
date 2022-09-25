import { Request, Response } from "express";
import RSVP from "../models/rsvp";
import mongoose from "mongoose";
import { getRSVPByIdService, getRSVPsService, createRSVPService, deleteRSVPService } from "../services/rsvp";

// Get all RSVPs
export const getRSVPs = async (req: Request, res: Response) => {
    try {
        // get query params from request
        const { event_id } = req.query;
        const rsvps = await getRSVPsService(event_id as string);
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
    // check if user has already RSVP'd
    const existingRSVP = await RSVP.findOne({ event_id: rsvp.event_id, user_id: rsvp.user_id });
    if (existingRSVP) return res.status(409).json({ message: "You have already RSVP'd to this event" });
    // check if event exists
    const event = await (rsvp.event_id);
    if (!event) return res.status(404).json({ message: "No event with that id" });

    const newRSVP = new RSVP(rsvp);
    try {
        await newRSVP.save();
        res.status(201).json(newRSVP);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

// Delete an RSVP
export const deleteRSVP = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No RSVP with that id");
    const rsvp = await RSVP.findByIdAndRemove(id);
    res.json(rsvp);
}
