import express from 'express';
import {
    addComment,
    deleteComment
} from '../controllers/commentController.js';

import { isAuthenticated, isCommentAuthor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:postId', isAuthenticated, addComment);
router.delete('/:id', isAuthenticated, isCommentAuthor, deleteComment);

export default router;
