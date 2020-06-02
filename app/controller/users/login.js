'use strict';

const Controller = require('../../core/base_controller');

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
    ctx.helper.success();
  }

  /**
   * 用户注销
   *
   * @memberof LoginController
   */
  async logout() {
    const { ctx } = this;
    ctx.session.users = null;
    ctx.redirect('/login');
  }
}

module.exports = LoginController;
