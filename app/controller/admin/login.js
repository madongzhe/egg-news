'use strict';

const { Controller } = require('egg');
const crypto = require('crypto');
class LoginController extends Controller {

  /**
   * 登录
   *
   * @memberof LoginController
   */
  async index() {
    const { ctx } = this;
    await ctx.render('admin/login.html');
  }

  /**
   * post请求登录
   *
   * @memberof LoginController
   */
  async post_login() {
    const { ctx } = this;
    console.log('登录');
    const createRule = {
      username: 'string',
      password: 'string',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.logger.info('登录参数错误');
      ctx.helper.fail(422);
    }
    const { username, password } = ctx.request.body;
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const res = await ctx.service.admin.login.login(username, pwd);
    if (res) {
      ctx.logger.info('登录成功');
      ctx.helper.success();
    } else {
      ctx.logger.info('登录失败');
      ctx.helper.error('登录失败');
    }
    ctx.logger.info('登录成功');
  }

  /**
   * 退出登录
   *
   * @memberof LoginController
   */
  async logout() {
    this.ctx.session.admin = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;
