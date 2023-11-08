import { test, expect } from '@jest/globals';
import buildDiff from '../src/rawDiffLogic.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';
import { getFixturePath, getData } from '../src/utils.js';

const simpleFileStylishFormat = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const deepFileStylishFormat = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const simpleFilePlainFormat = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

const deepFilePlainFormat = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const deepFileJsonFormat = '{"type":"root","children":[{"key":"common","children":{"type":"root","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"deleted"},{"key":"setting3","oldValue":true,"newValue":null,"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","children":{"type":"root","children":[{"key":"doge","children":{"type":"root","children":[{"key":"wow","oldValue":"","newValue":"so much","type":"changed"}]},"type":"nested"},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}]},"type":"nested"}]},"type":"nested"},{"key":"group1","children":{"type":"root","children":[{"key":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}]},"type":"nested"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]}';

const simpleFileJsonFormat = '{"type":"root","children":[{"key":"follow","value":false,"type":"deleted"},{"key":"host","value":"hexlet.io","type":"unchanged"},{"key":"proxy","value":"123.234.53.22","type":"deleted"},{"key":"timeout","oldValue":50,"newValue":20,"type":"changed"},{"key":"verbose","value":true,"type":"added"}]}';

test('simple json files with stylish formater', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(simpleFileStylishFormat);
});

test('simple yaml files with stylish formater', () => {
  const data1 = getData(getFixturePath('plain1.yaml'));
  const data2 = getData(getFixturePath('plain2.yaml'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(simpleFileStylishFormat);
});

test('deep json files with stylish formater', () => {
  const data1 = getData(getFixturePath('deep1.json'));
  const data2 = getData(getFixturePath('deep2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(deepFileStylishFormat);
});

test('deep yaml files with stylish formater', () => {
  const data1 = getData(getFixturePath('deep1.yaml'));
  const data2 = getData(getFixturePath('deep2.yaml'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(deepFileStylishFormat);
});

test('simple json files with plain formater', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = plain(diff);
  expect(styledDiff).toBe(simpleFilePlainFormat);
});

test('deep json files with plain formater', () => {
  const data1 = getData(getFixturePath('deep1.json'));
  const data2 = getData(getFixturePath('deep2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = plain(diff);
  expect(styledDiff).toBe(deepFilePlainFormat);
});

test('simple json files with json formater', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = json(diff);
  expect(styledDiff).toBe(simpleFileJsonFormat);
});

test('deep json files with json formater', () => {
  const data1 = getData(getFixturePath('deep1.json'));
  const data2 = getData(getFixturePath('deep2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = json(diff);
  expect(styledDiff).toBe(deepFileJsonFormat);
});
