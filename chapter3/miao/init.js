'use strict';

const path = require('path');

const R = require('ramda');

const check = R.curry((obj, key) => {
  if(typeof obj[key] === 'undefined') {
    return false;
  }
  return true;
});

const notInGlobal = key => !check({})(key);

function globalBaseInitial(baseDir) {
  const _use = dir => require(path.resolve(baseDir, dir));

  if(notInGlobal('check')) {
    global.check = check;
  }

  if(notInGlobal('Controller')) {
    global.C = global.Controller = _use('app/controller/base');
  }
  if(notInGlobal('Service')) {
    global.S = global.Service = _use('app/service/base');
  }

  if(notInGlobal('use')) {
    global.use = dir => {
      dir = dir.replace(/\./g, path.sep);
      return _use(dir);
    }
  }
}

module.exports = {
  globalBaseInitial,
};