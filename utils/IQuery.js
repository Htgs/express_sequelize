function IQuery(Model) {
	return new IQuery.fn.init(Model)
}

IQuery.fn = IQuery.prototype = {
	/**
	 * [init 初始化]
	 * @Author   szh
	 * @DateTime 2017-12-01
	 * @param    {object}   Model [Model模型]
	 * @return   {object}         [self]
	 */
	init: function (Model) {
		this.Model = Model
		return this
	},
	/**
	 * pagination 分页函数
	 *
	 * @param    {object}  request   req请求对象
	 * @param    {object}  query     自定义查询条件对象
	 * @returns  Promise
	 * @date     2017/11/30
	 * @author   szh
	*/
	pagination: function (request, query = {}) {
		let page = parseInt(request.query.page) || 1 // 页数
		let pageSize = parseInt(request.query.pageSize) || 10 // 每页多少条数据
		let q = Object.assign({}, {
			offset: (page - 1) * pageSize,
			limit: pageSize
		}, query)
		// console.log('pagination --------- ', q)
		return new Promise((resolve, reject) => {
			this.Model.findAndCountAll(q)
			.then(model => {
				let res = {
					currentPage: page,
					totalPage: Math.ceil(model.count/pageSize),
					pageSize: pageSize,
					total: model.count,
					data: model.rows
				}
				resolve(res)
			})
			.catch(err => {
				reject(err);
			})
		})
	},
	/**
	 * [getDataById 根据id获取数据]
	 * @Author   szh
	 * @DateTime 2017-12-01
	 * @param    {String}   id    数据的id
	 * @param    {object}   query 自定义查询条件对象
	 * @return   {object}         Promise
	 */
	getDataById: function (id, query = {}) {
		let q = Object.assign({}, query)
		return new Promise((resolve, reject) => {
			this.Model.findById(id, query)
			.then(model => {
				resolve(model);
			})
			.catch(err => {
				reject(err);
			})
		})
	},
	/**
	 * [upDateById 根据id更新数据]
	 * @Author   szh
	 * @DateTime 2017-12-05
	 * @param    {object}   data    req的数据对象
	 * @param    {String}   id      数据的id
	 * @param    {Object}   query   自定义查询条件对象
	 * @return   {object}           Promise对象
	 */
	upDateById: function (data, id, query = {}) {
		let updateFields = []
		for (let i in data) {
			if (data[i] !== null) {
				updateFields.push(i)
			}
		}
		let q = {
			where: {
				id: id
			},
			fields: updateFields
		}
		q = Object.assign(q, query);
		return new Promise((resolve, reject) => {
			this.Model.update(data, q)
			.then(model => {
				resolve(model);
			})
			.catch(err => {
				reject(err);
			})
		})
	}
}

IQuery.fn.init.prototype = IQuery.prototype

module.exports = IQuery
