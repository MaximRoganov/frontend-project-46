import { readFileSync } from 'node:fs';
import { Command } from 'commander';
import { getDiff } from './comparePlainFiles.js';

const gendiff = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0.1');

  program
    .option('-f, --format <type>', 'output format');

  program
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {


    const file1 = readFileSync(filepath1, 'utf-8');
    const parsedFile1 = JSON.parse(file1);

    const file2 = readFileSync(filepath2, 'utf-8');
    const parsedFile2 = JSON.parse(file2);

    const result = getDiff(parsedFile1, parsedFile2);
    // logic for 1 level deep files
    console.log(result);
  });

program.parse();
};

export default gendiff;
