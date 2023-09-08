import { Router, NextFunction } from "express";
import UserController from "../controllers/User.controller";

// Create a new router instance
export const router = Router();

// Route for registering a user
router.route("/register").post(UserController.register);

router
    .route("/:id")
    // Route for getting a user by id
    .get(UserController.getUserById)
    // Route for updating user preferences
    .patch(UserController.updatePreferences)
// Route for getting all movies
router.route("/").get(UserController.getAllUSers);

export default router;
