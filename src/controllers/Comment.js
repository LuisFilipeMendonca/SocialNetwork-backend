import Comment from "../models/Comment";

class CommentController {
  async postComment(req, res) {
    try {
      const data = {
        comment: req.body.comment,
        userId: req.user.id,
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
}

export default new CommentController();
