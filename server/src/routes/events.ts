import express from "express";
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../controllers/events";
const router = express.Router();
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
export default router;