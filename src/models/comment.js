import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Comment extends Model {
    static associate(models) {
        Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
        Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
}

Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments'
});

export default Comment;
