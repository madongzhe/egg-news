'use strict';

const Service = require('egg').Service;
const { Op, literal } = require('sequelize');
class ArticleService extends Service {

  /**
   * 文章
   *
   * @param {int} id 文章id
   * @return {JSON} //查新结果
   * @memberof ArticleService
   */
  async article(id) {
    this.ctx.model.Category.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'categoryId', targetKey: 'id' });
    this.ctx.model.Source.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Source, { foreignKey: 'sourceId', targetKey: 'id' });
    const article = await this.ctx.model.Article.findOne({
      include: [{ model: this.ctx.model.Category, attributes: ['name', 'englishName'] }, { model: this.ctx.model.Source, attributes: ['sourceName', 'mediaLogo'] }],
      where: {
        id,
      },
    });
    if (!article) {
      this.ctx.throw(404, 'site not found');
    }
    await this.addlook(id);
    return article;
  }

  /**
   * 浏览量
   *
   * @param {*} id 文章id
   * @return {*} 结果
   * @memberof ArticleService
   */
  async addlook(id) {
    const article = await this.ctx.model.Article.update({
      look: literal('look + 1'),
    }, {
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
   * 分页查询文章
   *
   * @param {int} page // 第几页
   * @param {int} size // 每页条数
   * @param {int} status // 1正常2采集3临时采集4回收站
   * @return {array} // 结果
   * @memberof GoodsService
   */
  async articleList(page = 1, size = 10, status = 1) {
    this.ctx.model.Category.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'categoryId', targetKey: 'id' });
    this.ctx.model.Source.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Source, { foreignKey: 'sourceId', targetKey: 'id' });
    const List = await this.ctx.model.Article.findAndCountAll({
      attributes: [ 'id', 'title', 'images', 'createdAt', 'category.name' ],
      include: [{ model: this.ctx.model.Category }, { model: this.ctx.model.Source }],
      where: {
        status,
      },
      order: [[ 'createdAt', 'DESC' ]],
      offset: size * (page - 1),
      limit: size,
    });
    if (!List) {
      this.ctx.throw(404, 'site not found');
    }
    return List;
  }

  /**
   * 查询单个媒体文章
   *
   * @param {*} sourceId 媒体id
   * @param {number} [page=1] 第几页
   * @param {number} [size=10] 每页条数
   * @param {number} [status=1] 状态
   * @return {JSON} /
   * @memberof ArticleService
   */
  async articleListUser(sourceId, page = 1, size = 10, status = 1) {
    this.ctx.model.Category.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'categoryId', targetKey: 'id' });
    this.ctx.model.Source.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Source, { foreignKey: 'sourceId', targetKey: 'id' });
    const List = await this.ctx.model.Article.findAndCountAll({
      attributes: ['id', 'title', 'images', 'createdAt', 'category.name'],
      include: [{ model: this.ctx.model.Category }, { model: this.ctx.model.Source }],
      where: {
        sourceId,
        status,
      },
      order: [['createdAt', 'DESC']],
      offset: size * (page - 1),
      limit: size,
    });
    if (!List) {
      this.ctx.throw(404, 'site not found');
    }
    return List;
  }
  /**
   * 分类文章列表
   *
   * @param {*} englishName 英文简写
   * @param {number} [page=1] 页数
   * @param {number} [size=10] 每页条数
   * @param {number} [status=1] 状态
   * @return {*} 结果
   * @memberof ArticleService
   */
  async articleCategoryList(englishName, page = 1, size = 10, status = 1) {
    this.ctx.model.Category.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'categoryId', targetKey: 'id' });
    this.ctx.model.Source.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Source, { foreignKey: 'sourceId', targetKey: 'id' });
    const List = await this.ctx.model.Article.findAndCountAll({
      attributes: ['id', 'title', 'images', 'createdAt', 'category.name'],
      include: [
        { model: this.ctx.model.Category, attributes: ['name', 'englishName'], where: { englishName } },
        { model: this.ctx.model.Source, attributes: ['sourceName'] },
      ],
      where: {
        status,
      },
      order: [['createdAt', 'DESC']],
      offset: size * (page - 1),
      limit: size,
    });
    if (!List) {
      this.ctx.throw(404, 'site not found');
    }
    return List;
  }


  /**
   * 24小时热闻
   *
   * @param {*} englishName 分类英文名称
   * @return {*} 结果
   * @memberof ArticleService
   */
  async hotnews(englishName) {
    const { ctx } = this;
    let res;
    if (englishName) {
      this.ctx.model.Category.hasOne(this.ctx.model.Article);
      this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'categoryId', targetKey: 'id' });
      res = ctx.model.Article.findAll({
        attributes: ['id', 'title', 'images', 'createdAt'],
        include: [
          { model: this.ctx.model.Category, attributes: ['name', 'englishName'], where: { englishName } },
        ],
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
          },
        },
        order: [['look', 'DESC']],
        offset: 0,
        limit: 5,
      });
    } else {
      res = ctx.model.Article.findAll({
        attributes: ['id', 'title', 'images', 'createdAt'],
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
          },
        },
        order: [['look', 'DESC']],
        offset: 0,
        limit: 5,
      });
    }
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }

  /**
   * 关键字搜索
   *
   * @param {*} key 关键字
   * @memberof ArticleService
   */
  async search(key) {
    const res = this.ctx.model.Article.findAll({
      attributes: ['id', 'title', 'createdAt'],
      where: {
        title: {
          // 模糊查询
          [Op.like]: '%' + key + '%',
        },
      },
      order: [['createdAt', 'DESC']],
      offset: 0,
      limit: 30,
    });
    return res;
  }
  /**
   * 媒体文章列表
   * @param {*} sourceId
   * @param {number} [page=1]
   * @param {number} [size=10]
   * @param {number} [status=1]
   * @return
   * @memberof ArticleService
   */
  async sourceArticleList(sourceId, page = 1, size = 10, status = 1) {
    this.ctx.model.Category.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Category, { foreignKey: 'categoryId', targetKey: 'id' });
    this.ctx.model.Source.hasOne(this.ctx.model.Article);
    this.ctx.model.Article.belongsTo(this.ctx.model.Source, { foreignKey: 'sourceId', targetKey: 'id' });
    const List = await this.ctx.model.Article.findAndCountAll({
      attributes: [ 'id', 'title', 'images', 'createdAt', 'category.name' ],
      include: [
        { model: this.ctx.model.Category, attributes: [ 'name', 'englishName' ] },
        { model: this.ctx.model.Source, attributes: [ 'sourceName' ], where: { id: sourceId } },
      ],
      where: {
        status,
      },
      order: [[ 'createdAt', 'DESC' ]],
      offset: size * (page - 1),
      limit: size,
    });
    if (!List) {
      this.ctx.throw(404, 'site not found');
    }
    return List;
  }
}

module.exports = ArticleService;
