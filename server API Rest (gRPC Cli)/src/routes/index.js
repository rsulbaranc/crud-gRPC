const { Router } = require('express');
const router = Router();
const { consultProductos, insertPoductos, actualiProducto, borrPoductos } = require('../controllers/grpc-controller');

//Routes
router.post('/create', insertPoductos);
router.get('/read', consultProductos);
router.post('/update', actualiProducto);
router.post('/delete', borrPoductos);

module.exports = router;