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

export const getRSVPsService = async (eventId?: string, userId?: string) => {
    const attendees = await Rsvp.aggregate([
        // {
        //     $match: {
        //         event_id: eventId,
        //         user_id: userId
        //     }
        // },
        {
            $lookup: {
                from: "Users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        }
    ]);
    return attendees;
}

export const getUsersEventsService = async (userId: string) => {
    // get all events that user has RSVP'd to
    const events = await Rsvp.aggregate([
        {
            $match: {
                user_id: userId
            }
        },
        {
            $lookup: {
                from: "events",
                localField: "event_id",
                foreignField: "_id",
                as: "event"
            }
        }
    ]);
    return events;
}

export const createRSVPService = async (rsvp: any) => {
    // check if user has already RSVP'd
    const existingRSVP = await Rsvp.findOne({ event_id: rsvp.event_id, user_id: rsvp.user_id });
    if (existingRSVP) throw Error("You have already RSVP'd to this event");
    // check if event exists
    const event = await (rsvp.event_id);
    if (!event) throw Error("No event with that id");
    const newRSVP = new Rsvp(rsvp);
    await newRSVP.save();
    return newRSVP;
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