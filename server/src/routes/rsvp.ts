import express from "express";
import { getRSVPs, getRSVPById, createRSVP, deleteRSVP } from "../controllers/rsvp";
const router = express.Router();
router.get("/", getRSVPs);
router.get("/:id", getRSVPById);
router.post("/", createRSVP);
router.delete("/:id", deleteRSVP);
export default router;