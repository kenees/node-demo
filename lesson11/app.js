/**************
 * @author wangcheng
 * 功能：作用域与闭包
 * **************/

//var作用域

var parent = function () {
    var name = "parent_name";
    var age = 13;

    var child = function () {
        var name = "child_name";
        var childAge = 0.3;

        //=>child_name 13 0.3
        console.log(name,age,childAge);
    };
    child();

    // will throw Error
    // ReferenceError: childAge is not defined
    //console.log(name, age, childAge);
    console.log(name,age);//
};

parent();

//Node 中，全局变量会被定义在 global 对象下；在浏览器中，全局变量会被定义在 window 对象下。
function foo() {
    value = "hello";
}

foo();
console.log(value);//hello
console.log(global.value);//hello

//未完待续。。。