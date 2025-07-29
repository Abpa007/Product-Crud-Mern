import userModel from "../../model/userModel/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User fetched successfully.",
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error while fetching user." });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Enter a valid email or email not found",
      });
    }

    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({
        message: "Enter a valid email or password",
      });
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Enter a valid password or password not found",
      });
    }

    delete user.password;

    // Make sure your .env uses the correct variable name: JWT_SECRET_KEY
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      user,
      token,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userRegister = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    const savedUser = await newUser.save();

    const user = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    };

    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error while registering user" });
  }
};
