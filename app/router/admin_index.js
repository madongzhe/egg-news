'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin', controller.admin.index.index);
  app.router.redirect('/admin/index', '/admin', 303);
  router.get('/admin/home', controller.admin.home.index);
};
