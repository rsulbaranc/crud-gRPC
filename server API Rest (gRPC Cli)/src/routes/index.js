const { Router } = require('express');
const router = Router();
const { consultProductos, insertPoductos, actualiProducto, borrPoductos } = require('../controllers/grpc-controller');

//Routes
router.post('/create', insertPoductos);
router.get('/read', consultProductos);
router.post('/update', actualiProducto);
router.post('/delete', borrPoductos);

// Ruta worker
router.get('/api', (req, res) => {
    // Crea un nuevo Worker y pasa los datos de la solicitud a procesar
    const worker = new Worker('./worker.js');
    worker.postMessage(req.body);
  
    // Escucha los mensajes del Worker
    worker.on('message', result => {
      // Envía el resultado al cliente
      res.send(result);
    });
    
    // Maneja cualquier error en el Worker
    worker.on('error', err => {
      console.error(err);
      res.status(500).send('Error en el Worker');
    });
    
    // Finaliza el Worker cuando haya terminado de procesar la solicitud
    worker.on('exit', code => {
      if (code !== 0) {
        console.error(`Worker finalizado con código de salida: ${code}`);
        res.status(500).send('Error en el Worker');
      }
    });
  });

module.exports = router;