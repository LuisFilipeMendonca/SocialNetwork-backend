import multer from "multer";
import multerConfig from "../config/multer";
import { Op } from "sequelize";

import User from "../models/User";
import Post from "../models/Post";
import PostPhoto from "../models/PostPhoto";
import Follower from "../models/Follower";

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
        console.log(e);
      }
    });
  }

  async updateUser(req, res) {
    upload(req, res, async (photoError) => {
      if (photoError) {
        console.log(photoError);
        return res.status(400).json({
          field: "file",
          msg: photoError.code,
        });
      }

      try {
        let userData = { ...req.body, firstTime: false };

        if (req.file) {
          userData = {
            ...userData,
            profilePicture: req.file.filename,
          };
        }

        const user = await User.findByPk(req.user.id);

        await user.update(userData);

        return res.status(200).json({
          userEmail: user.email,
          userProfilePicture: user.profilePicture,
          userProfilePictureUrl: user.profilePictureUrl,
          userName: user.username,
          userFirstTime: user.firstTime,
        });
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
          {
            model: Follower,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
        order: [["Posts", "id", "DESC"]],
      });

      const updatedUserData = Follower.getFollowersAndFollowing(user);

      return res.status(200).json(updatedUserData);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
