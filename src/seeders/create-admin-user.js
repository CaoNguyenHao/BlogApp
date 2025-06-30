import User from '../models/user.js';

const createAdmin = async () => {
    try {
        const [admin, created] = await User.findOrCreate({
            where: { email: 'admin9@gmail.com' },
            defaults: {
                name: 'Admin',
                password: '123456',
                role: 'admin'
            }
        });

        if (!created) {
            admin.password = '123456';
            admin.role = 'admin';
            await admin.save();
            console.log('Admin updated with new password');
        } else {
            console.log('Admin created');
        }

        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
};

createAdmin();
