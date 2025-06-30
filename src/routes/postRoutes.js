import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    renderNewPostForm,
    renderEditPostForm
} from '../controllers/postController.js';

import { isAuthenticated, isOwnerOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

//CREATE
router.get('/new', isAuthenticated, renderNewPostForm);
router.post('/', isAuthenticated, upload.single('image'), createPost);

//READ
router.get('/', getAllPosts);
//READ_BY_ID
router.get('/:id', getPostById);

//UPDATE
router.get('/:id/edit', isAuthenticated, isOwnerOrAdmin, renderEditPostForm);
router.put('/:id', isAuthenticated, isOwnerOrAdmin, upload.single('image'), updatePost);

//DELETE
router.delete('/:id', isAuthenticated, isOwnerOrAdmin, deletePost);

export default router;
