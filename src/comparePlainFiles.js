import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import mainParser from './parsers.js';

const getData = (file) => {
  const fileData = readFileSync(file, 'utf-8');
  const extension = extname(file);
  return mainParser(fileData, extension);
};

const makeLine = (status, key, value) => {
  let finalStr;
  if (status === 'neutral') {
    finalStr = `    ${key}: ${value}\n`;
  }
  if (status === 'minus') {
    finalStr = `  - ${key}: ${value}\n`;
  }
  if (status === 'plus') {
    finalStr = `  + ${key}: ${value}\n`;
  }
  return finalStr;
};

const makeFinalOutput = (data) => `{\n${data}}`;

const getDiff = (file1, file2) => {
  const data1 = getData(file1);
  const data2 = getData(file2);

  const keys = [...Object.keys(data1), ...Object.keys(data2)].sort();
  const filteredKeys = keys.filter((item, index) => keys.indexOf(item) === index);

  const finalResult = filteredKeys.reduce((accumulator, currentValue) => {
    if (data1[currentValue] !== data2[currentValue]) {
      if (data1[currentValue] === undefined) {
        return accumulator + makeLine('plus', currentValue, data2[currentValue]);
      } if (data2[currentValue] === undefined) {
        return accumulator + makeLine('minus', currentValue, data1[currentValue]);
      }
      return accumulator + makeLine('minus', currentValue, data1[currentValue]) + makeLine('plus', currentValue, data2[currentValue]);
    }
    return accumulator + makeLine('neutral', currentValue, data1[currentValue]);
  }, '');

  return makeFinalOutput(finalResult);
};

export { makeLine, makeFinalOutput, getDiff };
