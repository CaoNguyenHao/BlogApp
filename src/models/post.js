import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

class Post extends Model {
    static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
        Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
    }
}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'approved', 'rejected']]
        }
    }
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts'
});


export default Post;
