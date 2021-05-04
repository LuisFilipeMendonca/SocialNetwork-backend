import multer from "multer";
import multerConfig from "../config/multer";

import User from "../models/User";
import Post from "../models/Post";
import PostPhoto from "../models/PostPhoto";

const upload = multer(multerConfig).single("profilePicture");

class UserController {
  async createUser(req, res) {
    return upload(req, res, async (photoError) => {
      if (photoError) {
        return res.status(400).json({
          field: "file",
          msg: photoError.code,
        });
      }

      try {
        const { username, email, password } = req.body;

        let userData = {
          username,
          email,
          password,
        };

        if (req.file) {
          userData = { ...userData, profilePicture: req.file.filename };
        }

        const user = await User.create(userData);

        const token = user.createUserToken(user.email);

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
    });
  }

  async updateUser(req, res) {
    upload(req, res, async (photoError) => {
      if (photoError) {
        return res.status(400).json({
          field: "file",
          msg: photoError.code,
        });
      }

      try {
        let userData = req.body;

        if (req.file) {
          userData = { ...userData, profilePicture: req.file.filename };
        }

        // PRECISO ENDIREITAR

        const user = await User.findByPk(req.params.id);

        await user.update(userData);

        return res.status(200).json(user);
      } catch (e) {
        console.log(e);
      }
    });
  }

  async getUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        attributes: [
          "profilePictureUrl",
          "profilePicture",
          "username",
          "email",
        ],
        include: [
          {
            model: Post,
            attributes: ["id"],
            include: [
              {
                model: PostPhoto,
                attributes: ["postPhotoUrl", "postPhoto"],
                limit: 1,
              },
            ],
          },
        ],
        order: [["Posts", "id", "DESC"]],
      });

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
