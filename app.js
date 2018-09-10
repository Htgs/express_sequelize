const fs = require('fs');
const path = require('path');
const express = require('express');

// 中间件
const bodyParser = require('body-parser');
const session = require('express-session');
// const favicons = require('connect-favicons');

// 生成日志
const winston = require('winston');
const expressWinston = require('express-winston');

// 引入配置好的Sequelize实例
const sequelize = require('./db/models').sequelize;
// 引入初始化后的 Sequelize session Store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// 引入配置
const config = require('./config/env.js');

const app = express();

if (config.gz) { // 服务端，nodejs是否启用gz
	const compression = require('compression');
	app.use(compression());
}
app.use(bodyParser.json());// 解析 application/json类型数据
app.use(bodyParser.urlencoded({extended: true}));// 解析 application/x-www-form-urlencoded类型数据
// app.use(multer({ dest: '/public/uploads'}));// 解析 multipart/form-data类型数据

// 引入路由
const router = require('./router');

// ejs页面模板
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// 配置静态资源文件路径
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(favicons(path.join(__dirname, 'favicon.ico')));
// app.use(favicons());
app.use(express.static('public'));
app.use('/static', express.static('static'));
// 自动创建日志文件
let logs = path.join(__dirname, 'logs')
if (!fs.existsSync(logs)) { // 判断日志文件夹是否存在，不存在则自动添加
	fs.mkdirSync(logs);
}
if (!fs.existsSync(path.join(logs, 'success.log'))) {
	fs.writeFileSync(path.join(logs, 'success.log'), '');
}
if (!fs.existsSync(path.join(logs, 'error.log'))) {
	fs.writeFileSync(path.join(logs, 'error.log'), '');
}

// 使用session
app.use(session({
	name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true,// 强制更新 session
	saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
	rolling: true,
	cookie: {
		maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new SequelizeStore({// 将 session 存储到 mysql
		db: sequelize,
		// 可以设置存储到sessions表中
		// table: 'sessions',
		// extendDefaultFields: (defaults, session) => {
		// 	return {
		// 		data: defaults.data,
		// 		expires: defaults.expires,
		// 		'user_id': session.user_id
		// 	}
		// }
	})
}))

// 生成成功日志
app.use(expressWinston.logger({
	transports: [
		// 打印
		// new (winston.transports.Console)({
		// 	json: true,
		// 	colorize: true
		// }),
		new winston.transports.File({
			filename: 'logs/success.log'
		})
	]
}))

// 初始化路由
router(app);

// 设置定时器，定时更新任务信息
// const overdueTask = require('./controller/task')['overdueTask'];

// setInterval(function () {
// 	let date = new Date();
//     let M = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
//     let d = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}` ;
// 	overdueTask()
// 	.then(resolve => {
// 		console.log(`${date.getFullYear()}-${M}-${d} 00:00:00`);
// 	})
// }, 60 * 60 *24);

// 生成错误日志
app.use(expressWinston.errorLogger({
	transports: [
		// new (winston.transports.Console)({
		// 	json: true,
		// 	colorize: true
		// }),
		new winston.transports.File({
			filename: 'logs/error.log'
		})
	]
}))

app.listen(config.port, () => {
	console.log(`listen at http://localhost:${config.port}`);
});
