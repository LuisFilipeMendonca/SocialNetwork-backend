import Comment from '../models/Comment';

class CommentController {
    async postComment(req, res) {
        try {

            const commentData = {
                comment: 'Nice post!',
                userId: 13,
                postId: 23
            }

            const comment = await Comment.create(commentData);

            return res.status(200).json(comment);

        } catch(e) {
            console.log(e);
        }
    }
}

export default new CommentController();