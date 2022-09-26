import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user";
const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
export default router;