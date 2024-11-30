module.exports = {
  apps: [
    {
      // 应用程序名称
      name: 'yfy-bff-app',

      // 以下是另一种配置方式(已注释)
      // script: './app.ts',                        // 直接指定 TypeScript 入口文件
      // interpreter: './node_modules/.bin/ts-node', // 指定 TypeScript 解释器

      // 指定运行命令为本地安装的 ts-node
      script: './node_modules/.bin/ts-node',
      // 传递给 ts-node 的命令行参数，指定入口文件
      args: '-- ./app.ts',

      // 应用实例数量
      instances: 1,

      // 应用程序运行模式
      // cluster: 集群模式，可以启动多个实例
      // fork: 分叉模式，单实例运行
      exec_mode: 'cluster',

      // 当应用崩溃时自动重启
      autorestart: true,

      // 启用文件监视，当文件变化时自动重启应用
      watch: true,

      // 设置不需要监视的文件和目录
      ignore_watch: ['node_modules', 'logs'],

      // 开发环境的环境变量配置
      env: {
        // 设置 NODE_ENV 环境变量
        NODE_ENV: 'development',
        // 指定 TypeScript 配置文件路径
        TS_NODE_PROJECT: './tsconfig.json',
      },

      // 生产环境的环境变量配置
      env_production: {
        // 生产环境的 NODE_ENV
        NODE_ENV: 'production',
        // 生产环境的 TypeScript 配置文件路径
        TS_NODE_PROJECT: './tsconfig.json',
      },

      // 合并所有实例的日志
      merge_logs: true,

      // 错误日志文件的存储路径
      error_file: './logs/yd-app-error.log',

      // 标准输出日志文件的存储路径
      out_file: './logs/yd-app-out.log',

      // 日志中的时间戳格式
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
