'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/API/subscribe/subscribeAdd', controller.api.subscribe.subscribeAdd);
  router.get('/API/subscribe/subscribeDel', controller.api.subscribe.subscribeDel);
};
