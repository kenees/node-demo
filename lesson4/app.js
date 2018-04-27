let express = require('express');
let superagent = require('superagent');
let cheerio = require('cheerio');//类似jq的使用方法
let eventproxy = require('eventproxy');
let url = require('url');

let app = express();

let cnodeUrl = 'https://cnodejs.org'

app.get('/',function(req,res,next){
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get(cnodeUrl).end(function(err,sres){
          if(err){
             return next(err);
          }
          //sres.text里面存储的网页的html内容将它传给 cheerio.load 之后
          // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
          // 剩下就都是 jquery 的内容了
          let $ = cheerio.load(sres.text);
          var topicUrls  = [];
          $("#topic_list .topic_title").each(function(idx,element){
              let $element = $(element);
              let href = url.resolve(cnodeUrl,$element.attr('href'));
              topicUrls .push(href);
        });
       //console.log(topicUrls);
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl).end(function (err,res) {
                ep.emit('topic_html',[topicUrl,res.text]);
            })
        })
           let ep = new eventproxy();
           ep.after('topic_html',topicUrls.length,function (topics) {
               // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
               topics = topics.map(function (topicPair) {
                   var topicUrl = topicPair[0];
                   var topicHtml = topicPair[1];
                   var $ = cheerio.load(topicHtml);
                   return ({
                       title: $('.topic_full_title').text().trim(),
                       href: topicUrl,
                       comment1: $('.reply_content').eq(0).text().trim(),
                   });

               })

              res.send(topics);
           })

    })
});


app.listen(3001,function(){
    console.log('app is running at port 3000: http://localhost:3001/');
});
