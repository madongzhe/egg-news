'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.users.login.index);
  router.post('/post_login', controller.users.login.post_login);
  router.get('/users/logout', controller.users.login.logout);
};
