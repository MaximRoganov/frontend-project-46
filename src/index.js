import buildDiff from './buildDiff.js';
import { getFileData } from './utils.js';
import toFormat from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const data1 = getFileData(path1);
  const data2 = getFileData(path2);
  const rawDiff = buildDiff(data1, data2);

  return toFormat(rawDiff, format);
};

export default genDiff;
