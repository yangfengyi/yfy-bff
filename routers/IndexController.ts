import { GET, route } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';

// SPA 中转的路由
@route('/')
class IndexController {
  @GET()
  async handleSpaRoute(ctx: Context): Promise<void> {
    //react vue ...html字符串 diff
    ctx.body = await ctx.render('index', {
      data: '服务端数据',
      title: '🍎🍎🍎🍎🍎 杨风移的spa在client下',
    });
  }
}
export default IndexController;
