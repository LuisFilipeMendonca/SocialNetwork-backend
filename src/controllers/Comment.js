import Comment from "../models/Comment";
import User from "../models/User";

class CommentController {
  async postComment(req, res) {
    try {
      const data = {
        comment: req.body.comment,
        userId: 5,
        postId: req.body.postId,
      };

      const commentData = await Comment.create(data);

      const { comment, createdAt, id: postId } = commentData;
      const { id, username, profilePicture, profilePictureUrl } = req.user;

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

      const comments = await Comment.findAndCountAll({
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

      return res.status(200).json({
        count: Math.ceil((comments.count - offset) / limit),
        comments: [...comments.rows],
        page: ++page,
        offset: +offset,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new CommentController();
