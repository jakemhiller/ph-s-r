const { partial, mergeWith, isArray, isObject } = require('lodash');
const path = require('path');


const ENV = process.env.NODE_ENV || 'development';
const isDEV = (ENV === 'development');

const rootDir = path.resolve(__dirname, '../');
const dir = partial(path.resolve, rootDir);

const mergeConfig = (source, ...destinations) => {
  return mergeWith({}, source, ...destinations, (srcVal, destVal) => {
    if (isArray(srcVal) && isArray(destVal)) {
      return srcVal.concat(destVal);
    }
  });
};

module.exports = {
  rootDir,
  dir,
  mergeConfig,
  ENV,
  isDEV
};
