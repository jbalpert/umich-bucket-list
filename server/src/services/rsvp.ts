import Rsvp from "../models/rsvp";
import mongoose from "mongoose";
import { getEventByIdService } from "../services/events";

// Crud Operations --> Create, Read One/ Read Many, Update, Delete <--

export const getRSVPByIdService = async (id: string) => {
    // if event doesn't exist throw error
    const event = await getEventByIdService(id);
    if (event) throw Error("No RSVP with that id");
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No RSVP with that id");
    const rsvp = await Rsvp.findById(id);
    return rsvp;
}

export const getRSVPsService = async (id?: string) => {
    // join event and rsvp collections
    const rsvps = await Rsvp.find(
        id ? { event_id: id } : {},
        null,
        { sort: { createdAt: -1 } }
    );
    return rsvps;
}

export const createRSVPService = async (rsvp: any) => {
    const newRSVP = new Rsvp(rsvp);
    await newRSVP.save();
}

export const updateRSVPService = async (id: string, rsvp: any) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No RSVP with that id");
    const updatedRSVP = await Rsvp.findByIdAndUpdate(id, rsvp, { new: true });
    return updatedRSVP;
}

export const deleteRSVPService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No RSVP with that id");
    const deletedRSVP = await Rsvp.findByIdAndRemove(id);
    return deletedRSVP;
}