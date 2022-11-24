#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0.1');

program
  .option('-f, --format <type>','output format');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
  });

  program.parse();

  const options = program.opts();

  if (options.format){
    console.log(options)
  };