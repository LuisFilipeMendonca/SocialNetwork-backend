import jwt from "jsonwebtoken";
import User from "../models/User";

import Error from "../util/Error";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new Error(401, "You need to login in your account"));
    }

    const [, token] = authorization.split(" ");

    const userData = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!userData) {
      next(new Error(401, "Your session expired. Please login again."));
    }

    const user = await User.findOne({
      where: { email: userData.email },
      attributes: ["profilePictureUrl", "profilePicture", "username", "id"],
    });

    if (!user) {
      next(new Error(401, "Your account doesn't exist"));
    }

    req.user = user;

    next();
  } catch (e) {
    next(new Error(401, "Your session expired. Please login again."));
  }
};
