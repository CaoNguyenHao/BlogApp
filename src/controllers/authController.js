import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.render('auth/login', { error: 'Wrong email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.render('auth/login', { error: 'Wrong email or password' });
    }

    req.session.user = {
        id: user.id,
        name: user.name,
        role: user.role
    };

    return res.redirect('/posts');
};


export const getRegister = (req, res) => {
    res.render('auth/register', { error: null });
};

export const postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const existed = await User.findOne({ where: { email } });
    if (existed) return res.render('auth/register', { error: 'Email already exists' });

    await User.create({ name, email, password });
    res.redirect('/login');
};

export const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};
