import express from "express";
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getEventsByUserId, rsvpEvent, unrsvpEvent } from "../controllers/event";

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(createEvent);

router.route('/:id')
    .get(getEventById)
    .delete(deleteEvent)
    .patch(updateEvent);

router.route('/byuser/:userid')
    .get(getEventsByUserId);

router.route('/:eventid/:userid/rsvp')
    .patch(rsvpEvent);

router.route('/:eventid/:userid/unrsvp')
    .patch(unrsvpEvent);

export default router;