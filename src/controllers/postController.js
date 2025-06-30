import db from '../models/index.js';
const { Post, User, Comment } = db;

// [GET] /posts
export const getAllPosts = async (req, res) => {
    const posts = await Post.findAll({
        where: { status: 'approved' },
        include: [{ model: User, as: 'author' }],
        order: [['createdAt', 'DESC']]
    });
    res.render('posts/posts', { posts });
};

// [GET] /posts/:id
export const getPostById = async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
        include: [
            { model: User, as: 'author', attributes: ['id', 'name'] },
            {
                model: Comment,
                as: 'comments',
                include: [{ model: User, as: 'author', attributes: ['id', 'name'] }]
            }
        ]
    });
    if (!post) return res.status(404).send('Post not found');
    res.render('posts/postDetail', { post, currentUser: req.session.user });
};

// [GET] /posts/new
export const renderNewPostForm = (req, res) => {
    res.render('posts/newPost');
};

// [POST] /posts
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        let imagePath = null;
        if (req.file) {
            imagePath = '/uploads/' + req.file.filename;
        }

        await Post.create({
            title,
            content,
            image: imagePath,
            userId: req.session.user.id,
            status: 'pending'
        });

        res.redirect('/posts');
    } catch (err) {
        console.error('Create Post Error:', err);
        res.status(500).send('Internal Server Error');
    }
};


// [GET] /posts/:id/edit
export const renderEditPostForm = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByPk(postId, {
            include: [{ model: User, as: 'author' }]
        });

        if (!post) {
            return res.status(404).send('Post not found');
        }

        res.render('posts/editPost', { post });
    } catch (err) {
        console.error('Error loading post:', err);
        res.status(500).send('Server error');
    }
};

// [PUT] /posts/:id

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).send('Post not found');

        post.title = title;
        post.content = content;

        if (req.file) {
            post.image = '/uploads/' + req.file.filename;
        }
        post.status = 'pending';

        await post.save();

        res.redirect('/posts/' + postId);
    } catch (err) {
        console.error('Update Post Error:', err);
        res.status(500).send('Server Error');
    }
};


// [DELETE] /posts/:id
export const deletePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    if (req.session.user.id !== post.userId && req.session.user.role !== 'admin') {
        return res.status(403).send('Unauthorized');
    }

    await post.destroy();
    res.redirect('/posts');
};


