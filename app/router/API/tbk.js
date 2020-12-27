'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/API/tbk/taobaoTbkShopGet', controller.api.tbk.taobaoTbkShopGet);
  router.post('/API/tbk/taobaoTbkItemInfoGet', controller.api.tbk.taobaoTbkItemInfoGet);
  router.post('/API/tbk/taobaoTbkDgMaterialOptional', controller.api.tbk.taobaoTbkDgMaterialOptional);
};
