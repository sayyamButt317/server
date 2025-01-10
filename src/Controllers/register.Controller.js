import UserModel from "../Model/User.js";
import { encryptedPassword } from "../utils/userHelper.js";

const registerController = async (req, res) => {
  try {
    // Destructure the request body
    const { firstname, lastname, email, password } = req.body;

    // Check if any required field is empty
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

      
    }

    // Check if user already exists by email address
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Encrypt the password
    const hashedPassword = await encryptedPassword(password);

    // Create a new user
    const newUser = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Respond with success, excluding the password from the response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

export default registerController;

