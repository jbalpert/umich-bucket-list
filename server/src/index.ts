import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRouter from "./routes/events";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/v1/api/events", eventRouter);
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
