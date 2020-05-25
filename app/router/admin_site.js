'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/site', controller.admin.site.index);
  router.post('/admin/post_site', controller.admin.site.post_site);
};
