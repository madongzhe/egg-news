'use strict';

const Controller = require('../../core/base_controller');
const crypto = require('crypto');

class LoginController extends Controller {

  /**
   * 用户登录
   *
   * @memberof ArticleController
   */
  async index() {
    const { ctx } = this;
    await ctx.render('user_login.html');
  }

  /**
   * 登录申请
   *
   * @memberof LoginController
   */
  async post_login() {
    const { ctx } = this;
    const createRule = {
      phone: 'string',
      password: 'string',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.logger.info('登录参数错误');
      ctx.helper.fail(422);
    }
    const { phone, password } = ctx.request.body;
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const res = await ctx.service.users.login.login(phone, pwd);
    if (res) {
      ctx.logger.info('登录成功');
      ctx.helper.success();
    } else {
      ctx.logger.info('登录失败');
      ctx.helper.error('登录失败');
      return;
    }
  }

  /**
   * 用户注销
   *
   * @memberof LoginController
   */
  async logout() {
    const { ctx } = this;
    ctx.session.users = null;
    ctx.helper.success();
  }
}

module.exports = LoginController;
