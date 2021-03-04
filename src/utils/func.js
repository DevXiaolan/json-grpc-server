const { readdirSync, readFileSync } = require('fs');

const isStream = (obj) => {

}

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

const parseRules = (mockData) => {
  return Object.entries(mockData).map(([key, value]) => {
    if (value.upstream) {
      return {
        method: key,
        streamType: "client",
        stream: [
          {
            input: '.*'
          }
        ],
        output: value.upstream
      };
    }
    if (value.stream) {
      return {
        input: '.*',
        method: key,
        streamType: "server",
        stream: [
          {
            output: value.stream
          }
        ]
      }
    }
    return {
      input: '.*',
      method: key,
      output: value,
    };
  });
}

module.exports = {
  detectPackageAndService,
  findProto,
  parseRules,
};