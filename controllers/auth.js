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

  // console.log(email);

  await User.findOne({ email }, (err, data) => {
    console.log(data);
    // console.log(email);
    // if (err) {
    //   logger.error(err.message);
    //   return res.status(500).json({
    //     error: `Server error message 1: ${err.message}`,
    //   });
    // }

    if (data === null) {
      logger.error("Incorrect email");
      return res.status(401).json({
        message: "Incorrect email",
      });
    }

    if (data) {
      try {
        if (data.confirmedEmail === false) {
          logger.error("Email address not confirmed");
          return res.status(403).json({
            message: "Email address not confirmed",
          });
        }

        if (!compare(password, data.password)) {
          logger.error("Incorrect password");
          return res.status(401).json({
            error: "Incorrect password",
          });
        }

        return res.status(200).json({
          success: "Login successful",
        });
      } catch (error) {
        logger.error(error.message);
        return error;
      }
    }
  }).clone();
};
