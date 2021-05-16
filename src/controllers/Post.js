import { Op } from "sequelize";
import multer from "multer";
import multerConfig from "../config/multer";

import Post from "../models/Post";
import PostPhoto from "../models/PostPhoto";
import User from "../models/User";
import Follower from "../models/Follower";
import Like from "../models/Like";

import Error from "../util/Error";

const upload = multer(multerConfig).array("postPhoto");

class PostController {
  async createPost(req, res, next) {
    return upload(req, res, async (photoError) => {
      if (photoError) {
        next(new Error(415, photoError.code));
      }

      try {
        const { description } = req.body;

        const postData = {
          description,
          userId: req.user.id,
        };

        const post = (await Post.create(postData)).toJSON();

        const { id } = post;

        const postPhotosData = req.files.map((file) => {
          return {
            postPhoto: file.filename,
            postId: id,
          };
        });

        const postPhotos = await PostPhoto.bulkCreate(postPhotosData);

        return res.status(200).json({ id, PostPhotos: [postPhotos[0]] });
      } catch (e) {
        next(e);
      }
    });
  }

  async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [
          ["createdAt", "DESC"],
          ["PostPhotos", "id", "ASC"],
        ],
        attributes: {
          exclude: ["updatedAt", "userId"],
        },
        include: [
          {
            model: User,
            attributes: [
              "profilePicture",
              "profilePictureUrl",
              "username",
              "id",
            ],
          },
          {
            model: PostPhoto,
            attributes: {
              exclude: ["createdAt", "updatedAt", "postId"],
            },
          },
          {
            model: Like,
            attributes: ["userId"],
          },
        ],
      });

      const updatedPosts = Like.searchLikeAndAddCommentData(req.user.id, posts);

      return res.status(200).json(updatedPosts);
    } catch (e) {
      next(e);
    }
  }

  async getPost(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        next(new Error(400, "A post id is needed"));
      }

      const post = await Post.findByPk(id, {
        attributes: ["id", "description", "createdAt"],
        include: [
          {
            model: User,
            attributes: [
              "profilePicture",
              "profilePictureUrl",
              "id",
              "username",
            ],
          },
          {
            model: PostPhoto,
            attributes: ["postPhotoUrl", "postPhoto", "id"],
          },
          {
            model: Like,
            attributes: ["userId"],
          },
        ],
      });

      const updatedPost = Like.searchLikeAndAddCommentData(req.user.id, [post]);

      return res.status(200).json(updatedPost);
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        next(new Error(400, "A post id is needed"));
      }

      const post = await Post.findByPk(id);

      if (!id) {
        next(new Error(400, "No post found"));
      }

      await post.destroy();

      return res.status(200).json({ msg: "Your post was deleted." });
    } catch (e) {
      next(e);
    }
  }

  async getFollowingPosts(req, res, next) {
    try {
      let userFollowingIds = await Follower.findAll({
        where: {
          userId: req.user.id,
          type: "following",
        },
        attributes: ["followerId"],
      });

      userFollowingIds = userFollowingIds.map(
        (follower) => follower.followerId
      );

      const posts = await Post.findAll({
        where: {
          userId: {
            [Op.or]: userFollowingIds,
          },
        },
        order: [
          ["createdAt", "DESC"],
          ["PostPhotos", "id", "ASC"],
        ],
        attributes: {
          exclude: ["updatedAt", "userId"],
        },
        include: [
          {
            model: User,
            attributes: [
              "profilePicture",
              "profilePictureUrl",
              "username",
              "id",
            ],
          },
          {
            model: PostPhoto,
            attributes: {
              exclude: ["createdAt", "updatedAt", "postId"],
            },
          },
          {
            model: Like,
            attributes: ["userId"],
          },
        ],
      });

      const updatedPosts = Like.searchLikeAndAddCommentData(req.user.id, posts);

      return res.status(200).json(updatedPosts);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
