'use strict';

const Controller = require('egg').Controller;
class BaseController extends Controller {
  async verify() {
    const { ctx } = this;
    const captcha = await this.service.tools.captcha(); // 服务里面的方法
    ctx.response.type = 'image/svg+xml'; // 知道你个返回的类型
    ctx.body = captcha.data; // 返回一张图片
  }
}

module.exports = BaseController;
