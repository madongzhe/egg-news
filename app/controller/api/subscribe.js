'use strict';

const Controller = require('../../core/base_controller');

class SubscribeController extends Controller {

  /**
   * 关注订阅
   * @memberof SubscribeController
   */
  async subscribeAdd() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    try {
      // 校验参数
      ctx.validate(createRule, ctx.query);
    } catch (error) {
      ctx.helper.fail();
    }
    const id = ctx.query.id;
    const userid = ctx.session.users.id;
    if (!userid) {
      return ctx.helper.fail('401');
    }
    const res = await ctx.service.source.sourceAdd(id, userid);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.fail();
    }
  }
  /**
   * 取消关注订阅
   * @memberof SubscribeController
   */
  async subscribeDel() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    try {
      // 校验参数
      ctx.validate(createRule, ctx.query);
    } catch (error) {
      ctx.helper.fail();
    }
    const id = ctx.query.id;
    const userid = ctx.session.users.id;
    if (!userid) {
      return ctx.helper.fail('401');
    }
    const res = await ctx.service.source.sourceDel(id, userid);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.fail();
    }
  }
}

module.exports = SubscribeController;
