import { Request, Response } from "express";
import { User } from "../models/user.model";
import { ERRORS } from "../const/errors";

export default class UserController {
  static async register(req: Request, res: Response) {
    // Create a new user object from the request body 
    const newUser = new User(req.body);
    try {
      // Save the user to the DB
      await newUser.save();
      // Status 201 if the new user from the request body is ok and send the new user via response
      res.status(201).json(newUser.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        // Verify if email already exists and send status 409(conflict)
        if (error.message.includes("E11000")) {
          res.status(409).send(ERRORS.MONGO.DUPLICATED_EMAIL);
        }

        if (error.message.includes("Auth validation failed")) {
          res.status(400).send(error.message);
          return;
        }

        res.status(500).send(error.message);
      }
    }
  }

  static async getUserById(req: Request, res: Response) {
    // Extract the ID from the http request parameters
    const { id } = req.params;
    let user;

    try {
      // Find the user by their ID in the Users collection
      user = await User.findById(id);
      // Respond with user data if found
      res.status(201).send(user);
    } catch (error) {
      if (error instanceof Error) {
        // Send a 400 Bad Request response 
        return res.status(400).send(error.message);
      }
    }
  }

  static async getAllUSers(req: Request, res: Response) {
    let users;

    try {
      // Find all users from the Users collection
      users = await User.find();
      // Respond with users data if found
      res.status(201).send(users);
    } catch (error) {
      if (error instanceof Error) {
        // Send a 400 Bad Request response 
        return res.status(400).send(error.message);
      }
    }
  }

  static async updatePreferences(req: Request, res: Response) {
    // Extract the user ID from the HTTP request parameters
    const { id } = req.params;

    try {
      // Update the user using findByIdAndUpdate, with specified properties from req.body
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        favoritesMovies: req.body.favoritesMovies,
        preferences: {
          favoriteCategories: req.body.preferences.favoriteCategories,
          websiteTheme: req.body.preferences.websiteTheme
        }
      });
      // Send the updated user data in the response
      res.status(200).send(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        // Send a 400 Bad Request response with the error message
        return res.status(400).send(error.message);
      }
    }
  }
}
