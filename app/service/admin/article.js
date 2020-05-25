'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');

class ArticleService extends Service {

  /**
   * 查询文章
   *
   * @param {int} id // 文章id
   * @return {*} // 结果
   * @memberof ArticleService
   */
  async article(id) {
    const article = await this.ctx.model.Article.findOne({
      where: {
        id,
      },
    });
    if (!article) {
      this.ctx.throw(404, 'site not found');
    }
    return article;
  }

  /**
   * 添加文章
   *
   * @param {string} title // 标题
   * @param {string} content // 文章内容
   * @param {string} sourceId // 文章来源
   * @param {int} category // 文章分类
   * @param {string} collecturl // 文章来源网址
   * @return {*} //
   * @memberof ArticleService
   */
  async add(title, content, sourceId, category, collecturl = '') {
    const $ = cheerio.load(content, { decodeEntities: false });
    const listurl = [];
    $('img').each((i, item) => {
      listurl.push($(item).attr('src'));
    });
    const res = await this.ctx.model.Article.create({
      title,
      content,
      sourceId,
      collecturl,
      categoryId: category,
      images: listurl.join(','),
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }

  /**
   * 修改文章
   *
   * @param {string} title // 标题
   * @param {string} content // 文章内容
   * @param {string} sourceId // 文章来源
   * @param {int} category // 文章分类
   * @param {int} id // 修改文章id
   * @return {*} //
   * @memberof ArticleService
   */
  async edit(title, content, sourceId, category, id) {
    const $ = cheerio.load(content, { decodeEntities: false });
    const listurl = [];
    $('img').each((i, item) => {
      listurl.push($(item).attr('src'));
    });
    const res = await this.ctx.model.Article.update({
      title,
      content,
      sourceId,
      categoryId: category,
      images: listurl.join(','),
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

  /**
   * 分页查询文章
   *
   * @param {int} page // 第几页
   * @param {int} size // 每页条数
   * @param {int} status // 1正常2采集3临时采集4回收站
   * @param {int} category // 分类
   * @return {array} // 结果
   * @memberof GoodsService
   */
  async articleList(page = 1, size = 10, status = 1, category = null) {
    // this.ctx.model.Category.hasOne(this.ctx.model.Article, { foreignKey: 'category_id', sourceKey: 'id' });
    this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'category_id', targetKey: 'id' });
    let List;
    if (category) {
      List = await this.ctx.model.Article.findAndCountAll({
        attributes: [ 'id', 'title', 'createdAt', 'category.name' ],
        where: {
          category_id: category,
          status,
        },
        order: [[ 'createdAt', 'DESC' ]],
        offset: size * (page - 1),
        limit: size,
      });
    } else {
      List = await this.ctx.model.Article.findAndCountAll({
        attributes: [ 'id', 'title', 'createdAt', 'category.name' ],
        include: [{ model: this.ctx.model.Category }],
        where: {
          status,
        },
        order: [[ 'createdAt', 'DESC' ]],
        offset: size * (page - 1),
        limit: size,
      });
    }
    // const count = await this.listCount(category, status);
    return List;
  }

  /**
   * 删除文章
   *
   * @param {int} id 文章id
   * @return {*} 结果
   * @memberof ArticleService
   */
  async articleDel(id) {
    const article = await this.ctx.model.Article.destroy({
      where: {
        id,
      },
    });
    if (!article) {
      this.ctx.throw(404, 'site not found');
    }
    return article;
  }
}

module.exports = ArticleService;
