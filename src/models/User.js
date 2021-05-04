import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import appConfig from "../config/appConfig";
import jwt from "jsonwebtoken";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 16],
              msg: "Your username should have between 3 and 16 characters",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              msg: "Your email is invalid",
            },
          },
        },
        password: {
          type: DataTypes.VIRTUAL,
          allowNull: false,
          validate: {
            len: {
              args: 8,
              msg: "Your password must have at least 3 characters",
            },
          },
        },
        passwordHash: {
          type: DataTypes.STRING,
          field: "password_hash",
        },
        profilePicture: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "profile_picture",
          defaultValue: null,
        },
        profilePictureUrl: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue(
              "profilePicture"
            )}`;
          },
        },
        firstTime: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
          field: "first_time",
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
      {
        sequelize,
        modelName: "User",
      }
    );

    this.addHook("beforeCreate", async (user) => {
      user.passwordHash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  isPasswordValid(password) {
    return bcrypt.compare(password, this.passwordHash);
  }

  createUserToken(email) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: "userId" });
    this.hasMany(models.Comment, { foreignKey: "userId" });
    this.hasMany(models.Like, { foreignKey: "userId" });
  }
}

export default User;
