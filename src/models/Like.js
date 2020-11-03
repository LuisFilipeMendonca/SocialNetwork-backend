import { DataTypes, Model } from 'sequelize';

class Like extends Model {
    static init(sequelize) {
        super.init({
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            }
        }, { sequelize })

        return this;
    }

    static searchUserLike(userId, posts) {
        const postsString = JSON.stringify(posts);
        return JSON.parse(postsString).map(post => {
            return {
                ...post,
                alreadyLiked: post.Likes.some((like) => like.userId === userId)
            }
        })
    }

    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'postId' });
        this.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

export default Like;