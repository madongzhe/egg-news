'use strict';

const Controller = require('egg').Controller;

// 文件存储
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {

  /**
   * 图片上传
   *
   * @memberof UpfileController
   */
  async upimg() {
    const { ctx } = this;
    if (!ctx.session.users) {
      ctx.helper.fail(401, '没有权限');
      return;
    }
    const stream = await ctx.getFileStream();
    const filesize = stream.length;
    // 文件名:随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    if (stream.mimeType.split('/')[0] !== 'image') {
      this.ctx.body = {
        code: 300,
        data: '',
        msg: '上传不是图片',
      };
      return;
    }
    if (filesize > 2 * 1024 * 1024) {
      ctx.helper.fail(400, '上传文件超过2M');
      return;
    }
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    // 图片存放在静态资源public/img文件夹下
    const file = new Date().getFullYear() + '' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1));
    const target = path.join(this.config.baseDir, 'app/upload/' + file + '/', filename);
    ctx.helper.dirExists('app/upload/' + file + '/');
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      // throw err;
      ctx.logger.info(err);
      ctx.helper.fail(400);
      return;
    }
    const imgurl = this.config.http_img + '/public/' + file + '/' + filename;
    this.ctx.body = {
      code: '200',
      data: [ imgurl ],
      msg: '上传成功',
      errno: 0,
    };

  }


  /**
   * 图片列表
   *
   * @memberof UpfileController
   */
  async selimg() {
    const { ctx } = this;
    const ret = await ctx.service.admin.images.Selimg();
    this.ctx.body = {
      code: '200',
      data: ret,
      msg: '成功',
    };
  }
}
module.exports = UploadController;
