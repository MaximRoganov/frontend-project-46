// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.load(data);

const mainParser = (data, extension) => {
  if (extension === 'json') {
    return parseJSON(data);
  }
  if (extension === 'yml' || extension === 'yaml') {
    return parseYAML(data);
  }
  return false;
};

export default mainParser;
