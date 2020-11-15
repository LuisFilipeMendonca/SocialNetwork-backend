import Like from "../models/Like";

class LikeController {
  async postLike(req, res) {
    try {
      const likeData = {
        postId: req.body.postId,
        userId: req.user.id,
      };

      const like = await Like.create(likeData);

      return res.status(200).json(like);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteLike(req, res) {
    try {
      const like = await Like.findOne({
        where: { userId: req.user.id, postId: req.params.postId },
      });

      like.destroy();

      return res.status(200).json({ msg: "Like deleted with success" });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LikeController();
