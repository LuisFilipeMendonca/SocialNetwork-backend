import Like from '../models/Like';

class LikeController {
    async postLike(req, res) {
        try {

            const likeData = {
                postId: 23,
                userId: 14
            }

            await Like.create(likeData);

            return res.status(200).json({ msg: 'Your like was added' });

        } catch(e) {
            console.log(e);
        }
    }
}

export default new LikeController();