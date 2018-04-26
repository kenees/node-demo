/**************
 * @author wangcheng
 * 功能：通过benchmark测试代码速率
 *      输出的是每秒执行次数，越大越好
 * **************/

let Benchmark = require('benchmark');
let suite = new Benchmark.Suite;

let test1 = function () {
    let str = '';
    let count = 10000;
    while (count--){
        str+='a';
    }
};

let test2 = function () {
    let arr=[];
    let count = 10000;
    while (count--){
        arr.push('a');
    }
    arr = arr.join('');
};

suite.add('concat#test',function () {
    test1();
}).add('join#test',function () {
    test2();
}).on('cycle',function (event) {
    console.log(String(event.target));//每秒钟执行的次数，越大越好
}).run('async',true);