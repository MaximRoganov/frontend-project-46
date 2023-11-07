import _ from 'lodash';

const makeLine = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (!_.isObject(val)) {
    return val;
  }
  return '[complex value]';
};

const plain = (diff, path) => {
  const iter = (item) => {
    const localPath = path ? `${path}.${item.key}` : item.key;
    switch (item.type) {
      case 'nested':
        //
        return [`${plain(item.children, `${localPath}`)}`];
      case 'added':
        // Property 'common.follow' was added with value: false
        return [`Property '${localPath}' was added with value: ${makeLine(item.value)}`];
      case 'deleted':
        // Property 'common.setting2' was removed
        return [`Property '${localPath}' was removed`];
      case 'changed':
        // Property 'group1.baz' was updated. From 'bas' to 'bars'
        return [`Property '${localPath}' was updated. From ${makeLine(item.oldValue)} to ${makeLine(item.newValue)}`];
      case 'unchanged':
        // show nothing
        return null;
      default:
        throw new Error('Error AST');
    }
  };
  const { children } = diff;
  const lines = children.map((line) => iter(line));
  const filteredLines = lines.filter((item) => item !== null);
  return filteredLines.join('\n');
};

export default plain;
