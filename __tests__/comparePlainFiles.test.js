import { test, expect } from '@jest/globals';
import { getDiff } from '../src/comparePlainFiles.js';
import getFixturePath from '../src/utils.js';

const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('plain json files', () => {
  const diff = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(diff).toBe(expectedResult);
});

test('plain yaml files', () => {
  const diff = getDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(diff).toBe(expectedResult);
});
