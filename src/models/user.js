import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

export class User extends Model {
    validPassword(password) {
        return bcrypt.compare(password, this.password);
    }

    static associate(models) {
        User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
        User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['admin', 'user']]
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

export default User;
