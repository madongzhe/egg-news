'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/feedback', controller.feedback.index);
  router.post('/feedback', controller.feedback.post_feedback);
};
