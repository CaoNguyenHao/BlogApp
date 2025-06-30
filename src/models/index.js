import sequelize from '../config/database.js';
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';

const db = {
    User,
    Post,
    Comment
};


Object.values(db).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(db);
    }
});

db.sequelize = sequelize;

export default db;
