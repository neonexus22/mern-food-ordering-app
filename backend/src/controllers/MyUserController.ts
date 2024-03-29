import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user" });
  }
};

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

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();
    res.send(user.toObject());
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
