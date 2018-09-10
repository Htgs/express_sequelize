const path = require('path')

module.exports = {
	// 图片上传路径
	imgUploads: path.join(__dirname, '..', 'public', 'uploadImgs'),
	// 文件上传路径
	fileUploads: path.join(__dirname, '..', 'public', 'uploadFiles'),
	// 端口
	port: 3000,
	// session配置
	session: {
		secret: 'nodesql',
		key: 'nodesql',
		maxAge: 2480000
	},
	isServer: false,
	gz: false,
}
