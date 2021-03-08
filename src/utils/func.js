const { readdirSync, readFileSync } = require('fs');
const protoLoader = require('@grpc/proto-loader');

const detectPackageAndService = (protoFilePath) => {
  const pkgAndService = ['', ''];
  const lines = readFileSync(protoFilePath).toString().split(/\r|\n/);
  lines.forEach(line => {
    if (line.startsWith('package ')) {
      // package name detect
      pkgAndService[0] = line.replace(/package\s|;/g, '');
    } else if (line.startsWith('service ')) {
      // service name detect
      pkgAndService[1] = line.replace(/service\s|\s{/g, '');
    }
  });
  return pkgAndService;
};

const findProto = (dataRoot) => {
  const protos = [];
  const files = readdirSync(dataRoot);
  for (let k = 0; k < files.length; k++) {
    if (files[k].endsWith('.proto') && files.includes(files[k].replace('.proto', '.json'))) {
      // make sure there is a proto file and its json file exists...
      const protoPath = `${dataRoot}/${files[k]}`;
      const [packageName, serviceName] = detectPackageAndService(protoPath);
      protos.push({
        protoPath,
        packageName,
        serviceName,
        jsonPath: `${dataRoot}/${files[k].replace('.proto', '.json')}`,
      });
    }
  }
  return protos;
};

const parseRules = (proto, mockData) => {
  const { protoPath, packageName, serviceName } = proto;
  const conf = protoLoader.loadSync(protoPath);
  const methods = conf[`${packageName}.${serviceName}`];
  return Object.entries(mockData).map(([key, value]) => {
    if (methods[key].requestStream && methods[key].responseStream){
      return {
        method: key,
        streamType: 'mutual',
        stream: [
          {
            input: '.*',
            output: value,
          }
        ]
      };
    }
    if (methods[key].requestStream) {
      return {
        method: key,
        streamType: 'client',
        stream: [
          {
            input: '.*'
          }
        ],
        output: value,
      };
    }
    if (methods[key].responseStream) {
      return {
        input: '.*',
        method: key,
        streamType: 'server',
        stream: [
          {
            output: value,
          }
        ]
      };
    }
    return {
      input: '.*',
      method: key,
      output: value,
    };
  });
};

module.exports = {
  detectPackageAndService,
  findProto,
  parseRules,
};