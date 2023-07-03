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

  //client.getProducts({  }, function (err, response) {console.log('Message:', response);});
  //client.createProduct({id: 6, descrip: 'prueba desde cli' }, function (err, response) {console.log('Message:', response);});
  //client.deleteProduct({id: 4 }, function (err, response) {console.log('Message:', response);});
  client.updateProduct({oldDescrip: 'leche', newDescrip: 'arroz' }, function (err, response) {console.log('Message:', response);});

}

main();