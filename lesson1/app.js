let express = require('express');
let utility  = require('utility');

let app = express();

app.get('/',function (req,res) {
    //从req.query里取出参数，如果是post则从req.body里取
    var q = req.query.q;
    // 调用 utility.md5 方法，得到 md5 之后的值
    // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
    // utility 的 github 地址：https://github.com/node-modules/utility
    // 里面定义了很多常用且比较杂的辅助方法，可以去看看
    var md5Value = utility.md5(q);
    res.send(md5Value);
});

app.listen(3000,function () {
    console.log('app is running at port 3000:http://localhost:3000/?q=alsotang');
})