'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/source', controller.admin.source.source);
  router.get('/admin/source/add', controller.admin.source.add);
  router.post('/admin/source/post_add', controller.admin.source.post_add);
  router.get('/admin/source/edit/:id', controller.admin.source.edit);
  router.post('/admin/source/post_edit', controller.admin.source.post_edit);
  router.post('/admin/source/post_del', controller.admin.source.post_del);
};
