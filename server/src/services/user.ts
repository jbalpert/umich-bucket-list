import User from "../models/user";
import Event from "../models/event";
import mongoose from "mongoose";

// Crud Operations --> Create, Read One/ Read Many, Update, Delete <--

export const getUserByIdService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No user with that id");
    const user = await User.findById(id);
    return user;
}

export const getUsersService = async () => {
    const users = await User.find();
    return users;
}

export const getUsersByEventIdService = async (eventId: string) => {
    // return all users based on event id in events array
    const users = await User.find({ events: eventId });
    return users;
}


export const createUserService = async (user: any) => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
}

export const updateUserService = async (id: string, user: any) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No user with that id");
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
}

export const deleteUserService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No user with that id");
    const deletedUser = await User.findByIdAndRemove(id);
    // Delete event rvsp by userid
    const deletedUserRsvp = await Event.updateMany({}, { $pull: { rsvps: { userid: id } } });
    return { deletedUser, deletedUserRsvp };
}

export const getUserByEmailService = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
}

export const getUserByGoogleIdService = async (googleId: string) => {
    const user = await User.findOne({ googleId });
    return user;
}

