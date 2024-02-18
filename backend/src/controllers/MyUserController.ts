import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  //1. check if the user exists in the database
  //2. if the user does not exist, create a new user in the database
  //3. send a response to the client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
};

export default {
  createCurrentUser,
};
