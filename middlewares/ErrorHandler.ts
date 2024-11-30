import Koa from 'koa';
import { Context } from '@interfaces/IKoa';
import { Logger } from 'log4js';

class ErrorHandler {
  static error(app: Koa, logger: Logger) {
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);
        ctx.body = '500请求啦~恢复中.';
      }
    });

    // MPA和SPA的结合的话 这个中间件就没有用了
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      await next();
      if (ctx.status !== 404) {
        return;
      }
      logger.error('404');
      ctx.body =
        '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }
}
export default ErrorHandler;
