import Comment from '../models/comment.js';
import Post from '../models/post.js';

// [POST] /comments/:postId
export const addComment = async (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).send('Post not found');

    await Comment.create({
        content,
        userId: req.session.user.id,
        postId
    });

    res.redirect(`/posts/${postId}`);
};

// [DELETE] /comments/:id
export const deleteComment = async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).send('Comment not found');

    if (req.session.user.id !== comment.userId && req.session.user.role !== 'admin') {
        return res.status(403).send('Unauthorized');
    }

    await comment.destroy();
    res.redirect(`/posts/${comment.postId}`);
};
