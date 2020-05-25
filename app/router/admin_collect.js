'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/collect/list', controller.admin.collect.list);
  router.post('/admin/collect/post_list', controller.admin.collect.post_list);
  router.get('/admin/collect/add', controller.admin.collect.add);
  router.post('/admin/collect/post_add', controller.admin.collect.post_add);
  router.get('/admin/collect/edit/:id', controller.admin.collect.edit);
  router.post('/admin/collect/post_edit', controller.admin.collect.post_edit);
  router.post('/admin/collect/post_del', controller.admin.collect.post_del);
  router.post('/admin/collect/post_state', controller.admin.collect.post_state);
  router.post('/admin/collect/test_list', controller.admin.collect.test_list);
  router.post('/admin/collect/test_title', controller.admin.collect.test_title);
  router.post('/admin/collect/test_article', controller.admin.collect.test_article);
};
