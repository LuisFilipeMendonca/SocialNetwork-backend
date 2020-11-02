import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import appConfig from '../../../../backend/src/config/appConfig';

class User extends Model {
    static init(sequelize) {
        super.init({
            username: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 16],
                        msg: 'Your username should have between 3 and 16 characters'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Your email is invalid',
                    },
                },
            },
            password: {
                type: DataTypes.VIRTUAL,
                allowNull: false,
                validate: {
                    len: {
                        args: 8,
                        msg: 'Your password must have at least 3 characters'
                    }
                }
            },
            passwordHash: {
                type: DataTypes.STRING,
                field: 'password_hash'
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'profile_picture',
                defaultValue: null
            },
            profilePictureUrl: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${appConfig.url}/images/${this.getDataValue('profilePicture')}`
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
        }, {
            sequelize,
            modelName: 'User',
        });

        this.addHook('beforeCreate', async (user) => {
            user.passwordHash = await bcrypt.hash(user.password, 8);
        })

        return this;
    }

    isPasswordValid(password) {
        return bcrypt.compare(password, this.passwordHash);
    }

    static associate(models) {
        this.hasMany(models.Post, { foreignKey: 'userId' })
    }
};

export default User;