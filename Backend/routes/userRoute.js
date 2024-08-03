import express from "express";
import { register, login, logout } from '../controllers/usercontroller.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// route to check authentication status
router.get('/status', authenticate, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});

export default router;
