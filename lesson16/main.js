/**
 * @author wangcheng
 * @date 2018/4/28
 * @Description:session
 * session 可以存放在
 * 1）内存、（开发用，除了省事没啥好处）
 * 2）cookie本身、
 * 3）redis 或 memcached 等缓存中，或者
 * 4）数据库中。
 * 线上来说，缓存的方案比较常见，存数据库的话，查询效率相比前三者都太低，不推荐；
 * cookie session 有安全性问题，下面会提到。
 * js客户端无法获取
 */

let express =require('express');
let session = require('express-session');
let redisStore = require('connect-redis')(session);


let app = express();
app.listen(5000,()=>{
    console.log('启动成功');
});
/**express-session 默认使用内存来存 session，对于开发调试来说很方便**/
// app.use(session({
//     secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
//     cookie: { maxAge: 60 * 1000 }//有效期为60秒
// }));

/**在 redis 中存储 session  **/
// session 存放在内存中不方便进程间共享，因此可以使用 redis 等缓存来存储 session。
app.use(session({
    // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
    // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
    // 编写自己的 store 也很简单
    store: new redisStore(),
    secret: 'somesecrettoken',
    resave: false
}));

app.get('/',(req,res)=>{
    if (req.session.isVisit){
        req.session.isVisit++;
        res.send('欢迎第'+req.session.isVisit+'次来到本页面');
    }else{
        req.session.isVisit = 1;
        res.send('欢迎第一次来到本页面');
    }
});