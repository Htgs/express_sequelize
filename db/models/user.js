'use strict';
module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		name: {
			type:DataTypes.STRING(50),
			validate: {
				len: {
					args: [4,16],
					msg: '用户名长度为4位至16位'
				},
			},
			comment: '用户名'
		},
		password: {
			type: DataTypes.STRING(255),
			validate: {
				is: {
					args: /^.*(?=.{9,})(?=.*\d)(?=.*[a-z]).*$/,
					msg: '密码长度不少于9位，必须包含字母和数字'
				},
			},
			comment: '密码'
		},
		realname: {
			type: DataTypes.STRING(50),
			validate: {
				len: {
					args: [2,16],
					msg: '真实姓名不能小于2个字符'
				},
			},
			comment: '真实姓名'
		},
		gender: {
			type: DataTypes.ENUM('male', 'famale'),
			comment: '性别'
		},
		email: {
			type: DataTypes.STRING(255),
			validate: {
				isEmail: {
					args: true,
					msg: '邮箱格式错误'
				},
			},
			comment: '邮箱'
		},
		phone: {
			type: DataTypes.STRING(50),
			validate: {
				is: {
					args: /^1[34578]\d{9}$/,
					msg: '手机号码格式不对'
				},
			},
			comment: '手机号码'
		},
		birth_date: {
			type: DataTypes.DATEONLY,
			comment: '出生日期'
		},
		avatar: {
			type: DataTypes.STRING(255),
			comment: '头像'
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
		deletedAt: {
			type: DataTypes.DATE,
		},
	}, {
		// 固定表名
		// freezeTableName: false,
		// 创建与更新自动插入时间
		timestamps: true,
		// 使用下划线
		underscored: false,
		// 启用软删除需要
		paranoid: true
	});
	User.associate = function (models) {
		//...associate the models
		// console.log(models)
		// User.belongsToMany(models.Task, {
		// 	through: {
		// 		model: models.User_Task
		// 	},
		// 	foreignKey: 'user_id'
		// });
	};
	return User;
};
