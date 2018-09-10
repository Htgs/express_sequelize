const fs = require('fs');
const path = require('path');

const basename = path.basename(__dirname);

const filepath = file => path.join(__dirname, file);

let routeModel = {}

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		if (file.indexOf('index') === -1) {
			routeModel[path.basename(filepath(file), '.js')] = require(filepath(file))
		}
	});
module.exports = routeModel;
