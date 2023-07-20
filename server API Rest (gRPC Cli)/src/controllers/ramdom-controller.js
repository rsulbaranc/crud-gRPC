const { Worker } = require('worker_threads');

const tiempoMuerto = (req, res) => {
  const worker = new Worker('./src/controllers/worker-controller.js');

  worker.on('message', (message) => {
    console.log('Resultado del worker:', message);
    return res.status(201).json({ msg: message });
  });

  worker.postMessage(req.body.name);
};

//hello world funtion
const helloWorld = (req, res) => {
    return res.status(201).json(json);
}

module.exports = { tiempoMuerto, helloWorld };