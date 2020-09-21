'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/API/tbk/taobaoTbkShopGet', controller.api.tbk.taobaoTbkShopGet);
  router.get('/API/tbk/taobaoTbkItemInfoGet', controller.api.tbk.taobaoTbkItemInfoGet);
  router.get('/API/tbk/taobaoTbkDgMaterialOptional', controller.api.tbk.taobaoTbkDgMaterialOptional);
};
