const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

// Validaciones
const productValidation = [
  body('name').notEmpty().withMessage('El nombre del producto es requerido'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
  body('category').notEmpty().withMessage('La categoría es requerida')
];

// Rutas públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rutas protegidas
router.use(protect);

// Rutas de administrador
router.post('/', restrictTo('admin'), productValidation, createProduct);
router.put('/:id', restrictTo('admin'), productValidation, updateProduct);
router.delete('/:id', restrictTo('admin'), deleteProduct);

module.exports = router; 