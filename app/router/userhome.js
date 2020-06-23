'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/home/:userId', controller.users.home.userHome);
};
