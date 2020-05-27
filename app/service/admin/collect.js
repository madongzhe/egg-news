'use strict';
const cheerio = require('cheerio');
const Service = require('egg').Service;
// const iconv = require('iconv-lite');

// 文件存储
const fs = require('fs');
const path = require('path');
// const awaitWriteStream = require('await-stream-ready').write;
// const sendToWormhole = require('stream-wormhole');

class CollectService extends Service {

  /**
   * 查询采集媒体
   *
   * @param {*} id 、
   * @return {*} 结果
   * @memberof CollectService
   */
  async selone(id) {
    const res = await this.ctx.model.Collect.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  /**
   * 获取采集器列表
   *
   * @param {number} [page=1] 第几页
   * @param {number} [size=10] 每页行数
   * @return {*} /
   * @memberof CollectService
   */
  async list(page = 1, size = 10) {
    const res = await this.ctx.model.Collect.findAndCountAll({
      offset: size * (page - 1),
      limit: size,
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }

  /**
   * 添加采集器
   *
   * @param {string} name //标题
   * @param {string} url // 采集网址
   * @param {int} category 文章分类
   * @param {int} sourceId 文章来源
   * @param {string} listrule  采集文章列表规则
   * @param {string} titlerule  采集文章标题规则
   * @param {string} articlerule 采集文章内容规则
   * @param {int} [state=1] 采集状态
   * @return {*} //结果
   * @memberof CollectService
   */
  async add(name, url, category, sourceId, listrule, titlerule, articlerule, state = 0) {
    const collect = await this.ctx.model.Collect.create({
      name,
      url,
      category,
      sourceId,
      listrule,
      titlerule,
      articlerule,
      state,
    });
    if (!collect) {
      this.ctx.throw(404, 'site not found');
    }
    return collect;
  }

  /**
   * 修改
   *
   * @param {string} id 采集id
   * @param {string} name 采集名称
   * @param {string} url 采集地址
   * @param {int} category 采集分类
   * @param {int} sourceId 采集来源
   * @param {string} listrule 采集文章列表规则
   * @param {string} titlerule 采集文章标题规则
   * @param {string} articlerule 采集文章内容规则
   * @param {int} [state=1] 采集状态
   * @return {*} 结果
   * @memberof CollectService
   */
  async edit(id, name, url, category, sourceId, listrule, titlerule, articlerule, state = 0) {
    const collect = await this.ctx.model.Collect.update({
      name,
      url,
      category,
      sourceId,
      listrule,
      titlerule,
      articlerule,
      state,
    },
    {
      where: {
        id,
      },
    });
    if (!collect) {
      this.ctx.throw(404, 'site not found');
    }
    return collect;
  }

  /**
   * 是否开始采集
   *
   * @param {*} id 修改id
   * @param {number} [state=0] 状态
   * @return {*} 结果
   * @memberof CollectService
   */
  async state(id, state = 0) {
    const collect = await this.ctx.model.Collect.update({
      state,
    },
    {
      where: {
        id,
      },
    });
    if (!collect) {
      this.ctx.throw(404, 'site not found');
    }
    return collect;
  }
  /**
   * 删除
   *
   * @param {*} id 删除id
   * @return {*} 结果
   * @memberof CollectService
   */
  async del(id) {
    const article = await this.ctx.model.Collect.destroy({
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
   * 采集文章列表
   *
   * @param {string} url //采集网址
   * @param {string} reg //采集规则
   * @return {array} //
   * @memberof CollectService
   */
  async collectList(url, reg) {
    const result = await this.ctx.curl(url, { dataType: 'text' });
    if (result.status === 200) {
      const arrurl = url.split('/');
      arrurl.length = 3;
      const resurl = arrurl.join('/');
      // 抓取数据
      const htmlData = result.data.toString();
      // console.log(htmlData);
      // 解析数据
      const $ = cheerio.load(htmlData, { decodeEntities: false });
      const list = [];
      $(reg).each((i, item) => {
        const listurl = $(item).attr('href');
        if (listurl) {
          list.push(listurl.indexOf('//') !== -1 ? listurl : listurl.substr(0, 1) === '/' ? resurl + listurl : resurl + '/' + listurl);
        }
      });
      return list;
    }
    return [];
  }

  /**
   * 采集文章内容和标题
   *
   * @param {string} url //采集网址
   * @param {string} titlereg //标题采集规则
   * @param {string} reg //采集规则
   * @return {string} //返回文章内容
   * @memberof CollectService
   */
  async collectArticle(url, titlereg, reg = '') {
    const { ctx } = this;
    const headers = {
      'Content-Type': 'application/json; encoding=utf-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
    };
    ctx.logger.info('采集文章：' + url);
    let result;
    try {
      result = await this.ctx.curl(url, { dataType: 'text', headers });
    } catch (error) {
      result = '';
      ctx.logger.info('采集文章失败：' + error);
    }
    const arrurl = url.split('/');
    arrurl.length = 3;
    const resurl = arrurl.join('/');
    // 抓取数据
    const htmlData = result.data.toString();
    // 解析数据
    const $ = cheerio.load(htmlData, { decodeEntities: false });
    const title = $(titlereg).text();
    // console.log(title);
    const cont = $(reg).html();
    const content = await this.downimg(cont, resurl);
    return { title, content };
  }

  /**
   * 获取文章中远程图片地址替换成本地地址
   *
   * @param {*} str //文章内容
   * @param {*} resurl //请求文章域名
   * @return {string} // 返回远程图片地址替换后的文章内容
   * @memberof CollectService
   */
  async downimg(str, resurl) {
    const { ctx } = this;
    // 解析数据
    const $ = cheerio.load(str, { decodeEntities: false });
    const imgurl = [];
    $('img').each((index, item) => {
      const img = $(item).attr('src');
      ctx.logger.info('采集图片：' + img);
      if (img.indexOf('//') !== -1) {
        imgurl.push(img);
      } else {
        resurl = resurl + img.substr(0, 1) === '/' ? img : '/' + img;
        imgurl.push(resurl);
      }
    });
    for (let index = 0; index < imgurl.length; index++) {
      const res = await this.upimg(imgurl[index]);
      const reg = new RegExp(imgurl[index], 'g');
      str = str.replace(reg, res);
    }
    return str;
  }

  /**
   * 远程图片保存到本地
   *
   * @param {*} imgurl //
   * @return {*} //返回本地图片地址
   * @memberof CollectService
   */
  async upimg(imgurl) {
    const { ctx } = this;
    const dataBuffer = await ctx.curl(imgurl);
    const stream = dataBuffer.res.data;
    // const filesize = stream.length;
    // 文件名:随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    // if (stream.headers.content-type.split('/')[0] !== 'image') {
    //   return;
    // }
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(imgurl).toLocaleLowerCase() || '.jpg';
    // 图片存放在静态资源upload文件夹下
    const file = new Date().getFullYear() + '' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1));
    const target = path.join(this.config.baseDir, 'app/upload/' + file + '/', filename);
    ctx.helper.dirExists('app/upload/' + file + '/');
    // 生成一个文件写入 文件流
    // const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      fs.writeFile(target, stream, 'binary', function(err) {
        if (err) {
          ctx.logger.error('保存图片失败:' + err);
          console.log('保存图片失败:' + err);
          return imgurl;
        }
      });
      // await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      // await sendToWormhole(stream);
      return;
    }
    return this.config.http_img + '/public/' + file + '/' + filename;
  }
  /**
   * 采集器
   *
   * @memberof CollectService
   */
  async collect() {
    const { ctx } = this;
    ctx.logger.info('开始采集');
    const collect = await this.ctx.model.Collect.findAll({
      where: {
        state: 1,
      },
    });
    for (let i = 0; i < collect.length; i++) {
      const collectLists = await this.collectList(collect[i].url, collect[i].listrule); // 采集文章列表
      try {
        for (let index = 0; index < collectLists.length; index++) {
          const collecturl = collectLists[index];
          if (collecturl.length > 10) {
            const iscollecturl = await ctx.model.Article.findOne({
              where: {
                collecturl,
              },
            });
            if (iscollecturl) {
              ctx.logger.info('采集重复,放弃采集：' + collecturl);
            } else {
              const { title, content } = await this.collectArticle(collecturl, collect[i].titlerule, collect[i].articlerule);
              if (title.length > 1 && content.length > 1) {
                const res = await this.service.admin.article.add(title, content, collect[i].sourceId, collect[i].category, collecturl);
                await ctx.helper.delay(100);
                if (res) {
                  ctx.logger.info('保存成功');
                } else {
                  ctx.logger.info('保存失败');
                }
              } else {
                ctx.logger.info('采集内容失败');
              }
            }
          } else {
            ctx.logger.info('获取内容页网址失败');
          }
        }
      } catch (error) {
        ctx.logger.info(collect[i].name + '-采集器报错：' + error);
      }
    }
    return 1;
  }

  /**
   * 测试采集文章内容
   *
   * @param {*} url //采集页网址
   * @param {string} [reg=''] //采集内容规则
   * @return {*} //
   * @memberof CollectService
   */
  async ceshi_collectArticle(url, reg = '') {
    const headers = {
      'Content-Type': 'application/json; encoding=utf-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
    };
    const result = await this.ctx.curl(url, { dataType: 'text', headers });
    // 抓取数据
    const htmlData = result.data.toString();
    // 解析数据
    const $ = cheerio.load(htmlData, { decodeEntities: false });
    const cont = $(reg).html();
    return cont;
  }
}

module.exports = CollectService;
