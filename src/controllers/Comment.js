import Comment from "../models/Comment";
import User from "../models/User";

class CommentController {
  async postComment(req, res) {
    try {
      const { id, username, profilePicture, profilePictureUrl } = req.user;

      const data = {
        comment: req.body.comment,
        userId: id,
        postId: req.body.postId,
      };

      const commentData = await Comment.create(data);

      const { comment, createdAt, id: postId } = commentData;

      return res.status(200).json({
        id: postId,
        comment,
        createdAt,
        User: { id, username, profilePicture, profilePictureUrl },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getPostComments(req, res) {
    try {
      const { postId } = req.params;
      let { page, offset } = req.query;

      const limit = 3;

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
      console.log(e);
    }
  }
}

export default new CommentController();
