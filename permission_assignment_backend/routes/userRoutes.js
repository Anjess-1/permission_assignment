const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const validateUser = require('../validation/validateUser');
const { checkPermission } = require('../middleware/authMiddleware');

// Define routes and attach controller methods
router.post('/', authMiddleware, validateUser, checkPermission(['CREATE']), userController.createUser);
router.put('/:id', authMiddleware, validateUser, checkPermission(['EDIT']), userController.editUser);
router.delete('/:id', authMiddleware, checkPermission(['DELETE']), userController.deleteUser);
router.get('/', authMiddleware, checkPermission(['VIEW']), userController.viewUserList);
router.get('/:id', authMiddleware, checkPermission(['VIEW']), userController.viewUserDetails);

module.exports = router;
