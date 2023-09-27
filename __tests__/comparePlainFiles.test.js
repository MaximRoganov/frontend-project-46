import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import { getDiff } from '../src/comparePlainFiles.js';

import { fileURLToPath } from 'url';
import { dirname, join  } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);


const filePath1 = getFixturePath('file1.json');
const testFile1 = readFileSync(filePath1, 'utf-8');

const filePath2 = getFixturePath('file2.json');
const testFile2 = readFileSync(filePath2, 'utf-8');


test('plain json file', () => {
  
  const diff = getDiff(JSON.parse(testFile1),JSON.parse(testFile2));
  
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(diff).toBe(expectedResult);
});
