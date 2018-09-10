const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 引入Models
const BD = require('../db/models');
const User = require('../db/models').User;
const IQuery = require('../utils/IQuery.js')(User);
const {isArray, isString, nowDate, simpleSQLData} = require('../utils/utils.js')

const imgUploadPath = require('../config/env.js')['imgUploads'];// 默认图片路径
// 当上传空的input file的时候，自动存一个空文件
// 在前端上传formdata的时候需要过滤
// 

//  方法名     路径                      方法
//  index      /:model                   get     获取数据列表
//  create     /:model/create            get     获取创建一条新的数据页面
//  store      /:model                   post    保存一条新的数据
//  show       /:model/{model_id}        get     获取对应id的一条数据
//  edit       /:model/{model_id}/edit   get     获取对应id的数据的编辑页面
//  update     /:model/{model_id}        put     更新对应id的数据
//  destroy    /:model/{model_id}        delete  删除对应id的数据
// 

function getHash(password) {
	let hash = crypto.createHash('md5')
		.update(password)
		.digest('hex');
	return hash;
}

let query = {
	attributes: {
		exclude: ['password']
	},
	order: [['id', 'DESC']]
};

// 设置日期，返回某个日期的时间戳
// eg: getTime("2013-8-20 18:20:30")
function getTime(date){  
    d = new Date(date) 
    return d.getTime()
}  

const userController = {
	/**
	 * [index 获取列表页面数据]
	 * @Author   szh
	 * @DateTime 2017-12-05
	 * @param    {Object}   req  express的req
	 * @param    {Object}   res  express的res
	 * @param    {Function} next express的next
	 * @return   {Object}        返回前端数据对象：包含当前页、总页数、每页数据量、全部数据数量、数据列表
	 */
	index: (req, res, next) => {
		let where = {}
		for (let i in req.query) {
			if (i === 'page' || i === 'pageSize') continue
			if (isArray(req.query[i])) {
				where[i] = {
					[Op.gte]: req.query[i][0],
					[Op.lte]: req.query[i][1]
				}
			} else {
				where[i] = {
					[Op.like]: `%${req.query[i]}%`
				}
			}
		}
		let q = {
			where: where,
		}
		q = Object.assign(q, query)
		IQuery.pagination(req, q)
		.then(resolve => {
			res.json(resolve)
		})
	},
}

module.exports = {
	index: userController.index,
	store: userController.store,
	show: userController.show,
	update: userController.update,
	destroy: userController.destroy,
	mIndex: userController.index,
	mStore: userController.store,
	mShow: userController.show,
	mUpdate: userController.update,
	mDestroy: userController.destroy,
	
	/**
	 * [auth 验证用户是否登录]
	 * @Author   szh
	 * @DateTime 2017-12-05
	 * @param    {Object}   req  express的req
	 * @param    {Object}   res  express的res
	 * @param    {Function} next express的next
	 * @return   {Object||String}        返回登录用户的信息或者401
	 */
	auth: (req, res, next) => {
		if (req.session.user) {
			res.send(req.session.user);
		} else {
			res.sendStatus(401);
		}
	},
}
