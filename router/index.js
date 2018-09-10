const path = require('path');
const fs = require('fs');

const config = require('../config/env.js');

const api = require('./api.js');
const routeModel = require('./model');

/**
 * [testPath 判断请求路径是否为后台定义的接口]
 * @Author   szh
 * @DateTime 2018-01-02
 * @param    {string}   path [前端请求路径]
 * @return   {boolean}       [返回true是则判断为后台接口，返回false时则判断为前端路径]
 */
function testPath(path) {
	let models = ['home', 'login']; // 前端页面路径
	let temp = false;
	models.forEach(m => {
		if (path.indexOf(m) > -1) {
			temp = true;
		}
	})
	return temp;
}

module.exports = (app) => { 
	if (config.isServer) {
		app.all('*', function(req, res, next) {
			if (req.method === 'GET') {
				if (testPath(req.path) || req.path === '/') {
					let deviceAgent = req.headers['user-agent'].toLowerCase();
					let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
					if (agentID) {
						// 指到手机、pad的网页
						let indexPage = path.join('./', 'static', 'mobile.html');
						res.set('Content-Type', 'text/html');
						res.send(fs.readFileSync(indexPage));
					} else {
						// 指到pc网页
						let indexPage = path.join('./', 'static', 'pc.html');
						res.set('Content-Type', 'text/html');
						res.send(fs.readFileSync(indexPage));
					}
				} else {
					next();
				}
			} else {
				next();
			}
		});
	}
	// 测试跨域
	app.all('*', function (req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://www.meeting.com');
		res.header('Access-Control-Allow-Headers', "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("Access-Control-Max-Age", "0");
		res.header("X-Powered-By",' 3.2.1');
		res.header("Access-Control-Allow-Credentials",'true');
		res.header("XDomainRequestAllowed",'1');
		res.header("Content-Type", "application/json;charset=utf-8");
		if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
		else next()
	})
	
	// 使用api前缀接口
	app.use('/api', api);

	// 特别的自定义接口
	for (let i in routeModel) {
		app.use(routeModel[i]);
	}
}
