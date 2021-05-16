import Comment from "../models/Comment";
import User from "../models/User";

import Error from "../util/Error";

class CommentController {
  async postComment(req, res, next) {
    try {
      const { id, username, profilePicture, profilePictureUrl } = req.user;

      const data = {
        comment: req.body.comment,
        userId: id,
        postId: req.body.postId,
      };

      const commentData = await Comment.create(data);

      if (!commentData) {
        next(new Error(400, "Error adding your comment"));
      }

      const { comment, createdAt, id: commentId } = commentData;

      return res.status(200).json({
        id: commentId,
        comment,
        createdAt,
        User: { id, username, profilePicture, profilePictureUrl },
      });
    } catch (e) {
      next(e);
    }
  }

  async getPostComments(req, res, next) {
    try {
      const { postId } = req.params;
      let { page, offset } = req.query;

      const limit = 5;

      const newOffset = (+page - 1) * limit + +offset;

      const comments = await Comment.findAll({
        where: { postId },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        limit,
        offset: newOffset,
        include: [
          {
            model: User,
            attributes: [
              "profilePictureUrl",
              "id",
              "username",
              "profilePicture",
            ],
          },
        ],
      });

      return res
        .status(200)
        .json({ hasMoreComments: comments.length / limit === 1, comments });
    } catch (e) {
      next(e);
    }
  }
}

export default new CommentController();
