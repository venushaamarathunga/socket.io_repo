import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genarateToken } from "../jwtUtils/token.js";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password, conformPassword, gender } = req.body;

    if (password !== conformPassword) {
      return res.status(400).json({ error: "Password not match." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    const newUser = new User({
      userName,
      email,
      password: hashPwd,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();
      // Generate JWT token
      const token = generateToken({ id: newUser._id });

      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.json({
      success: true,
      message: "Authentication successful!",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const logOut = (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
