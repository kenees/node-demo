let express = require('express');
let app = express();

app.get('/',function (req,res) {
    res.send('hellow world');
});
//注意此处是listen
app.listen('3000',function () {
    console.log('listen adress: http://localhost:3000');
});