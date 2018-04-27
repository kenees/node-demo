/**
 * @author wangcheng
 * @date 2018/4/26
 * @Description:
 *          parallel(tasks,[callback])
 *          多个函数并行执行，不会等待其他函数
 *          如果中途出错,则立即将err和值传到最终的回调函数,其他未执行完毕的函数将不再执行,但是要占一个位置
 *          在1000之前task3执行了，task2也执行了，但是task1还未执行，所以返回的result没有值，但是占了一个位置
 */

let async = require('async');


var task1 = function (callback) {
    console.log('task1');
    setTimeout(function () {
        callback(null,"task1");
    },3000);
};

var task2 = function (callback) {
    console.log('task2');
    setTimeout(function () {
        callback("errmessage","task2");
    },1000);
};

var task3 = function (callback) {
    console.log('task3');
    setTimeout(function () {
        callback(null,"task3");
    },500);
};

console.time("parallel方法");

async.parallel([task1,task2,task3],function (err,result) {
    console.log('parallel');
    if (err){
        console.log(err);
    }
    console.log(result);
    console.timeEnd("parallel方法");
});