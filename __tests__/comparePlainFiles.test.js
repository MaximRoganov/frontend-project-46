import { test, expect } from '@jest/globals';
import { buildDiff, getData } from '../src/comparePlainFiles.js';
import stylish from '../src/formatters/stylish.js';
import getFixturePath from '../src/utils.js';

const plainExpectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const deepExpectedResult = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: trueexpectedResult
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

test('plain json files', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(plainExpectedResult);
});

test('plain yaml files', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(plainExpectedResult);
});

test('deep json files', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(deepExpectedResult);
});

test('deep yaml files', () => {
  const data1 = getData(getFixturePath('plain1.json'));
  const data2 = getData(getFixturePath('plain2.json'));
  const diff = buildDiff(data1, data2);
  const styledDiff = stylish(diff);
  expect(styledDiff).toBe(deepExpectedResult);
});
