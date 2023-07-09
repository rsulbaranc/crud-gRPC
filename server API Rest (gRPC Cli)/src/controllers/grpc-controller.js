const PROTO_PATH = __dirname + '/crud.proto';
const parseArgs = require('minimist');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});


const crudDBService = grpc.loadPackageDefinition(packageDefinition);

  const argv = parseArgs(process.argv.slice(2), {string: 'target',});
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }

  const client = new crudDBService.CrudService(target, grpc.credentials.createInsecure());

  /* METODO SELECT - READ TABLE */
const consultProductos = async (req, res) => {
  await client.getProducts({  }, function (err, response) {
    return res.status(201).json(response);
  });
}

/* METODO INSERT - CREATE PRODUCTO */
const insertPoductos = async (req, res) => {
  const jsonCli = {...req.body};
  client.createProduct({id: jsonCli.id, descrip: jsonCli.descrip }, function (err, response) {
    console.log('Message:', response);
    return res.send(response);
  });
}

  /* METODO UPDATE - UPDATE DESCRIP */
  const actualiProducto = async (req, res) => {
    const jsonCli = {...req.body};
  client.updateProduct({oldDescrip: jsonCli.oldDescrip, newDescrip: jsonCli.newDescrip }, function (err, response) {
    console.log('Message:', response);
    return res.send(response);
  });
}

  /* METODO DELETE - DELETE PRODUCT */
const borrPoductos = async (req, res) => {
  const jsonCli = {...req.body};
  client.deleteProduct({id: jsonCli.deleteid }, function (err, response) {
    console.log('Message:', response);
    return res.send(response);
  });
}

module.exports = {
  consultProductos, 
  insertPoductos,
  actualiProducto,
  borrPoductos
};
