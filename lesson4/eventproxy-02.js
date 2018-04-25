/**************
 * @author wangcheng
 * 功能：eventtproxy模块实现异步执行，等所有异步方法执行完毕后，再执行下一个方法；
 * all方法将handler注册到事件组合上。当注册的多个事件都触发后，将会调用handler执行，每个事件传递的数据，将会依照事件名顺序，传入handler作为参数
 *  异步协作
 *  重复异步协作
 * **************/

let fs = require('fs');
let eventproxy = require('eventproxy');
let ep = new eventproxy();


let files = ['data/template.txt','data/template2.txt','data/template3.txt','data/template4.txt'];
console.log(files.length);
ep.after('got_file',files.length,function (list) {
    //所有指定事件触发后，将被调用
    //参数对应各自的事件名
    console.log('两个文件都读完了哈哈');
    console.log(list);
});

for (let i=0;i<files.length;i++){
    fs.readFile(files[i],'utf-8',function (err,content) {
        if(err){
            console.log(222);
        }
        console.log('同时准备读取');
        console.log('开始读文件'+i+'了');

        ep.emit('got_file',content);
    });
     console.log('000');
 }



