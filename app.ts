// 定义引用的别名
import { addAliases } from 'module-alias';
addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interfaces`,
  '@config': `${__dirname}/config`,
  '@middlewares': `${__dirname}/middlewares`,
});

import Koa from 'koa';
import config from '@config/index';
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import { configure, getLogger } from 'log4js';
import ErrorHandler from '@middlewares/ErrorHandler';
//koa中没有实现的路由重定向到index.html
import { historyApiFallback } from 'koa2-connect-history-api-fallback';

// ------------ log4js 日志 配置 --------------
configure({
  appenders: {
    cheese: { type: 'file', filename: `${__dirname}/logs/error.log` },
  },
  categories: {
    default: { appenders: ['cheese'], level: 'error' },
  },
});

const { port, viewDir, staticDir, memoryFlag } = config;

const app = new Koa();

const logger = getLogger('cheese');

// ------------ 模板引擎配置 --------------
// co 是为了适配 generator 的语法
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: memoryFlag as 'memory' | false,
    writeBody: false,
    ext: 'html',
  })
);

// ------------ 静态文件配置 --------------
app.use(serve(staticDir));

// 创建容器，这个容器用于存放所有可以被注入的实例
const container = createContainer();
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
// 注册容器
app.use(scopePerRequest(container));

ErrorHandler.error(app, logger);

app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));

// 加载路由，中间需要判断router当中依赖哪些service，然后从container当中取出来，注入到router当中去
// 自动引入了所有的routers
app.use(loadControllers(`${__dirname}/routers/*.ts`));

app.listen(port, () => {
  logger.log('info', '杨风移的BFF Server启动成功');
  console.log('杨风移的BFF Server启动成功');
});
