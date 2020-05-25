'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/article/list', controller.admin.article.list);
  router.post('/admin/article/post_list', controller.admin.article.post_list);
  router.get('/admin/article/add', controller.admin.article.add);
  router.get('/admin/article/edit/:id', controller.admin.article.edit);
  router.post('/admin/article/post_add', controller.admin.article.post_add);
  router.post('/admin/article/post_edit', controller.admin.article.post_edit);
  router.post('/admin/article/del', controller.admin.article.post_del);
};
