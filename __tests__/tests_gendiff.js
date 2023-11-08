import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import { getFixturePath } from '../src/utils.js';

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const simpleJsonPath1 = getFixturePath('simple1.json');
const simpleJsonPath2 = getFixturePath('simple2.json');

const deepJsonPath1 = getFixturePath('deep1.json');
const deepJsonPath2 = getFixturePath('deep2.json');

const simpleYamlPath1 = getFixturePath('simple1.yaml');
const simpleYamlPath2 = getFixturePath('simple2.yaml');

const deepYamlPath1 = getFixturePath('deep1.yaml');
const deepYamlPath2 = getFixturePath('deep2.yaml');

test('simple json files with stylish formater', () => {
  const styledDiff = genDiff(simpleJsonPath1, simpleJsonPath2, 'stylish');
  expect(styledDiff).toBe(readFile('simple_stylish_result.txt'));
});

test('simple yaml files with stylish formater', () => {
  const styledDiff = genDiff(simpleYamlPath1, simpleYamlPath2, 'stylish');
  expect(styledDiff).toBe(readFile('simple_stylish_result.txt'));
});

test('deep json files with stylish formater', () => {
  const styledDiff = genDiff(deepJsonPath1, deepJsonPath2, 'stylish');
  expect(styledDiff).toBe(readFile('deep_stylish_result.txt'));
});

test('deep yaml files with stylish formater', () => {
  const styledDiff = genDiff(deepYamlPath1, deepYamlPath2, 'stylish');
  expect(styledDiff).toBe(readFile('deep_stylish_result.txt'));
});

test('simple json files with plain formater', () => {
  const styledDiff = genDiff(simpleJsonPath1, simpleJsonPath2, 'plain');
  expect(styledDiff).toBe(readFile('simple_plain_result.txt'));
});

test('deep json files with plain formater', () => {
  const styledDiff = genDiff(deepJsonPath1, deepJsonPath2, 'plain');
  expect(styledDiff).toBe(readFile('deep_plain_result.txt'));
});

test('simple json files with json formater', () => {
  const styledDiff = genDiff(simpleJsonPath1, simpleJsonPath2, 'json');
  expect(styledDiff).toBe(readFile('simple_json_result.json'));
});

test('deep json files with json formater', () => {
  const styledDiff = genDiff(deepJsonPath1, deepJsonPath2, 'json');
  expect(styledDiff).toBe(readFile('deep_json_result.json'));
});
