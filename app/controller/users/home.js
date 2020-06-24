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
    const { id, sourceId } = ctx.session.users;
    const user = await ctx.service.users.user.findId(id);
    const source = await ctx.service.users.source.findId(sourceId);
    await ctx.render('users/index.html', { source, user });
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
