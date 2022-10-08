import express from "express";
import { googleAuth, googleAuthRefresh } from "../controllers/auth";
const router = express.Router();

router.route("/google")
    .post(googleAuth);

router.route("/google/refresh")
    .post(googleAuthRefresh);

export default router;