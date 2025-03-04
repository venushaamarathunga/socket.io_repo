import User from "../models/user.model.js";

export const getUserForSlidBar = async (req, res) => {
  try {
    const loginUserId = req.user._id;

    const filteredUsersList = (await User.find({ _id: { $ne: loginUserId } })).select("-password");

    res.status(200).json(filteredUsersList);
  } catch (error) {
    console.log("Error in send user controller : ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
