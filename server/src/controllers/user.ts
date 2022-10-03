import { Request, Response } from "express";
import { getUsersService, getUserByIdService, getUsersByEventIdService, createUserService, deleteUserService, updateUserService } from "../services/user";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Get a user by id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        res.json(user);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Get all the users that have RSVP'd to an event
export const getUsersByEventId = async (req: Request, res: Response) => {
    const { eventid } = req.params;
    try {
        const rsvps = await getUsersByEventIdService(eventid);
        res.status(200).json(rsvps);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Create a user
export const createUser = async (req: Request, res: Response) => {
    const user = req.body;
    try {
        const newUser = await createUserService(user);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    const { id: _id } = req.params;
    const user = req.body;
    try {
        const updatedUser = await updateUserService(_id, user);
        res.status(201).json(updatedUser);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserService(id);
        res.json(deletedUser);
    }
    catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}
