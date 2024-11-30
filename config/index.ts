import { extend } from 'lodash';
import { join } from 'path';

let config = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'assets'),
  port: 8081,
  memoryFlag: false, // 控制 koa-swing 是否在内存当中缓存模板，生产环境提交性能，减少模板渲染的次数
};
if (process.env.NODE_NEV === 'development') {
  const localConfig = {
    port: 8081,
  };
  config = extend(config, localConfig);
}
if (process.env.NODE_NEV === 'production') {
  const prodConfig = {
    port: 8082,
    memoryFlag: true,
  };
  config = extend(config, prodConfig);
}

export default config;
