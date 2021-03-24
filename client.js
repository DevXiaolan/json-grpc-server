const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const handleResult = (err, res) => {
  console.log({ err, res });
}

// const packageDef = protoLoader.loadSync(__dirname + '/data/test.proto', {
const packageDef = protoLoader.loadSync(__dirname + '/data/system_update.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDef);
// const client = new proto.greeter.Greeter(
const client = new proto.systemupdate.SystemUpdate(
  '127.0.0.1:51004',
  grpc.credentials.createInsecure(),
);


const InstallPkgToHostOS = ()=>{
    client.InstallPkgToHostOS({}, handleResult)
}

InstallPkgToHostOS();

// const Hello = ()=>{
//   client.Hello({message:'11'}, handleResult)
// }

// Hello()