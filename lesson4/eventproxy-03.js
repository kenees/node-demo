/**************
 * @author wangcheng
 * 功能：eventtproxy模块实现异步执行，等所有异步方法执行完毕后，再执行下一个方法；
 * tail方法将handler注册到事件组合上。当注册的多个事件都触发后，将会调用handler执行，每个事件传递的数据，将会依照事件名顺序，传入handler作为参数
 * 如果事件依旧持续触发，将会在每次触发是调用handler，像极了一条尾巴
 *  异步协作
 *  持续型异步协作
 * **************/

let fs = require('fs');
let eventproxy = require('eventproxy');
let ep = new eventproxy();


ep.tail('tpl','data',function (tpl,data) {
    //在所指定的事件发生后，将被执行
    //参数对应各自的事件名的最新数据

    console.log(tpl+data);
});

fs.readFile('data/template.txt','utf-8',function (err,content) {
    console.log('开始tpl事件了');
   ep.emit('tpl',content);
});

setInterval(()=>{
    console.log('开始data事件了');
    fs.readFile('data/template2.txt','utf-8',function (err,content) {
        ep.emit('data',content);
    });
},5000);



