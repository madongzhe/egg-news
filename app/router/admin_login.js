'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/login', controller.admin.login.index);
  router.post('/admin/post_login', controller.admin.login.post_login);
  router.get('/admin/logout', controller.admin.login.logout);
};
