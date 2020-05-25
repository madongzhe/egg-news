'use strict';

const Service = require('egg').Service;

class LinkService extends Service {

  /**
   * 友情链接列表
   *
   * @return {*} //返回列表
   * @memberof LinkService
   */
  async list() {
    const res = this.ctx.model.Link.findAll();
    return res;
  }

  /**
   * 添加友情链接
   *
   * @param {string} linkName 链接名称
   * @param {string} linkUrl 链接网址
   * @return {*} 结果
   * @memberof LinkService
   */
  async add(linkName, linkUrl) {
    const res = this.ctx.model.Link.create({
      linkName,
      linkUrl,
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }

  /**
   * 编辑分类
   *
   * @param {int} id 主键id
   * @param {string} nlinkName 链接名称
   * @param {string} linkUrl 链接网址
   * @return {*} 结果
   * @memberof LinkService
   */
  async edit(id, nlinkName, linkUrl) {
    const res = this.ctx.model.Link.update({
      nlinkName,
      linkUrl,
    }, {
      where: {
        id,
      },
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }
}
module.exports = LinkService;
