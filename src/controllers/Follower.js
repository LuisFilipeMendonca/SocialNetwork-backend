import { Op } from "sequelize";
import Follower from "../models/Follower";
import User from "../models/User";

class FollowerController {
  async post(req, res) {
    try {
      const data = [
        {
          userId: req.user.id,
          followerId: req.body.followerId,
          type: "following",
        },
        {
          userId: req.body.followerId,
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

  async getFollowers(req, res) {
    try {
      const followers = await Follower.findAll({
        where: {
          [Op.or]: [{ userId: req.user.id }, { followerId: req.user.id }],
        },
        include: [
          {
            model: User,
          },
        ],
      });

      return res.status(200).json(followers);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FollowerController();
