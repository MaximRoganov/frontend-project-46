// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

const toParseFileFormat = (data, extension) => {
  const slicedExtension = extension.slice(1);

  switch (slicedExtension) {
    case 'json':
      return parseJson(data);
    case 'yaml':
    case 'yml':
      return parseYaml(data);
    default:
      throw new Error('this format of file isn\'t supported');
  }
};

export default toParseFileFormat;
