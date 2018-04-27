/**
 * @author wangcheng
 * @date 2018/4/26
 * @Description:这是测试用例
 *      describe 中的字符串，用来描述你要测的主体是什么；it 当中，描述具体的 case 内容。
 *      例如：测试一个数是否大于3      (5).should.above(3)
 *      shouldAPI:https://github.com/tj/should.js
 * @使用方法：1) 全局安装 npm install mocha -g
 *          2) 控制台输入 mocha
 */

var main = require('../main');
var should = require('should');//是个断言库
//描述文字
describe('test/main.test.js11', function () {
    //描述测试模块
    it('should equal 0 when n === 0', function () {
        //开始测试
        main.fibonacci(0).should.equal(0);
    });

    it('should equal 1 when n === 1', function () {
        main.fibonacci(1).should.equal(1);
    });

    it('should equal 55 when n === 10', function () {
        main.fibonacci(10).should.equal(55);
    });

    it('should throw when n > 10', function () {
        // (function () {
        //     main.fibonacci(11);
        // }).should.throw('n should <= 10');
        main.fibonacci(10).should.throw('n should <= 10');
    });

    it('should throw when n < 0', function () {
        (function () {
            main.fibonacci(-1);
        }).should.throw('n should >= 0');
    });

    it('should throw when n isnt Number', function () {
        (function () {
            main.fibonacci('呵呵');
        }).should.throw('n should be a Number');
    });
});
