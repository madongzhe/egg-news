'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/link', controller.admin.link.list);
  router.post('/admin/link/post_add', controller.admin.link.post_add);
  router.post('/admin/link/post_edit', controller.admin.link.post_edit);
};
