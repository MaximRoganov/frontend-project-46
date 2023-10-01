import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return join(__dirname, '..', '__fixtures__', filename);
};

export default getFixturePath;
