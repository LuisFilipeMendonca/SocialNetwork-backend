import Like from "../models/Like";

import Error from "../util/Error";

class LikeController {
  async postLike(req, res, next) {
    try {
      const likeData = {
        postId: req.body.postId,
        userId: req.user.id,
      };

      const like = await Like.create(likeData);

      if (!like) {
        next(new Error(400, "Error adding your like"));
      }

      return res.status(200).json(like);
    } catch (e) {
      next(e);
    }
  }

  async deleteLike(req, res, next) {
    try {
      const like = await Like.findOne({
        where: { userId: req.user.id, postId: req.params.postId },
      });

      if (!like) {
        next(new Error(400, "No like found"));
      }

      like.destroy();

      return res.status(200).json({ msg: "Like deleted with success" });
    } catch (e) {
      next(e);
    }
  }
}

export default new LikeController();
