'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
  // 产生验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      inverse: false, // 翻转颜色
      fontSize: 48, // 字体大小
      noise: 2, // 噪声线条数
      width: 100, // 宽度
      height: 40, // 高度
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#e8e3e3', // 验证码图片背景颜色
    });
    this.ctx.session.verify = captcha.text;
    return captcha;
  }
}

module.exports = ToolsService;
