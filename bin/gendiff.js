#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const engine = () => {
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
    .action((filepath1, filepath2, { format = 'stylish' }) => {
      console.log(genDiff(filepath1, filepath2, format));
    });

  program.parse();
};

export default engine;
