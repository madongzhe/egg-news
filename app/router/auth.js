'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/auth', controller.users.auth.index);
  router.get('/auth/register/:id', controller.users.auth.register);
  router.post('/auth/post_register/1', controller.users.auth.post_register_one);
};
