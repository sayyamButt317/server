import UserModel from "../Model/User.js";

const AllUserController = async () => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ sucess:true,users});
  } catch (error) {
    return res
      .status(500)
      .json({ sucess:false,message: "An error occurred while getting all users" });
  }
};

const getSingleUsers = async () => {
  try {
    const user = await UserModel.findOneById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user,total:user.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while getting single user" });
  }
};
export {AllUserController,getSingleUsers}