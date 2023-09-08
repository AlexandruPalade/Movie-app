import { Request, Response } from "express";
import { Movie } from "../models/movie.model";
import { ERRORS } from "../const/errors";

export default class MovieController {
  // This function creates a new movie to the DB 
  static async newMovie(req: Request, res: Response) {
    // Creating a new object as a movie class from the request body
    const newMovie = new Movie(req.body);   

    try {
      // Saving to the DB
      await newMovie.save();
      res.status(201).json(newMovie.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        // Verify if there is no duplicate
        if (error.message.includes("E11000")) {
          res.status(409).send(ERRORS.MONGO.DUPLICATED_MOVIE);
        }

        if (error.message.includes("Auth validation failed")) {
          res.status(400).send(error.message);
          return;
        }

        res.status(500).send(error.message);
      }
    }
  }

  static async getAllMovies(req: Request, res: Response) {
    let movies;

    try {
      // Find all movies objects from the DB and return them via response
      movies = await Movie.find();
      res.status(201).send(movies);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }

  static async getMoviesByTag(req: Request, res: Response) {
    let movies;
    // Extract the tag from the params
    let { tag } = req.params;
    try {
      // Find all movies that have the specified tag in the Movies collection
      movies = await Movie.find({ tags: tag });
      // Respond with the data if found
      res.status(201).send(movies);
    } catch (error) {
      // Send a 400 Bad Request response 
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }

  static async getMoviesByGenre(req: Request, res: Response) {
    let movies;
    // Take the genre from the params
    let { genre } = req.params;
    try {
      // Find all movies that have the specified genre from params 
      movies = await Movie.find({ genre: genre });
      res.status(201).send(movies);
    } catch (error) {
      if (error instanceof Error) {
        // Send a 400 Bad Request response 
        return res.status(400).send(error.message);
      }
    }
  }
}
