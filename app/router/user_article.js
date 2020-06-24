'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/user/article_list', controller.users.article.article_list);
  router.post('/user/article_list/:page', controller.users.article.post_article_List);
  router.get('/user/article_add', controller.users.article.article_add);
  router.post('/user/article_add', controller.users.article.post_add);
  router.get('/user/article_edit/:id', controller.users.article.article_edit);
  router.post('/user/article_edit', controller.users.article.post_article_edit);
  router.post('/user/article_del', controller.users.article.post_article_del);
};
