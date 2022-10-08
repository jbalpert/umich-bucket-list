import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import eventRouter from "./routes/event";
import userRouter from "./routes/user";
import authRouter from "./routes/auth"
import path from "path";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

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
