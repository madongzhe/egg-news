'use strict';

const Controller = require('../../core/base_controller');
const crypto = require('crypto');

class RegisterController extends Controller {

  /**
   * 注册页
   *
   * @memberof RegisterController
   */
  async index() {
    const { ctx } = this;
    await ctx.render('user_register.html');
  }

  /**
   * 会员注册
   *
   * @memberof RegisterController
   */
  async post_register() {
    const { ctx } = this;
    const createRule = {
      phone: 'string',
      password: 'password',
      repassword: 'password',
      verify: 'string',
    };
    try {
      ctx.validate(createRule, ctx.request.body);
    } catch (error) {
      ctx.logger.warn(error);
      ctx.helper.fail(422);
      return;
    }
    const { phone, password, repassword, verify } = ctx.request.body;
    const resphone = await ctx.service.users.user.findphone(phone);
    if (resphone) {
      ctx.helper.fail(422, '手机号已注册');
      return;
    }
    if (ctx.session.verify.toUpperCase() !== verify.toUpperCase()) {
      ctx.helper.fail(422, '验证码不正确');
      return;
    }
    // await this.service.tools.captcha(); // 生成新的验证码
    if (password !== repassword) {
      ctx.helper.fail(422, '两次密码不一致');
      return;
    }
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const res = await ctx.service.users.register.registerUser(phone, pwd);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }

  /**
   * 验证手机号是否注册
   *
   * @memberof RegisterController
   */
  async findphone() {
    const { ctx } = this;
    const createRule = {
      phone: 'string',
    };
    try {
      await ctx.validate(createRule);
    } catch (error) {
      ctx.logger.warn(error.error);
      ctx.helper.fail(422, '参数错误');
      return;
    }
    const { phone } = ctx.request.query;
    const res = await ctx.service.users.user.findphone(phone);
    if (res) {
      ctx.helper.error();
      return;
    }
    ctx.helper.success();
  }
}
module.exports = RegisterController;
