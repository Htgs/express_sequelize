express项目结构 nodejs + express + sequelize + mysql

目录结构

```
  根目录
  |-config                 // 项目配置
  |      |-env.example.js  // 项目环境例子
  |-db                     // 数据库 具体请看 sequelize-cli
  |      |- config
  |      |- migrations
  |      |- models
  |      |- seeders
  |-controller             // 控制器 主要业务逻辑文件
  |      |- index.js       // 控制器 入口
  |      |- user.js
  |      |- ...
  |-logs                   // 日志
  |      |- success.log
  |      |- error.log
  |-middlewares            // 中间件
  |-public                 // 前端静态资源
  |-router                 // 路由
  |      |- index.js       // 后台路由入口
  |-test                   // 测试
  |-static                 // 前端静态资源文件
  |-uilts                  // 工具
  |-.sequelizerc           // sequelize配置
  |-app.js                 // 项目入口文件
  |-package.json
  |-README.md
```

项目运行
```bash
  npm i --save-dev
  npm i sequelize-cli -g // sequelize的手脚架
  npm i supervisor -g .. 自动检测js文件变化
  npm start
```

注意:启动前需要在config中配置env.js（参照env.example.js）需要生成数据库
