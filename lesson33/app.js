var express = require('express');
var path = require('path');
var crypto = require('crypto');


//node加解密

function test_des(param) {
    var key = new Buffer(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0)
    var plaintext = param.plaintext
    var alg = param.alg
     var autoPad = param.autoPad

    //encrypt
    var cipher = crypto.createCipheriv(alg, key, iv);
    cipher.setAutoPadding(autoPad)  //default true
    var ciph = cipher.update(plaintext, 'utf8', 'hex');
    ciph += cipher.final('hex');
    console.log(alg, ciph)

    //decrypt
    var decipher = crypto.createDecipheriv(alg, key, iv);
    cipher.setAutoPadding(autoPad)
    var txt = decipher.update(ciph, 'hex', 'utf8');
    txt += decipher.final('utf8');
    assert.equal(txt, plaintext, 'fail');
    console.log(alg, txt)
}




test_des({
    alg: 'des-ede3-cbc',    //3des-cbc
    autoPad: false,
    key: '0123456789abcd0123456789',
    plaintext: '1234567812345678',
    iv: '12345678'
})

//
// var app = express();
//
//
// //post 请求获取请求参数
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));
//
// //处理静态文件
// app.use(express.static(path.join(__dirname,'public')));
//
//
// app.get('/',function (req,res) {
//     res.send('11111111');
// });
//
// app.post('/user',function (req,res) {
//     console.log(req.body);
//     console.log(req.body.data);
//     // test_des_decrypt({
//     //     alg: 'des-ecb',
//     //     autoPad: true,
//     //     key: '01234567',
//     //     plaintext: 'OI1E+LD3CcCRXhSryOt4JgSuB9lhEKsN',
//     //     iv: null
//     // })
//     res.json({alg:13});
// });
//
// app.listen(3000,()=>{
//     console.log('success');
// })