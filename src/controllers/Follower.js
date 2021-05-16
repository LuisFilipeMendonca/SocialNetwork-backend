import { Op } from "sequelize";

import Follower from "../models/Follower";

import Error from "../util/Error";

class FollowerController {
  async postFollower(req, res, next) {
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

      if (!follower) {
        next(new Error(400, "Error following that user"));
      }

      return res.status(201).json(follower);
    } catch (e) {
      next(e);
    }
  }

  async deleteFollower(req, res, next) {
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
      next(e);
    }
  }
}

export default new FollowerController();
