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
    const { username, password } = ctx.request.body;
    ctx.logger.info('登录信息:' + ctx.request.body);
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const res = await ctx.service.admin.login.login(username, pwd);
    if (res) {
      ctx.logger.info('登录成功');
      ctx.body = {
        code: '200',
        data: '',
        msg: '登录成功',
      };
    } else {
      ctx.logger.info('登录失败');
      ctx.body = {
        code: '000',
        data: '',
        msg: '登录失败',
      };
    }
  }

  /**
   * 退出登录
   *
   * @memberof LoginController
   */
  async logout() {
    this.ctx.session.user = null;
    this.ctx.redirect('/login');
  }
}

module.exports = LoginController;
