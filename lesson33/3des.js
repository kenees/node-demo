var assert = require('assert');
var crypto = require('crypto');

//node加密
// function test_des(param) {
//     var key = new Buffer(param.key);
//     var iv = new Buffer(param.iv ? param.iv : 0)
//     var plaintext = param.plaintext
//     var alg = param.alg
//      var autoPad = param.autoPad
//
//     //encrypt
//     var cipher = crypto.createCipheriv(alg, key, iv);
//     cipher.setAutoPadding(autoPad)  //default true
//     var ciph = cipher.update(plaintext, 'utf8', 'hex');
//     ciph += cipher.final('hex');
//     console.log(alg, ciph)
//
//     //decrypt
//     var decipher = crypto.createDecipheriv(alg, key, iv);
//     cipher.setAutoPadding(autoPad)
//     var txt = decipher.update(ciph, 'hex', 'utf8');
//     txt += decipher.final('utf8');
//     assert.equal(txt, plaintext, 'fail');
//     console.log(alg, txt)
// }

//node加密
function test_des_encrypt(param) {
    var key = new Buffer(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0)
    var plaintext = param.plaintext
    var alg = param.alg
   // var autoPad = param.autoPad

    //encrypt
    var cipher = crypto.createCipheriv(alg, key, iv);
    //cipher.setAutoPadding(autoPad)  //default true
    var ciph = cipher.update(plaintext, 'utf8', 'hex');
    ciph += cipher.final('hex');
    console.log(alg, ciph)

    //decrypt
    //var decipher = crypto.createDecipheriv(alg, key, iv);
    //cipher.setAutoPadding(autoPad)
    //var txt = decipher.update(ciph, 'hex', 'utf8');
    //txt += decipher.final('utf8');
    //assert.equal(txt, plaintext, 'fail');
    //console.log(alg, txt)
}
//node解密
function test_des_decrypt(param) {
    var key = new Buffer(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0)
    var plaintext = param.plaintext
    var alg = param.alg
    var autoPad = param.autoPad


    //decrypt
    var decipher = crypto.createDecipheriv(alg, key, iv);
    //cipher.setAutoPadding(autoPad)
    var txt = decipher.update(plaintext, 'hex', 'utf8');
    txt += decipher.final('utf8');
    //判断是否相等
    //assert.equal(txt, plaintext, 'fail');
    console.log(alg, txt)
}
//加密
test_des_encrypt({
         alg: 'des-ecb',
        autoPad: true,
         key: '01234567',
         plaintext: '1234567812345678',
         iv: null
 })

test_des_encrypt({
         alg: 'des-cbc',
         autoPad: true,
         key: '01234567',
         plaintext: '1234567812345678',
         iv: '12345678'
 })

test_des_encrypt({
         alg: 'des-ede3',    //3des-ecb
         autoPad: true,
         key: '0123456789abcd0123456789',
         plaintext: '1234567812345678',
         iv: null
 })

test_des_encrypt({
         alg: 'des-ede3-cbc',    //3des-cbc
         autoPad: true,
         key: '0123456789abcd0123456789',
         plaintext: '1234567812345678',
         iv: '12345678'
 })


//解密
test_des_decrypt({
    alg: 'des-ecb',
    autoPad: true,
    key: '01234567',
    plaintext: '1234567812345678',
    iv: null
})

test_des_decrypt({
    alg: 'des-cbc',
    autoPad: true,
    key: '01234567',
    plaintext: '1234567812345678',
    iv: '12345678'
})

test_des_decrypt({
    alg: 'des-ede3',    //3des-ecb
    autoPad: true,
    key: '0123456789abcd0123456789',
    plaintext: '1234567812345678',
    iv: null
})

test_des_decrypt({
    alg: 'des-ede3-cbc',    //3des-cbc
    autoPad: true,
    key: '0123456789abcd0123456789',
    plaintext: '1234567812345678',
    iv: '12345678'
})

exports = module.exports=test_des;