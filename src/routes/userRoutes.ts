import express from 'express';
import * as userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', userController.login);
router.get('/', authMiddleware, userController.getAll);
router.post('/', authMiddleware, userController.create);
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.remove);

export default router;