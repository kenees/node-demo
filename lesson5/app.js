/**
 * @author wangcheng
 * @date 2018/4/26
 * @Description:
 *      使用async控制并发数，就像不可以一次并发爬1000多个链接。需要控制并发的次数，一次10，慢慢等他爬完就好了。
 *      什么时候使用eventproxy,什么时候使用async？
 *      一般对于并发数小于10个的，我们去使用eventproxy，当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。大部分场景是前者。
 */

var async = require('async');

//首先，我们伪造一个 fetchUrl(url, callback) 函数，这个函数的作用就是，当你通过
//fetchUrl('http://www.baidu.com', function (err, content) {
    // do something with `content`
//});
//调用它时，它会返回 http://www.baidu.com 的页面内容回来。
//当然，我们这里的返回内容是假的，返回延时是随机的。并且在它被调用时，会告诉你它现在一共被多少个地方并发调用着。
// 并发连接数的计数器
var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
    // delay 的值在 2000 以内，是个随机的整数
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    //delay=1000;  便于观察可设置成一样的时间
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒,现在时间'+new Date());
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
};
//我们接着来伪造一组链接
var urls = [];
for(var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}
//接着，我们使用 async.mapLimit 来并发抓取，并获取结果。
//
async.mapLimit(urls, 5,function (url,callback) {
    fetchUrl(url, callback);
},function (err,result) {
    console.log('final:');
    console.log(result);
});