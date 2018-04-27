

function fibonacci(n) {
    if (n ===0 ){return 0;}
    else if (n ===1){return 1;}
    return fibonacci(n-1)+fibonacci(n-2);
}

if (require.main === module) {
    //如果直接执行main.js则进入这里，否则不执行
    console.log(process);
    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;