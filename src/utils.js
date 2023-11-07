import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { readFileSync } from 'fs';
import mainParser from './parsers.js';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return join(__dirname, '..', '__fixtures__', filename);
};

const getData = (file) => {
  const fileData = readFileSync(file, 'utf-8');
  const extension = extname(file);
  return mainParser(fileData, extension);
};

export { getFixturePath, getData };
