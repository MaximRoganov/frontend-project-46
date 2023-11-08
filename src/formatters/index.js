import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const toFormat = (data, formatterType) => {
  switch (formatterType) {
    case 'json':
      return json(data);
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error('there is no this type of format');
  }
};

export default toFormat;
