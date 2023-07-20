const { parentPort } = require('worker_threads');
const PROTO_PATH = __dirname + '/welcome.proto';
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
const welcome_proto = grpc.loadPackageDefinition(packageDefinition).welcome;

parentPort.on('message', async (message) => {
  const argv = parseArgs(process.argv.slice(2), {string: 'target',});
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:8080';
  }
  const client = new welcome_proto.Welcome(target, grpc.credentials.createInsecure());
  let user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'Luke Skywalker';
  }
  await client.SayWelcome({ name: user }, function (err, response) {
    console.log('Message:', response.message);
    parentPort.postMessage(response.message);
  });
});

