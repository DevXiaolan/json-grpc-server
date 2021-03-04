const { detectPackageAndService, findProto, parseRules } = require('../src/utils/func');
const { resolve } = require('path');
const { describe, it } = require('mocha');
const { assert } = require('chai');

describe('utils tests', () => {
  it('detectPackageAndService', () => {
    const protoPath = resolve(`${__dirname}/../data/test.proto`);
    assert.deepEqual(
      detectPackageAndService(protoPath),
      ['test', 'Test']
    );
  });
  it('findProto', () => {
    const root = resolve(`${__dirname}/../data`);
    assert.deepEqual(
      findProto(root),
      [
        {
          protoPath: `${root}/test.proto`,
          packageName: 'test',
          serviceName: 'Test',
          jsonPath: `${root}/test.json`,
        }
      ],
    );
  });

  it('parseRules', () => {
    const mockData = {
      "Hello": {
        "status_code": 0,
        "content": "{\"hello\":\"world\"}"
      }
    };
    assert.deepEqual(
      parseRules(mockData),
      [
        {
          method: 'Hello',
          input: '.*',
          output: {
            status_code: 0,
            content: "{\"hello\":\"world\"}"
          }
        }
      ]
    );
  })
})