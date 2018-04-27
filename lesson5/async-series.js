/**
 * @author wangcheng
 * @date 2018/4/26
 * @Description:
 *          series(tasks,[callback])
 *          多个函数从上到下依次执行，相互之间没有数据交互
 *          如果中途发生错误,则将错误传递到回调函数,并停止执行后面的函数
 */
let async = require('async');

let task1 =function(callback){

    console.log("task1");
    callback(null,"task1")
}

let task2 =function(callback){

    console.log("task2");
    callback('err',"task2")
}

let task3 =function(callback){

    console.log("task3");
    callback(null,"task3")
}

async.series([task1,task2,task3],function(err,result){

    console.log("series");

    if (err) {
        console.log(err);
    }

    console.log(result);
});