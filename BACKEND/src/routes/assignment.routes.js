import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { createAssignment, deleteAssignment, listAssignments, validateAssignment } from '../controllers/assignment.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', listAssignments);
router.post('/', authorizeRoles('teacher', 'admin'), validateAssignment, createAssignment);
router.delete('/:id', authorizeRoles('teacher', 'admin'), deleteAssignment);

export default router;


