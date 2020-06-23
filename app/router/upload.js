'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/admin/upload', controller.admin.upload.upimg);
  router.post('/upload', controller.users.upload.upimg);
};
