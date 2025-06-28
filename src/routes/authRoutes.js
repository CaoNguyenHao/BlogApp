import express from 'express';
import {
    getLogin, postLogin,
    getRegister, postRegister,
    logout
} from '../controllers/authController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', postRegister);
router.post('/logout', logout);

export default router;
