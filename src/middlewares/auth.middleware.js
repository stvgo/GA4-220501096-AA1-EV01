const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si hay token en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Token no proporcionado'
      });
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar usuario
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado - Usuario no encontrado'
        });
      }

      // Agregar usuario a la request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Token inválido'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la autenticación',
      error: error.message
    });
  }
};

// Middleware para verificar rol de administrador
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para realizar esta acción'
      });
    }
    next();
  };
}; 