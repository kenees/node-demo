/**
 * @author wangcheng
 * @date 2018/4/26
 * @Description:
 *    eventtproxy模块实现异步执行，等所有异步方法执行完毕后，再执行下一个方法；
 *    all方法将handler注册到事件组合上。当注册的多个事件都触发后，将会调用handler执行，每个事件传递的数据，将会依照事件名顺序，传入handler作为参数
 *        异步协作
 *        多类型异步协作
 */
let fs = require('fs');
let eventproxy = require('eventproxy');
let ep = new eventproxy();

//渲染页面需要数据和模板 假设都需要异步获取

ep.all('tpl','data',function (tpl,data) {
    //所有指定事件触发后，将被调用
    //参数对应各自的事件名
    console.log('两个文件都读完了哈哈');
    console.log(tpl);
    console.log(data);
});

//这是第一种类型
fs.readFile('template.txt','utf-8',function (err,content) {
    console.log('同时准备读取');
    setTimeout(function () {
        console.log('开始读文件1了');
        ep.emit('tpl',content);
    },5000);
});
//这是第二种类型，可以是读取数据库
fs.readFile('template2.txt','utf-8',function (err,content) {
    console.log('同时准备读取');
    setTimeout(function () {
        console.log('开始读文件2了');
        ep.emit('data',content);
    },10000);
});

