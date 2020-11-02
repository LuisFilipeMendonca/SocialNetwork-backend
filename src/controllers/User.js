import multer from 'multer';
import multerConfig from '../config/multer';

import User from '../models/User';

const upload = multer(multerConfig).single('profilePicture');

class UserController {
    async createUser(req, res) {
        return upload(req, res, async (photoError) => {
            if (photoError) {
                return res.status(400).json({
                    field: 'file',
                    msg: photoError.code
                })
            }

            try {

                const { username, email, password } = req.body;

                const userData = {
                    username,
                    email,
                    password,
                    profilePicture: req.file.filename
                }

                const user = await User.create(userData);

                return res.status(200).json(user);

            } catch (e) {
                console.log(e);
            }
        })
    }

    async updateUser(req, res) {
        upload(req, res, async (photoError) => {
            if(photoError) {
                return res.status(400).json({
                    field: 'file',
                    msg: photoError.code
                })
            }

            try {

                let userData = req.body;

                if(req.file) {
                    userData = {...userData, profilePicture: req.file.filename};
                }

                const user = await User.findByPk(req.params.id);

                await user.update(userData);

                return res.status(200).json(user);

            } catch(e) {
                console.log(e)
            }
        })
    }
}

export default new UserController();