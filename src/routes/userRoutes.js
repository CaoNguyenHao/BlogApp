import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import {
    getAccountPage,
    updateAccountInfo,
    updatePassword
} from '../controllers/userController.js';

const router = express.Router();

router.get('/account', isAuthenticated, getAccountPage);
router.post('/account/update-info', isAuthenticated, updateAccountInfo);
router.post('/account/update-password', isAuthenticated, updatePassword);

export default router;
