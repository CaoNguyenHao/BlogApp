import db from '../models/index.js';
const { Post, User } = db;

export const getPendingPosts = async (req, res) => {
    const posts = await Post.findAll({
        where: { status: 'pending' },
        include: [{ model: User, as: 'author' }]
    });
    res.render('admin/admin-posts', { posts });
};

export const approvePost = async (req, res) => {
    await Post.update({ status: 'approved' }, { where: { id: req.params.id } });
    res.redirect('/admin/posts');
};

export const rejectPost = async (req, res) => {
    await Post.update({ status: 'rejected' }, { where: { id: req.params.id } });
    res.redirect('/admin/posts');
};

export const getAllUsers = async (req, res) => {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/admin-users', { users, sessionUser: req.session.user });
};

export const promoteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    user.role = 'admin';
    await user.save();
    res.redirect('/admin/users');
};

export const demoteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');

    if (user.id === req.session.user.id) {
        return res.status(403).send('You cannot demote yourself!');
    }

    user.role = 'user';
    await user.save();
    res.redirect('/admin/users');
};


export const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');

    if (user.id === req.session.user.id) {
        return res.send('You cannot delete yourself');
    }

    await user.destroy();
    res.redirect('/admin/users');
};