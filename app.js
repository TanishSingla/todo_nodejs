import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js"
import { dbConnect } from "./models/connectDb.js";
import { config } from "dotenv";
import taskRouter from "./routes/taskRoute.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

config({
    path: "./config/config.env"
});
dbConnect();
const app = express();


app.get("/", (req, resp) => {
    resp.send(`<h1>Working</h1>`);
})
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);
app.use(cors())
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

//using routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server Running on PORT:  ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})