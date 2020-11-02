import { DataTypes, Model } from 'sequelize';

class Comment extends Model {
    static init(sequelize) {
        super.init({
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'You should add something to your comment'
                    }
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        }, { sequelize })

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'postId' });
        this.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

export default Comment;