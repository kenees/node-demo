/**************
 * @author wangcheng
 * 功能：eventtproxy模块实现异步执行，等所有异步方法执行完毕后，再执行下一个方法；
 * tail方法将handler注册到事件组合上。当注册的多个事件都触发后，将会调用handler执行，每个事件传递的数据，将会依照事件名顺序，传入handler作为参数
 * 如果事件依旧持续触发，将会在每次触发是调用handler，像极了一条尾巴
 *  异常处理
 * **************/

let fs = require('fs');
let eventproxy = require('eventproxy');
let ep = new eventproxy();





