import User from '../models/user.js';

export const getLogin = (req, res) => {
    res.render('login', { error: null });
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validPassword(password))) {
        return res.render('login', { error: 'Sai email hoặc mật khẩu' });
    }

    req.session.user = {
        id: user.id,
        name: user.name,
        role: user.role
    };

    res.redirect('/dashboard');
};

export const getRegister = (req, res) => {
    res.render('register', { error: null });
};

export const postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const existed = await User.findOne({ where: { email } });
    if (existed) return res.render('register', { error: 'Email đã tồn tại' });

    await User.create({ name, email, password });
    res.redirect('/login');
};

export const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};
