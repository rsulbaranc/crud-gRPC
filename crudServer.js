const pool = require('./crudDb');
const PROTO_PATH = __dirname + '/crud.proto';
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

pool.connect();

async function getProducts (call, callback)  {
    try {
        const res = await pool.query('SELECT * FROM producto');
        console.log(res.rows);
        //pool.end();
        callback(null, res.rows);
    } catch(e) {
        console.log(e);
    }
};

const server = new grpc.Server();
server.addService(crudDBService.CrudService.service, { getProducts: getProducts });
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
});
