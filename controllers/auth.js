// @ts-nocheck
// import bcrypt from "bcrypt";

import { User } from "../models/User.js";
import { hash, compare } from "../utils/password.js";
import { sendConfirmationEmail, confirmedEmail } from "../utils/email.js";
import Jwt from "jsonwebtoken";
import cookie from "cookie";

import { config } from "dotenv";
import { logger } from "../utils/log.js";
config();

export const signUpController = (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email }, async (err, data) => {
    if (err) {
      logger.error(err.message);
      return res.status(500).json({
        error: `Server error message 1: ${err.message}`,
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

    await user
      .save()
      .then((data) => {
        const token = Jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("access_token", token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
        sendConfirmationEmail(email, user._id);
        res.json(data);
      })
      .catch((err) => {
        logger.error(err.message);
        return res.status(500).json({
          error: `Server error message 2: ${err.message}`,
        });
      });
  }).clone();
};

export const signInController = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email }, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        logger.error(err.message);
        return res.status(404).json({
          error: "There is no user with the provided email!",
        });
      }
      logger.error(err.message);
      return res.status(500).json({
        error: `Server error message 1: ${err.message}`,
      });
    }
    if (data) {
      try {
        if (data.confirmedEmail === false) {
          return res.status(403).json({
            message: "Email address not confirmed",
          });
        }
        if (compare(password, data.password)) {
          return res.status(200).json({
            success: "Login successful",
          });
        }
        if (!compare(password, data.password)) {
          return res.status(401).json({
            error: "Incorrect password",
          });
        }
      } catch (error) {
        logger.error(error.message);
        return error;
      }
    }
  }).clone();
};
