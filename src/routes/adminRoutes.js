import express from 'express';
import {
    getPendingPosts, approvePost, rejectPost,
    getAllUsers, promoteUser, deleteUser, demoteUser
} from '../controllers/adminController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/posts', isAuthenticated, isAdmin, getPendingPosts);
router.put('/posts/:id/approve', isAuthenticated, isAdmin, approvePost);
router.put('/posts/:id/reject', isAuthenticated, isAdmin, rejectPost);

router.get('/users', isAuthenticated, isAdmin, getAllUsers);
router.put('/users/:id/promote', isAuthenticated, isAdmin, promoteUser);
router.put('/users/:id/demote', isAuthenticated, isAdmin, demoteUser);
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);

export default router;
