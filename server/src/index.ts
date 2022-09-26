import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRouter from "./routes/event";
import rsvpRouter from "./routes/rsvp";
import userRouter from "./routes/user";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/v1/api/event", eventRouter);
app.use("/v1/api/rsvp", rsvpRouter);
app.use("/v1/api/user", userRouter);
// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
