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
        let respuesta = {message: 'Se ejecuto el query'}
        callback(null, respuesta);
    } catch(e) {
        console.log(e);
    }
};

async function createProduct (call, callback) {
    try {
        let querysentence = 'INSERT INTO producto(id, descrip) VALUES($1, $2)'
        let values = [call.request.id, call.request.descrip]
        let res = await pool.query(querysentence, values);
        console.log('El cliente ejecuto el comando: '+ res.command);
        let respuesta = {message: call. request.descrip + ' Se ha agregado correctamente a la base de datos'}
        callback(null, respuesta);
    } catch (e){
        console.log(e);
    }
}

async function deleteProduct (call, callback) {
    try {
        let querysentence = 'DELETE FROM producto WHERE id = $1'
        let value = [call.request.id]
        let res = await pool.query(querysentence, value);
        console.log('El cliente ejecuto el comando: '+ res.command);
        let respuesta = {message: ('Se elimino exitosamente el producto con el id: ' + call.request.id)}
        callback(null, respuesta);
    } catch (e) {
        console.log(e);
    }
}

async function updateProduct (call, callback) {
    try {
        let querysentence = 'UPDATE producto SET descrip = $1 WHERE descrip = $2'
        let value = [call.request.newDescrip, call.request.oldDescrip]
        let res = await pool.query(querysentence, value);
        console.log('El cliente ejecuto el comando: '+ res.command);
        let respuesta = { message: 'El nuevo valor de ' + call.request.oldDescrip + ' ahora es ' + call.request.newDescrip };
        callback(null, respuesta);
    } catch (e) {
        console.log(e);
    }
}

const server = new grpc.Server();
server.addService(crudDBService.CrudService.service, { 
    getProducts: getProducts,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
});
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
});
