const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

// Validaciones
const updateValidation = [
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Email inválido')
];

// Rutas protegidas
router.use(protect);

// Rutas de administrador
router.get('/', restrictTo('admin'), getUsers);
router.get('/:id', restrictTo('admin'), getUserById);
router.put('/:id', restrictTo('admin'), updateValidation, updateUser);
router.delete('/:id', restrictTo('admin'), deleteUser);

module.exports = router; 