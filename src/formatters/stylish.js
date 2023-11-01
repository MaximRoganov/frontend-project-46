import _ from 'lodash';

const makeLine = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const keys = Object.keys(val);
  const lines = keys.map((key) => `${' '.repeat(depth * 4 + 4)}${key}: ${makeLine(val[key], depth + 1)}`).join('\n');
  return `{\n${lines}\n${' '.repeat(depth * 4)}}`;
};

const stylish = (diff, depth = 1, space = 4) => {
  const iter = (item) => {
    const replacer = ' ';
    switch (item.type) {
      case 'nested':
        return [`${replacer.repeat(depth * space)}${item.key}: ${stylish(item.children, depth + 1)}`];
      case 'added':
        return [`${replacer.repeat(depth * space - 2)}+ ${item.key}: ${makeLine(item.value, depth)}`];
      case 'deleted':
        return [`${replacer.repeat(depth * space - 2)}- ${item.key}: ${makeLine(item.value, depth)}`];
      case 'changed':
        return [[`${replacer.repeat(depth * space - 2)}- ${item.key}: ${makeLine(item.oldValue, depth)}`], [`${replacer.repeat(depth * space - 2)}+ ${item.key}: ${makeLine(item.newValue, depth)}`]].join('\n');
      case 'unchanged':
        return [`${replacer.repeat(depth * space - 2)}  ${item.key}: ${makeLine(item.value, depth)}`];
      default:
        throw new Error('Error AST');
    }
  };
  const { children } = diff;
  const lines = children.map((line) => iter(line, depth));

  return ['{', ...lines, `${' '.repeat(depth * space - 4)}}`].join('\n');
};

export default stylish;
