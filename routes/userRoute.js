import express from "express";
import { login, register, myDetails, logout } from "../controllers/user.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = express.Router();


//to do list
router.post("/register", register);
router.post("/login", login);
router.get("/me", isLoggedIn, myDetails);
router.get("/logout", logout)



























// router.get("/query", forQuery);


//params
//this is dynamic url :id means ,
//it can take any id and we can access it by id.
//we should use dynamic route in last.
//becoz lets say we have created another route
// /userid/special if we use this route before dynamic route
//then this special route will hit
//but if we write the special route after dynamic route then dynamic route will run
//so to avoid that we should use dynamic route in last.
// router.get("/userid/:id", params);
// router.route("/userid/:id").get(singleUser).put(updateUser).delete(deleteUser);

export default router;