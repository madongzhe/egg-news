'use strict';

const Controller = require('../../core/base_controller');

class TbkController extends Controller {

  /**
   * 店铺搜索
   *
   * @memberof TbkController
   */
  async taobaoTbkShopGet() {
    const createRule = {
      q: 'string',
    };
    try {
      this.ctx.validate(createRule, this.ctx.query);
    } catch (error) {
      this.ctx.helper.error();
    }
    const q = this.ctx.query.q;
    const res = await this.ctx.service.taobaoke.index.taobaoTbkShopGet(q);
    this.ctx.helper.success(res);
  }

  /**
   * 淘宝客商品详情查询(简版)
   *
   * @memberof TbkController
   */
  async taobaoTbkItemInfoGet() {
    const createRule = {
      num_iids: 'string',
    };
    try {
      this.ctx.validate(createRule, this.ctx.query);
    } catch (error) {
      this.ctx.helper.error();
    }
    const num_iids = this.ctx.query.num_iids;
    const res = await this.ctx.service.taobaoke.index.taobaoTbkItemInfoGet(num_iids);
    this.ctx.helper.success(res);
  }

  /**
   * 物料搜索
   *
   * @memberof TbkController
   */
  async taobaoTbkDgMaterialOptional() {
    const createRule = {
      q: 'string',
    };
    try {
      this.ctx.validate(createRule, this.ctx.query);
    } catch (error) {
      this.ctx.helper.error();
    }
    const q = this.ctx.query.q;
    const res = await this.ctx.service.taobaoke.index.taobaoTbkDgMaterialOptional({ q });
    this.ctx.helper.success(res);
  }
}
module.exports = TbkController;
