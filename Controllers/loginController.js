import UserModel from "../Model/User.js";
import {matchPassword} from "../utils/userHelper.js";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "Please provide email and password",
      });
    }

    // Check if email exists in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "Email not registered",
      });
    }

    // Check if password is correct
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        sucess: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });

    // Remove password from response
    user.password = undefined;

    // Set access token as a cookie and send response with success message and token
    return res.cookie("acessToken", accessToken, {expiresIn: process.env.JWT_EXP,httpOnly: true,secure: true,})
      .status(200)
      .json({
        sucess: true,
        message: "Login successful",
        accessToken: accessToken,
        user,
        
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during Login",
    });
  }
};

export default loginController;
