'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/user/article_list', controller.users.article.article_list);
  router.get('/user/article_add', controller.users.article.article_add);
  router.get('/user/article_edit/:id', controller.users.article.article_edit);
};
