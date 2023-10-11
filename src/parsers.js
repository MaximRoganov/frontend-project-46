// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.load(data);

const mainParser = (data, extension) => {
  const slicedExtension = extension.slice(1);
  if (slicedExtension === 'json') {
    return parseJSON(data);
  }
  if (slicedExtension === 'yml' || slicedExtension === 'yaml') {
    return parseYAML(data);
  }

  return false;
};

export default mainParser;
