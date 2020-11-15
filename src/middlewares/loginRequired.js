import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ errorMsg: "You need to login in your account" });
    }

    const [, token] = authorization.split(" ");

    const userData = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!userData) {
      return res
        .status(401)
        .json({ errorMsg: "Your session expired. Please login again." });
    }

    const user = await User.findOne({
      where: { email: userData.email },
      attributes: ["profilePictureUrl", "profilePicture", "username", "id"],
    });

    req.user = user;

    next();
  } catch (e) {
    return res
      .status(401)
      .json({ errorMsg: "Your session expired. Please login again." });
  }
};
