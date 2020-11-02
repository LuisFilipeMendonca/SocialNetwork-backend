import { DataTypes, Model } from 'sequelize';
import appConfig from '../config/appConfig';

class PostPhoto extends Model {
    static init(sequelize) {
        super.init({
            postPhoto: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'post_photo'
            },
            postPhotoUrl: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${appConfig.url}/images/${this.getDataValue('postPhoto')}`
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            }
        }, { sequelize })

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'post_id' })
    }
}

export default PostPhoto;