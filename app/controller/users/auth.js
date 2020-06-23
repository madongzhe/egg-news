'use strict';

const Controller = require('../../core/admin_base_controller');

class AuthController extends Controller {

  /**
   * 申请发文媒体页
   *
   * @memberof AuthController
   */
  async index() {
    await this.ctx.render('auth/register_type.html');
  }

  /**
   * 注册发文
   *
   * @memberof AuthController
   */
  async register() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    // 校验参数
    try {
      ctx.validate(createRule, ctx.params);
    } catch (error) {
      ctx.helper.error(422);
      return;
    }
    const sourceId = ctx.session.users.sourceId;
    if (sourceId) {
      ctx.redirect('/auth');
      return;
    }
    const { id } = ctx.params;
    if (id === 1) {
      await ctx.render('auth/register/register_normal_1.html');
    } else if (id === 2) {
      await ctx.render('auth/register/register_normal_2.html');
    }
  }

  async post_register_one() {
    const { ctx } = this;
    const createRule = {
      sourceName: 'string',
      sourceIntroduce: 'string',
      mediaLogo: 'string',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.fail(422);
      return;
    }
    const userId = ctx.session.users.id;
    if (!userId) {
      ctx.helper.fail(401, '没有权限');
      return;
    }
    const sourceId = ctx.session.users.sourceId;
    if (sourceId) {
      ctx.helper.fail(401, '已完成注册，可以去发文了');
      return;
    }
    const { sourceName, sourceIntroduce, mediaLogo } = ctx.request.body;
    const res = await ctx.service.users.auth.add(sourceName, sourceIntroduce, mediaLogo, userId);
    if (res) {
      ctx.helper.success();
      return;
    }
    ctx.helper.fail();
  }
}

module.exports = AuthController;
