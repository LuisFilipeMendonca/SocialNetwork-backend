import { DataTypes, Model } from "sequelize";

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              args: true,
              msg: "A description is required",
            },
          },
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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.hasMany(models.PostPhoto, { foreignKey: "postId" });
    this.hasMany(models.Comment, { foreignKey: "postId" });
    this.hasMany(models.Like, { foreignKey: "postId" });
  }
}

export default Post;
