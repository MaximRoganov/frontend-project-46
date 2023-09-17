#!/usr/bin/env node

// import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0.1');

program
  .option('-f, --format <type>', 'output format');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    // console.log('filepath1:', filepath1);
    // console.log('filepath2:', filepath2);

    // console.log(`Current directory: ${cwd()}`);
    // path.resolve('/foo/bar', '/tmp/file/');

    const file1 = readFileSync(filepath1, 'utf-8');
    const parsedFile1 = JSON.parse(file1);

    const file2 = readFileSync(filepath2, 'utf-8');
    const parsedFile2 = JSON.parse(file2);

    // logic for 1 level deep files

    // {
    //   - follow: false
    //     host: hexlet.io
    //   - proxy: 123.234.53.22
    //   - timeout: 50
    //   + timeout: 20
    //   + verbose: true
    // }

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

    const getDiff = (data1, data2) => {
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

    const result = getDiff(parsedFile1, parsedFile2);
    // logic for 1 level deep files
    console.log(result);
  });

program.parse();

// const options = program.opts(); it needs it for something

// if (options.format) {
//   console.log(options);
// }
