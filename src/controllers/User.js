import multer from "multer";
import multerConfig from "../config/multer";
import { Op } from "sequelize";

import User from "../models/User";
import Post from "../models/Post";
import PostPhoto from "../models/PostPhoto";
import Follower from "../models/Follower";

import Error from "../util/Error";

const upload = multer(multerConfig).single("profilePicture");

class UserController {
  async createUser(req, res, next) {
    try {
      const user = await User.create(req.body);

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

  async updateUser(req, res, next) {
    upload(req, res, async (photoError) => {
      if (photoError) {
        next(new Error(415, photoError.code));
      }

      try {
        let userData = { ...req.body, firstTime: false };

        if (req.file) {
          userData = {
            ...userData,
            profilePicture: req.file.filename,
          };
        }

        if (!req.user || !req.user.id) {
          next(new Error(400, "User not found"));
        }

        const user = await User.findByPk(req.user.id);

        if (!user) {
          next(new Error(400, "User not found"));
        }

        await user.update(userData);

        return res.status(200).json({
          userEmail: user.email,
          userProfilePicture: user.profilePicture,
          userProfilePictureUrl: user.profilePictureUrl,
          userName: user.username,
          userFirstTime: user.firstTime,
        });
      } catch (e) {
        next(e);
      }
    });
  }

  async getUser(req, res, next) {
    try {
      const { userId } = req.params;

      if (!userId) {
        next(new Error(400, "No user id provided"));
      }

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
      next(e);
    }
  }

  async searchUser(req, res, next) {
    try {
      const { username } = req.params;

      if (!username) {
        next(new Error(400, "No username provided"));
      }

      const searchedUsers = await User.findAll({
        where: {
          username: {
            [Op.like]: `${username}%`,
          },
        },
        attributes: ["id", "username", "profilePicture", "profilePictureUrl"],
      });

      return res.status(200).json(searchedUsers);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
