import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import _ from 'lodash';
import mainParser from './parsers.js';

const getData = (file) => {
  const fileData = readFileSync(file, 'utf-8');
  const extension = extname(file);
  return mainParser(fileData, extension);
};

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  const iter = (key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key, children: buildDiff(data1[key], data2[key]), type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, oldValue: data1[key], newValue: data2[key], type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  };

  const diff = sortedKeys.map((key) => iter(key));
  return { type: 'root', children: diff };
};

export { buildDiff, getData };
