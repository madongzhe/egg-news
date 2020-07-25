'use strict';

const Controller = require('../../core/admin_base_controller');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.admin.home.dashboard();
    await ctx.render('admin/home', { res });
  }
}

module.exports = HomeController;
