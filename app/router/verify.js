'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/verify', controller.base.verify); // 验证码
};
