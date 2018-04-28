/**
 * @author wangcheng
 * @date 2018/4/28
 * @Description:cookie
 * cookie 虽然很方便，但是使用 cookie 有一个很大的弊端，cookie 中的所有数据在客户端就可以被修改，数据非常容易被伪造，
 * 那么一些重要的数据就不能存放在 cookie 中了，而且如果 cookie 中数据字段太多会影响传输效率。
 * 为了解决这些问题，就产生了 session，session 中的数据是保留在服务器端的。
 */

let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser());
app.get('/',function (req,res) {
    res.cookie('isVisit',1,{maxAge:10*1000});//maxAge:设置cookie过期时间为10s
    res.send('欢迎第一次访问');
});

app.listen(3000,function () {
    console.log('llllll');
})