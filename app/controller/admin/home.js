'use strict';

const Controller = require('../../core/admin_base_controller');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {}; // await ctx.service.site.findOne();
    await ctx.render('admin/home', data);
  }
}

module.exports = HomeController;
