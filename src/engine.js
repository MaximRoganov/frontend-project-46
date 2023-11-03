import { Command } from 'commander';
import _ from 'lodash';
import { buildDiff, getData } from './comparePlainFiles.js';
import stylish from './formatters/stylish.js';

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
    .action((filepath1, filepath2, { format = 'stylish' }) => {
      const data1 = getData(filepath1);
      const data2 = getData(filepath2);
      const rawDiff = buildDiff(data1, data2);
      const listOfFormatters = ['stylish'];
      const defaultFormatter = stylish;

      if (!_.includes(listOfFormatters, format)) {
        console.log(defaultFormatter(rawDiff));
      }
      if (format === 'stylish') {
        console.log(stylish(rawDiff));
      }
    });

  program.parse();
};

export default gendiff;
