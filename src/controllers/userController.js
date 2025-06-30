import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getAccountPage = async (req, res) => {
    const user = await User.findByPk(req.session.user.id);
    res.render('account', { user, message: null, error: null });
};

export const updateAccountInfo = async (req, res) => {
    const { name } = req.body;
    const user = await User.findByPk(req.session.user.id);
    user.name = name;
    await user.save();
    req.session.user.name = name;
    res.render('account', { user, message: 'Name has been updated!', error: null });
};

export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.session.user.id);

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
        return res.render('account', { user, error: 'Current password is incorrect.', message: null });
    }

    user.password = newPassword;
    await user.save();
    res.render('account', { user, message: 'Password has been updated!', error: null });
};
