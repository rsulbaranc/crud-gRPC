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

function main() {
  const argv = parseArgs(process.argv.slice(2), {string: 'target',});
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }

  const client = new crudDBService.CrudService(target, grpc.credentials.createInsecure());

  /* METODO SELECT - READ TABLE */
  client.getProducts({  }, function (err, response) {
    console.log('Message:', response);
  });

  /* METODO INSERT - CREATE PRODUCTO */
  //client.createProduct({id: 4, descrip: 'leche' }, function (err, response) {console.log('Message:', response);});

  /* METODO UPDATE - UPDATE DESCRIP */
  //client.updateProduct({oldDescrip: 'leche', newDescrip: 'pasta' }, function (err, response) {console.log('Message:', response);});

  /* METODO DELETE - DELETE PRODUCT */
  //client.deleteProduct({id: 4 }, function (err, response) {console.log('Message:', response);});

}

main();