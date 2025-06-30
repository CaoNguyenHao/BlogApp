export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) return next();
    res.redirect('/login');
};

export const isOwnerOrAdmin = async (req, res, next) => {
    const post = await import('../models/post.js').then(m => m.default.findByPk(req.params.id));
    if (!post) return res.status(404).send('Not found');

    if (req.session.user.id === post.userId || req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).send('Unauthorized');
};

export const isCommentAuthor = async (req, res, next) => {
    const comment = await import('../models/comment.js').then(m => m.default.findByPk(req.params.id));
    if (!comment) return res.status(404).send('Comment not found');

    if (req.session.user.id === comment.userId || req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).send('Unauthorized');
};

export const isAdmin = (req, res, next) => {
    if (req.session.user?.role === 'admin') return next();
    return res.status(403).send('Forbidden: Admins only');
};
