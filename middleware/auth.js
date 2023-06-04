import { User } from "../models/user.js"
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, resp, next) => {

    const { token } = req.cookies;

    if (!token) {
        return resp.status(404).json({
            success: false,
            message: "User not Loggedin",
        })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData._id);
    next();
}