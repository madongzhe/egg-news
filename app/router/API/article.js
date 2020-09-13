'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/API/article/list/:page', controller.api.articleList.ReadList);
  router.get('/API/article/:id', controller.api.article.Read);
  router.get('/API/sourceArticleList/:sourceid/:page', controller.api.articleList.sourceArticleList);
};
