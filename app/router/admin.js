'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/admin_list', controller.admin.admin.List);
  router.post('/admin/admin/post_add', controller.admin.admin.post_add);
  router.post('/admin/admin/post_edit', controller.admin.admin.post_edit);
  router.get('/admin/admin/active/:id/:active', controller.admin.admin.get_active);
};
