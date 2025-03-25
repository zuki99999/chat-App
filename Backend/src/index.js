import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
dotenv.config();
import {connectDb} from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors";


const port = process.env.PORT;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use(cors({
    origin:"http://localhost:5173",
    credential:true
}));



app.listen(port,()=>{
    console.log(`server started on port ${port}`);
    connectDb();
});