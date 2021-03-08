const { resolve } = require("path");
const { findProto, parseRules } = require("./utils/func");
const { createMockServer } = require('grpc-mock');
const cluster = require('cluster');

if (cluster.isMaster) {
  const DATA_ROOT = resolve(`${__dirname}/../data`);

  const protos = findProto(DATA_ROOT);

  protos.forEach((proto) => {
    cluster.fork({ proto: JSON.stringify(proto) });
  });

} else {
  const proto = JSON.parse(process.env.proto);
  const { port, mock } = require(proto.jsonPath);
  const mockServer = createMockServer({
    protoPath: proto.protoPath,
    packageName: proto.packageName,
    serviceName: proto.serviceName,
    rules: parseRules(proto, mock),
  });
  mockServer.listen(`0.0.0.0:${port}`)
  console.log(`service ${proto.serviceName} listen ${port}`);
}

