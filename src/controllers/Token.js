import User from "../models/User";
import Error from "../util/Error";

class TokenController {
  async createUserToken(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        next(new Error(400, "Email and password required"));
      }

      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!(await user.isPasswordValid(password))) {
        next(new Error(401, "Invalid credentials"));
      }

      const userToken = user.createUserToken(user.email);

      return res.status(200).json({
        userId: user.id,
        userEmail: user.email,
        userProfilePicture: user.profilePicture,
        userProfilePictureUrl: user.profilePictureUrl,
        userName: user.username,
        userFirstTime: user.firstTime,
        userToken,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new TokenController();
