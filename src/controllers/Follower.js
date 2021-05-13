import { Op } from "sequelize";
import Follower from "../models/Follower";

class FollowerController {
  async postFollower(req, res) {
    try {
      const data = [
        {
          userId: req.user.id,
          followerId: +req.body.followerId,
          type: "following",
        },
        {
          userId: +req.body.followerId,
          followerId: req.user.id,
          type: "followed",
        },
      ];

      const follower = await Follower.bulkCreate(data);

      return res.status(201).json(follower);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFollower(req, res) {
    try {
      const userId = req.user.id;
      const { followerId } = req.params;

      await Follower.destroy({
        where: {
          [Op.or]: [
            { userId, followerId, type: "following" },
            { userId: followerId, followerId: userId, type: "followed" },
          ],
        },
      });

      return res.status(200).json({});
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FollowerController();
