'use strict';

const Controller = require('../../core/base_controller');

class HomeController extends Controller {

  /**
   * 用户个人中心
   *
   * @memberof HomeController
   */
  async index() {
    const { ctx } = this;
    await ctx.render('users/index.html');
  }

  /**
   * 个人主页
   *
   * @memberof HomeController
   */
  async userHome() {
    const { ctx } = this;
    await ctx.render('home/home.html');
  }
}

module.exports = HomeController;
