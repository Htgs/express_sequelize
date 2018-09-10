const api = require('express')();
const path = require('path')

const Controller = require('../controller/index.js');
// console.log(Controller)
//  方法名     路径                      方法    作用
//  index      /:model                   get     获取数据列表
//  create     /:model/create            get     获取创建一条新的数据页面
//  store      /:model                   post    保存一条新的数据
//  show       /:model/{model_id}        get     获取对应id的一条新数据
//  edit       /:model/{model_id}/edit   get     获取对应id的数据的编辑页面
//  update     /:model/{model_id}        put     更新对应id的数据
//  destroy    /:model/{model_id}        delete  删除对应id的数据
//  

for (let i in Controller) {
	setModelApi(i, Controller[i])
}

function setModelApi (model, controller) {
	api.param(function(param) {
		return function (req, res, next, val) {
			// 判断如果不是数字类型id的时候，返回404
			if (isNaN(parseInt(val))) {
				res.send(404);
			} else {
				next();
			}
		}
	});
	api.param('id');
	// 当前方法存在时，则添加路由
	controller['index'] && api.get(`/${model}`,controller['index']); // 返回当前表的数据列表，可以包含关联模型也可以不包含关联模型
	// controller['create'] && api.post(`/${model}/create`, log, controller['create']);
	// controller['store'] && api.post(`/${model}`, controller['store']) // 返回新增的数据
	// controller['show'] && api.get(`/${model}/:id`, controller['show']); // 返回查询的数据，查询为null时返回空对象
	// controller['edit'] && api.get(`/${model}/:id/edit`, log, controller['edit']);
	// controller['update'] && api.put(`/${model}/:id`, controller['update']); // 返回更新后的数据，更新为0时返回空对象
	// controller['destroy'] && api.delete(`/${model}/:id`, controller['destroy']); // 返回删除后的数据，删除为0时返回空对象
}

module.exports = api;
