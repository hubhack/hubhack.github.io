---
title: js-控制语句
date: 2019-06-21 18:46:41
tags:
- js
categories:
- js
---
@[toc](JS语法)
# 语句块
JS使用大括号构成语句块。
ES6 之前语句块是没有作用域的，从ES6开始支持 `块作用域` ，let只能在块作用域内可见
```json
function hello(){
    let a = 1;
    var b = 2;
    c = 3
}

if (1){
    let d = 4;
    var e = 5;
    f = 6
    if (true){
        console.log(d) // 可见
        console.log(e) // 可见
        console.log(f) // 可见
        console.log('----------')
        g = 10
        var h = 11
    }
}


// console.log(a) 不可见
// console.log(b) 不可见
// console.log(c) 不可见，函数为执行

hello()
console.log(c) // 块作用域隐式声明，可见

// console.log(d) // 块作用域使用let，不可见;但是块外的d可见
console.log(e)) // 块作用域使用var，可见
console.log(f)) // 块作用域隐式声明，可见
console.log(g)) // 可见
console.log(h)) // 可见
```
- let 不能突破函数、{ }  块作用域
- var 不能突破函数作用域
- `c = 3` 隐式申明，为全局作用域
# 流程控制
## 条件分支
```json
if (cond1){

}
else if (cond2) {

}
else if (cond3) {

}
else {

}
```
```json
条件的False等效
	false
	 undefined
	 null
	 0
	 NaN
	空字符串
	
其它值都将被视为True
```
## switch...case分支语句
- 当进入`case`语句后，如果没有`break`语句，会产生穿透现象
- 一直穿透到`break`语句结束
- 如果一直没有，将把代码执行完
```json
switch (expression) {
	case label_1:
		statements_1
		[break;]
	case label_2:
		statements_2
		[break;]
	
	...
	default:
		statements_def
		[break;]
}
```
- 穿透问题，一定要在case中恰当的使用break语句，否则就会继续顺序向下执行

```json
let x = 5 // 换成1试一试
switch (x) {
    case 0:
        console.log('zero')
        break;
    case 1:
        console.log('one');
    case 2:
        console.log('two');
    case 3:
        console.log('three');
        break;
    case 5:
    case 4:
    console.log('four');
    default:
        console.log('other')
        // break;
}

// 执行结果
four
other
// 如果x = 2，执行结果为
two
three
```
## for循环
```json
// C风格for循环
for ([initialExpression]; [condition]; [incrementExpression])
{
	statement
}
```
```json
for (let i=0;i<5;i++){
    console.log(i)
}
console.log('-'.repeat(30))

for (var x=0,y=9;x<5;x++,y--){
    console.log(x*y)
}
console.log('-'.repeat(30))

for (let i=0;i<10;i+=3){ // 步长
    console.log(i) 
}

// 执行结果
0
1
2
3
4
------------------------------
0
8
14
18
20
------------------------------
0
3
6
9
```
九九乘法表
```json
for (let i=1;i<10;i++){
    line = ''
    for (let j=1;j<=i;j++){
        line += j + '*' + i + '=' + j*i + ' '
        // line += `${j}*${i}=${i*j?'t':'f'} `
    }
    console.log(line)
}
```
## while循环 和 do...while循环
- 条件满足，进入循环，条件为真，继续循环
```json
while (condition)
	statement
```
- 先进入`do语句`循环，然后判断，为真就继续循环
```json
do
	statement
while (condition);
```
```json
let x = 5
while  (x--){
    console.log(x);
}
console.log('~~~~~~~~~~')
do {
    console.log(x)
}
while(x++<5)

// 执行结果
4
3
2
1
0
~~~~~~~~~~
-1
0
1
2
3
4
5
```
## for...in循环
**对象**操作语句`for...in`用来遍历对象的**属性**
```json
for (variable in object) {
	statements
}
```
```json
// 数组
let arr = [10, 20, 30, 40];

console.log(arr[1]) // 20

for (let x in arr){
    console.log(x); // 返回索引
}

for (let index in arr){
    console.log(`${index} : ${arr[index]}`); //插值
}

// C风格
for(let i=0;i<arr.length;i++){
    console.log(arr[i]);
}

// 对象
let obj = {
    a:1,
    b:'hello',
    c:true
};

console.log(obj.a);
console.log(obj['b']); // 对象属性当索引访问
console.log(obj.d); // undefined
console.log('~~~~~')
for (let x in obj){
    console.log(x); // 属性名
}

for (let key in obj){ // 返回数组的index
    console.log(`${key} : ${obj[key]}`);
}

// 执行结果
20
0
1
2
3
0 : 10
1 : 20
2 : 30
3 : 40
10
20
30
40
1
hello
undefined
~~~~~
a
b
c
a : 1
b : hello
c : true
```
- `for in` 循环返回的是索引或者key，需要间接访问到值
- **数组*8反正返回的是索引，C风格for循环操作可能方便点
- **对象**用for in合适

## for...of 循环
ES6的新语法
```json
let arr = [1, 2, 3, 4, 5]
let obj ={
    a:1,
    b:'hello',
    c:true
}

for (let i of arr){ //返回数组元素
    console.log(i)
}
//执行结果
1
2
3
4
5


for (let i of  obj){ // 异常，不可以迭代
    console.log(i)
}
```
### 注意
- `for ... of` 不能迭代一个普通对象
- 原因是，of后面必须是一个迭代器`（TypeError: obj[Symbol.iterator] is not a function）`
- 可类比python中的`for in`，例如`for x in [ ]`
## break 、 continue
- break 结束当前循环
- continue 中断当前循环，直接进入下一次循环
## for迭代的差别
```json
function sum(arr){
    for (let x in arr){ // 遍历index或对象属性 
        console.log(x, typeof(x), arr[x]);
    }
    for (let x of arr){ // 遍历元素
        console.log(x, typeof(x));
    }
    for (let x=0;x<arr.length;x++){ // 自己定义索引数值遍历
        console.log(x, typeof(x), arr[x]);
    }
}

sum([3,6,9]);
 
// 执行结果
0 string 3
1 string 6
2 string 9
3 'number'
6 'number'
9 'number'
0 'number' 3
1 'number' 6
2 'number' 9
```
# Symbols类型
- ES6提供Symbol类型，内建原生类型

symbol值是唯一的
```json
let sym1 =Symbol()
let sym2 = Symbol('key1')
let sym3 = Symbol('key2')
console.log(sym2 == sym3) //false
```
## 作为对象的属性key
```json
let s = Symbol()
let t = 'abc'
let a = {
    [s]:'xyz', // symbol做key，注意要使用中括号，这个key一定唯一
    t:'tt',
    [t]:'oo'
}

console.log(a)
console.log(a[s])
a[s] = 2000
console.log(a[s])

// 执行结果
{ t: 'tt', abc: 'oo', [Symbol()]: 'xyz' }
xyz
2000
```
## 构建常量
- 以前的用法
```json
var COLOR_RED = 'RED';
var COLOR_ORANGE = 'ORANGE';
var COLOR_YELLOW = 'YELLOW';
var COLOR_GREEN = 'GREEN';
var COLOR_BLUE = 'BLUE';
var COLOR_VIOLET = 'VIOLET';
```
- 现在的用法
```json
const COLOR_RED = Symbol();
const COLOR_ORANGE = Symbol();
const COLOR_YELLOW = Symbol();
const COLOR_GREEN = Symbol();
const COLOR_BLUE = Symbol();
const COLOR_VIOLET = Symbol();
```
