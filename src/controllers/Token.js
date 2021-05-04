import User from "../models/User";

class TokenController {
  async createUserToken(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ field: "email", msg: "Your email cannot be empty." });
      }

      if (!password) {
        return res
          .status(400)
          .json({ field: "password", msg: "Your password cannot be empty." });
      }

      // ENDIREITAR

      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!(await user.isPasswordValid(password))) {
        return res
          .status(400)
          .json({ field: "password", msg: "Your password is invalid." });
      }

      const token = user.createUserToken(user.email);

      console.log(user);

      return res.status(200).json({
        userId: user.id,
        userEmail: user.email,
        userProfilePicture: user.profilePictureUrl,
        userName: user.username,
        userFirstTime: user.firstTime,
        token,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TokenController();
