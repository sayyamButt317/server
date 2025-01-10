import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
    }, // trim removes white spaces
    lastname: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
    }, 
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please use a Valid Email Address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      // select: false,
       // this field is not returned in the response
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
