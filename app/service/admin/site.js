'use strict';

const Service = require('egg').Service;

class SiteService extends Service {

  /**
   * 网站信息
   *
   * @return {JSON} //返回值
   * @memberof SiteService
   */
  async index() {
    const site = await this.app.model.Site.findOne();
    if (!site) {
      this.ctx.throw(404, 'site not found');
    }
    return site;
  }


  /**
   * 修改网站设置
   *
   * @param {int} id 修改id
   * @param {string} name 网站名称
   * @param {string} domain 网站域名
   * @param {string} statistics 网站统计
   * @return {*} 结果
   * @memberof SiteService
   */
  async edit(id, name, domain, statistics) {
    const site = await this.app.model.Site.update({
      name,
      domain,
      statistics,
    },
    {
      where: {
        id,
      },
    });
    if (!site) {
      this.ctx.throw(404, 'site not found');
    }
    return site;
  }
}

module.exports = SiteService;
