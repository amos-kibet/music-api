// @ts-nocheck
// import bcrypt from "bcrypt";

import { User } from "../models/User.js";

import { hash, compare } from "../utils/password.js";

export const signUpController = async (req, res) => {
  const { username, email, password } = req.body;
  await User.findOne({ email }, (err, data) => {
    console.log(data);
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    if (data) {
      return res.status(401).json({
        error: "Email already in use",
      });
    }

    const user = new User({
      username: username,
      email: email,
      password: hash(password),
    });

    user
      .save()
      .then(() => {
        return res.status(201).json({
          success: "User created successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  });
};

export const signInController = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        return res.status(404).json({
          error: "There is no user with the provided email!",
        });
      }
      return res.status(500).json({
        error: err.message,
      });
    }
    if (data) {
      try {
        if (compare(password, data.password)) {
          return res.status(200).json({
            success: "Login successful",
          });
        }
        return res.status(401).json({
          error: "Incorrect password",
        });
      } catch (error) {
        return error;
      }
    }
  });
};
