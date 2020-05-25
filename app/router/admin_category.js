'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/category', controller.admin.category.list);
  router.post('/admin/category/post_add', controller.admin.category.post_add);
  router.post('/admin/category/post_edit', controller.admin.category.post_edit);
  // router.post('/admin/category/del', controller.admin.category.post_del);
};
