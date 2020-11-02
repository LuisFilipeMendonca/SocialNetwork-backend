import { DataTypes, Model } from 'sequelize';

class Post extends Model {
    static init(sequelize) {
        super.init({
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'You should add a description to your post'
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
        this.belongsTo(models.User, { foreignKey: 'userId' });
        this.hasMany(models.PostPhoto, { foreignKey: 'postId' });
    }
}

export default Post;