import { test, expect } from '@jest/globals';
import buildDiff from '../src/rawDiffLogic.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
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

test('deep json files with plain formater', () => {
  const data1 = getData(getFixturePath('deep1.json'));
  const data2 = getData(getFixturePath('deep2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = plain(diff);
  expect(styledDiff).toBe(deepFilePlainFormat);
});
