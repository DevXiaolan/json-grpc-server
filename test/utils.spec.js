const { detectPackageAndService, findProto, parseRules } = require('../src/utils/func');
const { resolve } = require('path');
const { describe, it } = require('mocha');
const { assert } = require('chai');

describe('utils tests', () => {
  it('detectPackageAndService', () => {
    const protoPath = resolve(`${__dirname}/../data/test.proto`);
    assert.deepEqual(
      detectPackageAndService(protoPath),
      ['greeter', 'Greeter']
    );
  });
  it('findProto', () => {
    const root = resolve(`${__dirname}/../data`);
    assert.deepEqual(
      findProto(root),
      [
        {
          protoPath: `${root}/test.proto`,
          packageName: 'greeter',
          serviceName: 'Greeter',
          jsonPath: `${root}/test.json`,
        }
      ],
    );
  });
  it('parseRules', () => {
    const protoPath = resolve(`${__dirname}/../data/test.proto`);
    const mockData = require(resolve(`${__dirname}/../data/test.json`)).mock;
    
    assert.deepEqual(
      parseRules({protoPath,packageName:'greeter',serviceName: 'Greeter'}, mockData),
      [
        {
          "input": ".*",
          "method": "Hello",
          "output": {
            "message": "Hello"
          }
        },
        {
          "method": "HowAreYou",
          "streamType": "client",
          "stream": [
            {
              "input": ".*"
            }
          ],
          "output": {
            "message": "HowAreYou"
          }
        },
        {
          "input": ".*",
          "method": "NiceToMeetYou",
          "streamType": "server",
          "stream": [
            {
              "output": {
                "message": "NiceToMeetYou"
              }
            }
          ]
        },
        {
          "method": "Chat",
          "streamType": "mutual",
          "stream": [
            {
              "input": ".*",
              "output": {
                "message": "Chat"
              }
            }
          ]
        }
      ],
    );
  });
})