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
      // TODO need to make options.format as musthave variable
      const result = getDiff(filepath1, filepath2);
      console.log(result);
    });

  program.parse();
};

export default gendiff;
