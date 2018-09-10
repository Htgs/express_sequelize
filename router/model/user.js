const user = require('express')();

const UserController = require('../../controller/index.js')['user'];

user.get('/user/auth', UserController['auth']);

module.exports = user;
 