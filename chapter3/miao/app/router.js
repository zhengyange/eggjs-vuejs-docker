'use strict';

const init = require('./utils').initRouterMap;

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/v1/signup', controller.user.signUp);
  // init('/api/v1', require('./api')(controller), router);
};
