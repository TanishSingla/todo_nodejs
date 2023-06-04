import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middleware/error.js";




export const register = async (req, resp) => {

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("Email Already Exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        resp.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Registered Successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const myDetails = (req, resp) => {
    resp.status(200).json({
        success: true,
        user: req.user,
    });
};

export const login = async (req, resp, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");


        if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));
        // if (!user) {
        //     return resp.status(404).json({
        //         success: false,
        //         message: "Invalid Email or Password",
        //     })
        // }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return resp.status(404).json({
                success: false,
                message: "Invalid Credentials",
            })
        }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        resp.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: `Welcome ${user.name}`,
        });

    } catch (error) {
        next(error);
    }
};

export const logout = async (req, resp) => {

    resp.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            message: "Logout Successfully",
        });

};






















// export const updateUser = async (req, resp) => {

//     const users = await User.find({});
//     // console.log(req.query);
//     resp.json({
//         success: true,
//         message: "Updated",
//     })
// };
// export const deleteUser = async (req, resp) => {

//     // const users = await User.find({});
//     // console.log(req.query);
//     resp.json({
//         success: true,
//         message: "Deleted",
//     })
// };


// export const forQuery = (req, resp) => {
//     let name = req.query.name;
//     let isAuthor = req.query.author;
//     resp.json({
//         name,
//         isAuthor,
//     });
// };

