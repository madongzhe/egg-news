'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.admin.login.index);
  router.post('/post_login', controller.admin.login.post_login);
  router.get('/logout', controller.admin.login.logout);
};
