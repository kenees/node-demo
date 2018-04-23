let express = require('express');
let superagent = require('superagent');
let cheerio = require('cheerio');//类似jq的使用方法
let app = express();

app.get('/',function(req,res,next){
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org').end(function(err,sres){
          if(err){
             return next(err);
          }
          //sres.text里面存储的网页的html内容将它传给 cheerio.load 之后
          // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
          // 剩下就都是 jquery 的内容了
          let $ = cheerio.load(sres.text);
          var items = [];
          $("#topic_list .topic_title").each(function(idx,element){
              var $element = $(element);
              items.push({
                  title:$element.attr('title'),
                  herf:$element.attr('href')
              });
        });
        res.send(items);
    })
});

app.listen(3001,function(){
    console.log('app is running at port 3000: http://localhost:3001/');
});
