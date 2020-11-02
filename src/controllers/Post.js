import multer from 'multer';
import multerConfig from '../config/multer';

import Post from '../models/Post';
import PostPhoto from '../models/PostPhoto';
import User from '../models/User';

const upload = multer(multerConfig).array('postPhoto', 5);

class PostController {
    async createPost(req, res) {
        return upload(req, res, async (photoError) => {
            if (photoError) {
                return res.status(400).json({
                    field: 'file',
                    msg: photoError.code
                })
            }

            try {

                const { description } = req.body;

                const postData = {
                    description,
                    userId: 11
                }

                const post = (await Post.create(postData)).toJSON();

                const { id: postId } = post;

                const postPhotosData = req.files.map((file) => {
                    return {
                        postPhoto: file.filename,
                        postId,
                    }
                })

                const postPhotos = await PostPhoto.bulkCreate(postPhotosData);

                return res.status(200).json({ ...post, postPhotos });

            } catch (e) {
                console.log(e);
            }
        })
    }

    async getPosts(req, res) {
        try {

            const posts = await Post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'description', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['profilePicture', 'profilePictureUrl', 'id', 'username']
                }, {
                    model: PostPhoto,
                    attributes: ['postPhotoUrl', 'postPhoto']
                }]
            });

            return res.status(200).json(posts);

        } catch(e) {
            console.log(e);
        }
    }

    async getPost(req, res) {
        try {

            const { id } = req.params;

            const post = await Post.findByPk(id, {
                attributes: ['id', 'description', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['profilePicture', 'profilePictureUrl', 'id', 'username']
                }, {
                    model: PostPhoto,
                    attributes: ['postPhotoUrl', 'postPhoto']
                }]
            });

            return res.status(200).json(post);

        } catch(e) {
            console.log(e);
        }
    }

    async deletePost(req, res) {
        try {

            const { id } = req.params;

            const post = await Post.findByPk(id);

            await post.destroy();

            return res.status(200).json({ msg: 'Your post was deleted.' });

        } catch(e) {
            console.log(e);
        }
    }

}

export default new PostController();