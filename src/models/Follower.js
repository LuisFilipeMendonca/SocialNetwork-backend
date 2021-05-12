import { DataTypes, Model } from "sequelize";

class Follower extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "updated_at",
        },
      },
      { sequelize }
    );

    return this;
  }

  static getFollowersAndFollowing(userData) {
    const followers = {
      followers: [],
      following: [],
    };

    const followersString = JSON.stringify(userData.Followers);

    JSON.parse(followersString).forEach((follow) => {
      if (follow.type === "following") {
        followers.following.push(follow);
      } else {
        followers.followers.push(follow);
      }
    });

    const userString = JSON.stringify(userData);
    const userParsed = JSON.parse(userString);

    userParsed.Followers = { ...followers };

    return userParsed;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.belongsTo(models.User, { foreignKey: "followerId" });
  }
}

export default Follower;
