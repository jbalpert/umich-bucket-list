import express from "express";
import { getUsers, getUserById, getUsersByEventId, createUser, updateUser, deleteUser } from "../controllers/user";

const router = express.Router();

router.route("/")
    .get(getUsers)
    .post(createUser);

router.route("/:id")
    .get(getUserById)
    .delete(deleteUser)
    .patch(updateUser);

router.route("/byevent/:eventid")
    .get(getUsersByEventId);

export default router;