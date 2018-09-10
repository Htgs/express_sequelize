const os = require('os'); 
const utils = {
    isObject: function(objectToCheck) {
        return Object.prototype.toString.call(objectToCheck) === '[object Object]'
    },
    isArray: function(ArrayToCheck) {
        return Object.prototype.toString.call(ArrayToCheck) === '[object Array]'
    },
    isFunction: function(FunctionToCheck) {
        return Object.prototype.toString.call(FunctionToCheck) === '[object Function]'
    },
    isString: function(StringToCheck) {
        return Object.prototype.toString.call(StringToCheck) === '[object String]'
    },
    isBoolean: function(BooleanToCheck) {
        return Object.prototype.toString.call(BooleanToCheck) === '[object Boolean]'
    },
    /**
     * [htmlspecialchars 编辑器内容特殊符号编码]
     * @Author   szh
     * @DateTime 2017-12-11
     * @param    {string}   str [编辑器内容]
     * @return   {string}       [编码后的编辑器内容]
     */
    htmlspecialchars: function(str) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#039;');
        return str;
    },
    /**
     * [htmlspecialchars_decode 编辑器内容特殊符号解码]
     * @Author   szh
     * @DateTime 2017-12-11
     * @param    {string}   str [编辑器内容]
     * @return   {string}       [解码后的编辑器内容]
     */
    htmlspecialchars_decode: function(str) {
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, "''");
        str = str.replace(/&#039;/g, "'");
        return str;
    },
    /**
     * [simpleSQLData 简化sequelize返回的数据库数据]
     * @Author   szh
     * @DateTime 2017-12-15
     * @param    {Obj||Arr}   data [sequelize数据库对象]
     * @return   {Obj||Arr}        [简化后的数据]
     */
    simpleSQLData: function(data) {
        return JSON.parse(JSON.stringify(data));
    },
    /**
     * [nowDate 返回一个当前日期格式化的字符串]
     * @Author   szh
     * @DateTime 2017-12-18
     * @return   {String}   [日期格式化的字符串]
     */
    nowDate: function() {
        let date = new Date();
        let M = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let d = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}` ;
        let h = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}` ;
        let m = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}` ;
        let s = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}` ;
        return `${date.getFullYear()}-${M}-${d} ${h}:${m}:${s}`;
    },
    /**
     * [getTime 返回时间戳]
     * @Author   szh
     * @DateTime 2018-01-09
     * @param    {String}   date [日期字符串]
     * @return   {Number}        [时间戳]
     */
    getTime: function(date) {
        if (!date) {
            let da = new Date();
            let M = (da.getMonth() + 1) >= 10 ? da.getMonth() + 1 : `0${da.getMonth() + 1}`;
            let d = da.getDate() >= 10 ? da.getDate() : `0${da.getDate()}` ;
            date = `${da.getFullYear()}-${M}-${d}`
        }
        return new Date(date).getTime()
    },
    /**
     * [resetObject 处理后台返回存在对象的表格数据]
     * @Author   szh
     * @DateTime 2017-12-11
     * @param    {Object}   objectToHandle [后台返回的存在关联模型查询数据]
     * @return   {Obejct}                  [把关联模型的数据整合到当前对象的数据]
     */
    resetObject: function(objectToHandle) {
        // 如果当前对象的属性中存在对象，则将属性中的对象的属性变为当前对象的属性
        let obj = {}
        for (let i in objectToHandle) {
            if (objectToHandle[i] === null || objectToHandle[i] === undefined) {
                obj[i] = objectToHandle[i]
                continue
            }
            if (utils.isObject(objectToHandle[i])) {
                obj = Object.assign({}, obj, utils.resetObject(objectToHandle[i]))
            } else {
                obj[i] = objectToHandle[i]
            }
        }
        return obj
    },
    /**
     * [judge 判断数据是数组还是对象]
     * @Author   szh
     * @DateTime 2017-12-18
     * @param    {*}   data [sequelize查询的数据]
     * @return   {*}        [如果是数组或者对象进行resetObject方法的处理]
     */
    judge: function(data) {
        if (utils.isArray(data)) {
            let arr = []
            data.forEach(d => {
                arr.push(utils.resetObject(d))
            })
            return arr
        } else if (utils.isObject(data)) {
            return utils.resetObject(data)
        } else {
            return data
        }
    },
    /**
     * [platformTableName 根据平台来决定表名]
     * @Author   szh
     * @DateTime 2018-01-18
     * @param    {String}   tableName [数据库表名]
     * @return   {String}             [转换后的表名]
     */
    platformTableName: function(tableName) {
        let first = tableName.toString().substr(0, 1);
        if (os.platform() === 'linux') {
            first = first.toLocaleUpperCase();
        } else if(os.platform() === 'win32') {
            first = first.toLocaleLowerCase();
        }
        return `${first}${tableName.substr(1)}`
    }
}

module.exports = utils
