import Comment from '../models/Comment';

class CommentController {
    async postComment(req, res) {
        try {

            const commentData = {
                comment: 'Nice post!',
                userId: 12,
                postId: 21
            }

            const comment = await Comment.create(commentData);

            return res.status(200).json(comment);

        } catch(e) {
            console.log(e);
        }
    }
}

export default new CommentController();