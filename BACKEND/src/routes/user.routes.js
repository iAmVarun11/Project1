import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { deleteUser, listUsers, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.use(authenticate, authorizeRoles('admin'));

router.get('/', listUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;


