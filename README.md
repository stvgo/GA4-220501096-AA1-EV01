# API REST para Gestión de Usuarios y Productos

API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios y productos.

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd <nombre-del-directorio>
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env en la raíz del proyecto con las siguientes variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/api-proyecto
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=24h
```

4. Iniciar el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints

### Autenticación

- POST /api/auth/register - Registro de usuario
- POST /api/auth/login - Login de usuario

### Usuarios (Requiere autenticación y rol admin)

- GET /api/users - Obtener todos los usuarios
- GET /api/users/:id - Obtener usuario por ID
- PUT /api/users/:id - Actualizar usuario
- DELETE /api/users/:id - Eliminar usuario

### Productos

- GET /api/products - Obtener todos los productos
- GET /api/products/:id - Obtener producto por ID
- POST /api/products - Crear producto (Requiere autenticación y rol admin)
- PUT /api/products/:id - Actualizar producto (Requiere autenticación y rol admin)
- DELETE /api/products/:id - Eliminar producto (Requiere autenticación y rol admin)

## Ejemplos de Uso

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Ejemplo",
    "email": "usuario@ejemplo.com",
    "password": "123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "123456"
  }'
```

### Crear Producto (Requiere token de autenticación)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Producto Ejemplo",
    "description": "Descripción del producto",
    "price": 99.99,
    "stock": 100,
    "category": "Categoría Ejemplo"
  }'
```

## Testing

Para ejecutar las pruebas:
```bash
npm test
```

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT para autenticación
- Express Validator para validación de datos
- bcryptjs para encriptación de contraseñas 