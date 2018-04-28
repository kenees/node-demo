/**************
 * @author wangcheng
 * 功能：作用域与闭包
 * **************/

/**var作用域**/

var parent = function () {
    var name = "parent_name";
    var age = 13;

    var child = function () {
        var name = "child_name";
        var childAge = 0.3;

        //=>child_name 13 0.3
        //console.log(name,age,childAge);
    };
    child();

    // will throw Error
    // ReferenceError: childAge is not defined
    //console.log(name, age, childAge);
    //console.log(name,age);//
};

parent();

//Node 中，全局变量会被定义在 global 对象下；在浏览器中，全局变量会被定义在 window 对象下。
function foo() {
    value = "hello";
}

foo();
//console.log(value);//hello
//console.log(global.value);//hello


/**闭包**/
//函数式编程里很常见，简单的说，就是使内部函数可以访问定义在外部函数中的变量。

//假如我们要实现一系列的函数：add10，add20，它们的定义是 int add10(int n)。
// 为此我们构造了一个名为 adder 的构造器，如下：
var adder = function (x) {
    var base = x;
    return function (n) {
        return n + base;
    };
};
// var add10 = adder(10);
// console.log(add10(5));
//
// var add20 = adder(20);
// console.log(add20(5));

//闭包的一个坑
// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i);// 5 5 5 5 5
//     }, 5);
// }

//为了得到我们预想的结果，我们可以把 i 赋值成一个局部的变量，从而摆脱外层迭代的影响。
// for (var i = 0; i < 5; i++) {
//     (function (idx) {
//         setTimeout(function () {
//             console.log(idx);//0 1 2 3 4
//         }, 5);
//     })(i);
// }

/**this**/
//在函数执行时，this 总是指向调用该函数的对象。要判断 this 的指向，其实就是判断 this 所在的函数属于谁。
//有对象就指向调用对象
//没调用对象就指向全局对象
//用new构造就指向新对象
//通过 apply 或 call 或 bind 来改变 this 的所指。

//1）函数有所属对象时：指向所属对象
//var myObject = {value: 100};
//myObject.getValue = function () {
  //  console.log(this.value);  // 输出 100

    // 输出 { value: 100, getValue: [Function] }，
    // 其实就是 myObject 对象本身
 //   console.log(this);

//   return this.value;
//};

//console.log(myObject.getValue()); // => 100

//2) 函数没有所属对象：指向全局对象
    console.log('****************************');
var myObject = {value: 100};
myObject.getValue = function () {
    var foo = function () {
        console.log(this.value) // => undefined
        console.log(this);// 输出全局对象 global
    };

    foo();

    return this.value;
};

//console.log(myObject.getValue()); // => 100

//3）构造器中的 this：指向新对象
var SomeClass = function(){
    this.value = 100;
}

var myCreate = new SomeClass();

console.log(myCreate.value); // 输出100

//4) apply 和 call 调用以及 bind 绑定：指向绑定的对象
var myObject = {value: 100};

var foo = function(){
    console.log(this);
};

foo(); // 全局变量 global
foo.apply(myObject); // { value: 100 }
foo.call(myObject); // { value: 100 }

var newFoo = foo.bind(myObject);
newFoo(); // { value: 100 }