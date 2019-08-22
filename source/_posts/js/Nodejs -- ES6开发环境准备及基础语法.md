---
title: node.js
date: 2019-06-21 18:46:41
categories:
- js
tags:
- js
---
@[toc]
# Nodejs
Nodejs是服务器端运行JavaScript的开源、跨平台运行环境
Nodejs原始作者瑞安·达尔（Ryan Dahl），于2009年发布，使用了V8引擎，并采用事件驱动、非阻塞、异步IO模型

2010年，npm软件包管理器诞生，通过它，可以方便的发布、分享Nodejs的库和源代码

Nodejs 4.0引入了ES6语言特性
# 安装
- 国内可以去阿里云镜像站
https://npm.taobao.org/mirrors/node

- Linux 
https://npm.taobao.org/mirrors/node/latest-v10.x/node-v10.16.0-linux-x64.tar.xz
解压即可运行

- windows 
https://npm.taobao.org/mirrors/node/latest-v10.x/node-v10.16.0-x64.msi
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629163806738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 10版本 长期支持版本
- 11、12 临时版本

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629164406793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
10.16.x是LTS
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629164819657.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- msi安装会增加path路径
全局安装目录 `C:\Program Files\nodejs\`
本用户目录 `C:\Users\Administrator\AppData\Roaming\npm`
`$ node -v` 查看版本
# 开发
## 文档
搜索MDN，Mozilla Developer Network，提供非常完善HTML、CSS、JS等的技术资料。
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript

指南 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide 非常好的JS文档
使用任何一种文本编辑器，都可以开发JS，此次使用微软的**Visual Studio Code**进行开发
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629165611837.png)
## Visual Studio Code
下载 https://code.visualstudio.com/Download
支持windows、mac、Linux平台
新版VS Code Windows版分为System 和 User两个版本，当前用户使用安装User版即可

有代码自动完成功能，还可以安装Node exec插件，将写的js跑在nodejs上
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629170707674.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
Node Exec插件快捷键：**F8运行js脚本，F9停止**
前端开发中，JS脚本一般来说是为了控制浏览器的网页的，这里使用了VSCode，只是为了开发调试方便
### 解决快捷键冲突
F8和某些软件冲突，无法使用，例如某些词典软件
可以通过调整VSCode的快捷键设置。当然可以修改其他软件的快捷键
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629170751591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062917080099.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 设定 工作目录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629171003765.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 创建文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629171228446.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)


## 注释
`console.log()` 输出到控制台，类似于`python的print()`

和C、Java一样
- `//` 单行注释
- `/* 注释 */` 多行注释，也可以用在语句中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190629172928751.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
## 常量和变量
### 标识符
标识符必须是字母、下划线、美元符号$和数字，但必须是字母、下划线、美元符号开头，依然是不能数字开头就行
标识符**区分大小写**
### 声明
- `var` 声明一个变量，不能突破函数作用域
- `let` 声明一个块作用域中的局部变量，小范围使用，不能突破大括号作用域，更加不能突破函数作用域
- `const` 声明一个常量
常量不允许改变, 常量不能分开写，必须立即赋值

JS中的变量声明和初始化是可以分开的
```json
var a // 只是声明，a为undefined
let b
console.log(1,a,b)

a = 1
b = 'a string'
console.log(2,a,b)

//const c // 不可以
const c = 100 // 常量必须声明时赋值，之后不能再改
console.log(c)
//c = 200 // 不可以更改
```

- var y 
只是声明，y值为undefined
- var x = 5 
规范的声明并初始化，声明全局或局部变量。
- z = 6 
不规范的初始化，不推荐。在严格模式下会产生异常。在赋值之前不能引用，因为它没有声明。一旦这样赋值就是全局作用域
### 函数
```json
function hello()
{
    var a // 只是声明，a为undefined，作用域在函数中
    a = 100
}

console.log(a) // 未声明变量a，异常

//a = 200 // 不能声明提升
//let a = 200 // 不能声明提升
//var a = 200; hello(); // var声明提升hoisting
```
#### **var** 
- 可以声明提升 相当于放在`console.log()`前面
- 没有赋值打印的是  `undefined `
- 如果变量在`console.log()`后，没有`var`  会报`nameError`
```json
var a
console.log(a) // undefined
a = 100
console.log(a) // 100
```

### 常量和变量的选择
如果明确知道一个标识符定义后不再修改，应该尽量声明成const常量，减少被修改的风险，减少Bug
## 数据类型
| 名称 |说明  |
|:--|:--|
| number | 数值型，包括整型和浮点型 |
|boolean  | 布尔型，true和false |
|string  | 字符串。需用单双引号、反引号 |
| null | 只有一个值null |
| undefined |  变量声明未赋值的；对象未定义的属性|
| symbol  | ES6 新引入类型 |
|object类型|是以上基本类型的复合类型，是容器|
- ES是**动态语言**，**弱类型语言**
	- 动态语言：
	变量使用时无需事先声明类型
	- 弱类型语言：
	字符串加整型，不报错就是弱类型
	`console.log('a' + 1) // a1`

- 虽然先声明了变量，但是变量可以重新赋值任何类型

## 对象的定义
```json
let a = {a:100}
console.log(a.a) // 100

b = 200
let c = {b}
console.log(c.b) // 200

d = 1000
e = 2000
let f = {d, e}
console.log(f) // { d: 1000, e: 2000 }
```
## 类型转换

### 字符串
```json
console.log(a = 3 + 'hello', typeof(a)) // 3hello string
console.log(a = null + 'hello', typeof(a)) // nullhello string
console.log(a = undefined + 'hello', typeof(a)) // undefinedhello string
console.log(a = true + 'hello', typeof(a)) // truehello string
```
- python的 `typy(str)` 返回的是`class`
- js的 `typeof(str)` 返回的是`str`
### 数字
```json
console.log(a = null + 8, typeof(a)) // 8 'number'
console.log(a = undefined + 8, typeof(a)) // NaN 'number'
console.log(a = true + 8, typeof(a)) // 9 'number'
console.log(a = false + 8, typeof(a)) // 8 'number'
```
**NaN ： not a number**
不是一个数字，但是他是数字类型
- undefined 没法转换成一个对应的数字
- null = 0
- true = 1
- false = 0
### boolean
```json
console.log(a = null + true, typeof(a)) // 1 'number'
console.log(a = null + false, typeof(a)) // 0 'number'
console.log(a = undefined + true, typeof(a)) // NaN 'number'
console.log(a = undefined + false, typeof(a)) // NaN 'number'
console.log(a = null & true, typeof(a)) // 0 'number'
console.log(a = undefined & true, typeof(a)) // 0 'number'
```

### 短路
```json
console.log(a = null && true, typeof(a)) // null 'object'
console.log(a = false && null, typeof(a)) // false 'boolean'
console.log(a = false && 'hello', typeof(a)) // false 'boolean'
console.log(a = true && 'hello', typeof(a)) // hello string
console.log(a = true && '', typeof(a)) //  string
```
解析：
- 第一个：逻辑运算符，null 直接就是false短路
- 第二个：逻辑运算符，false短路返回false
- 第三个：boolean
- 第三个：字符串
- 第五个：返回的是空字符串，看不见。
### null
```json
console.log(a = null + undefined, typeof(a)) // NaN 'number'
```
- 弱类型，不需要强制类型转换，会隐式类型转换。
- NaN，即Not a Number，转换数字失败。它和任何值都不等，和自己也不等，只能使用Number.isNaN(NaN)

&&   and  
||  or  
&  位与  
 |   位或

### 总结：
- 遇到字符串，加号就是拼接字符串，所有非字符串隐式转换为字符串。
- 如果没有字符串，加号把其他所有类型都当数字处理，非数字类型隐式转换为数字。undefined特殊，因为它都没有定义值，所以转换数字失败得到一个特殊值NaN。
- 如果运算符是逻辑运算符，短路符，返回就是短路时的类型。没有隐式转换。
- 除非你十分明确，否则不要依赖隐式转换。写代码的时候，往往为了程序的健壮，请显式转换。
### 注意：
 - 以上的原则不要死记，忘了就实验，或者显式的类型转换
 
## 字符串
将一个值使用' 单引号或者 "双引号 引用起来就是字符串
ES6提供了反引号定义一个字符串，可以支持多行，还支持插值
```json
let a = 'abc'
let b = "135"
let c = `line1
line2
line3
` // 支持多行
console.log(c)

// 字符串插值,要求在反引号字符串中.python3.6支持
let name="tom", age = 19
console.log(`my name is ${name}. I am ${age}`)

// 执行结果
line1
line2
line3

my name is tom. I am 19
```
%{} 里面还可以写表达式，例如
```json
let a = 'abc'
let b = "135"
let c = `line1
${a + b}
line3
`
console.log(c)

# 执行结果
line1
abc135
line3
```
### 转义字符
| 名称 |说明  |
|:--|:--|
|  \0| ASCII 0，Null字符，空字符 |
|  \b| 退格符 |
| \f |换页符  |
|  \n| 换行符 |
|  \r| 回车符 |
|  \t| Tab(制表符) |
|  \v| 垂直制表符 |
| \' | 单引号 |
| \" | 双引号 |
| \ | 反斜杠字符 ( \ ) |
| \XXX | 由从0到377最多三位八进制数XXX表示的Latin-1字符。例如，\251是版本符号的八进制序列|
|\xXX|由从00到FF的两位十六进制数字XX表示的Latin-1字符。例如，\xA49是版本符号的十六进制序列|
|\uXXXX|由四位十六进制数字XXXX表示的Unicode字符。例如，\u00A9是版本符号的Unicode序列。<br>见Unicode escape sequences(Unicode 转义字符)|
|\u{XXXXX}|Unicode代码点（code point）转义字符。例如，\u{2f804}相当于Uicode转义字符<br>\uD87E\uDC04的简写|
### 字符串操作方法
字符串操作方法很多，但和Python类似
```json
let test = 'Python'
console.log(test.charAt(2)) // t 索引
console.log(test[2]) // t  索引 常用
console.log(test.toUpperCase()) // PYTHON
console.log(test.concat('.org')) // Python.org 字符串拼接
console.log(test.slice(3)) // hon 切片,支持负索引
console.log(test.slice(3,5)) // ho [3, 5)前包后不包
console.log(test.slice(-2, -1)) // o
console.log(test.slice(-2)) // on
console.log(test.repeat(3)) // PythonPythonPython
console.log(test.endsWith('n')) // true
console.log(test.endsWith('P')) // false
console.log(test.search('t')) // 2
console.log(test.length) // 6 长度


let url = "www.python.org"
console.log(url.split('.')) // [ 'www', 'python', 'org' ]
console.log(url.substr(7, 2)) // ho  返回字符串从何处开始,取多长
console.log(url.substring(7, 10)) //hon 返回子串,从何处开始,到什么为止,前包后不包

let s ='python.hon'
console.log(s.indexOf('ho')) // 3
console.log(s.indexOf('ho', 4)) // 7
console.log(s.replace('.hon', '.com')) // python.com 字符串替换
s = '\tpyt hon \r\n'
console.log(s.trim()) // pyt hon 去除两端的空白字符
// trimLeft、trimRight是非标函数，少用
```
## 数值型number
在JS中，数据均为双精度浮点型范围只能在` -(2^53 -1)` 和 `2^53 -1`之间，整型也不例外
数字类型还有三种符号值
- +Infinity（正无穷）
- -Infinity（负无穷）
- NaN (not-a-number非数字)

二进制0b0010、0B110
八进制0755。注意0855，将被认作十进制，因为8不在八进制中。ES6中最好使用0o前缀表示八进制。
十六进制0xAA、0Xff。
指数表示`1E3（1000）`，`2e-2（0.02）`
### 常用属性
```json
console.log(Number.MAX_VALUE)
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_VALUE)
console.log(Number.POSITIVE_INFINITY) // 正无穷
console.log(Number.NEGATIVE_INFINITY) // 负无穷
console.log(Number.NaN)

// 执行结果
1.7976931348623157e+308
9007199254740991
5e-324
Infinity
-Infinity
NaN
```
### 数字的方法
|方法| 描述|
|:--|:--|
| Number.parseFloat() | 把字符串参数解析成浮点数，和全局方法 parseFloat() 作用一致 |
| Number.parseInt() | 把字符串解析成特定基数对应的整型数字，和全局方法 parseInt() 作用一致 |
| Number.isFinite() |判断传递的值是否为有限数字  |
|Number.isInteger()  | 判断传递的值是否为整数 |
| Number.isNaN() | 判断传递的值是否为 NaN |

```json
let a = 0x712
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.isNaN(NaN))
console.log(Number.NaN ==Number.NaN)

// 执行结果
9007199254740991
true
false
```
NaN不能用等值来做 只能用判断来做
### 内置数学对象Math 
Math提供了绝对值、对数指数运算、三角函数运算、最大值、最小值、随机数、开方等运算函数，提供了PI值
```json
console.log(Math.PI)
console.log(Math.abs(-1))
console.log(Math.log2(16))
console.log(Math.sqrt(2))
console.log(Math.random()) // (0,1)

// 执行结果
3.141592653589793
1
4
1.4142135623730951
0.8018837833232821
```
## 运算符
### 算数运算符
- parseInt 直接截取 整数部分
- Math.ceil 向上取整
- Math.floor 向下取整
- Math.round 四舍五入

`+ - * / %`等运算符和Python一样
```json
console.log(1/2)
console.log(1/0)
console.log(5 % 3)

console.log(parseInt(1/2),parseInt(3/2),parseInt(5/2))
console.log(parseInt(-1/2),parseInt(-3/2),parseInt(-5/2))

console.log(Math.floor(1/2),Math.floor(3/2),Math.floor(5/2))
console.log(Math.floor(-1/2),Math.floor(-3/2),Math.floor(-5/2))

console.log(Math.ceil(1/2),Math.ceil(3/2),Math.ceil(5/2))
console.log(Math.ceil(-1/2),Math.ceil(-3/2),Math.ceil(-5/2))

console.log(Math.round(1/2),Math.round(3/2),Math.round(5/2))
console.log(Math.round(-1/2),Math.round(-3/2),Math.round(-5/2))

// 执行结果
0.5
Infinity
2
-
0 1 2
-0 -1 -2
0 1 2
-1 -2 -3
1 2 3
-0 -1 -2
1 2 3
-0 -1 -2
```
- ++ 和 --
单目运算符，代表变量自增、自减

- i++ 先用i，用完之后i再自增加1 
++i i先自增，再使用i
```json
let i = 0 
let a = i++
console.log(a , i)  // 0 1
console.log(a, i++)  // 0 1
a = ++i
console.log(a, ++i) // 3 4
```
```json
i = 0;
let a = ++i+i+++i+++i; // 等价于 (++i) + (i++) + (i++) + i
console.log(a); //  / 1 + 1 + 2 + 3 =7
```
1、单目运算符优先级高于双目运算符
2、加号+是双目运算符，两边的表达式必须先计算好
#### 正负无穷
```json
console.log(1/2) // 0.5
console.log(5 % 2) // 1
console.log(1/0) // Infinity  正无穷
console.log(-1/0) // -Infinity  负无穷
```
### 比较运算符
```
>  		 <		>=	 <= 没有什么区别
!=		== 
!==		===
== 宽松相等，进行类型转换，
=== 严格相等，不进行类型转换
```
```json
console.log(100 > 200) // false
console.log(100 > '200') // false
console.log(300 > '200') // true
console.log(1000 > '200') // true
console.log('1000' > 200) //  true
console.log('100'> '200') // false
console.log('1000' > '200') // false
console.log('-'.repeat(30))

// 类型转换失败 为false
console.log(1000 > '200a') // false
console.log(1000 > '0a') // false
console.log(1000 > 'a') // false
console.log(1000 > NaN) // false
console.log(1000 < NaN) // false
```
类型转换失败 为false

`==`  隐式类型转换
`===`  严格等式，内容相等，类型相等
安全代码，建议使用 三等号
```json
console.log(100 == 200) // false
console.log(100 == '200') // false
console.log(200 == '200') // true
console.log(200 === '200') // false
```
### 逻辑运算符
`&&` 、`||` 、 `! `与、或、非
这些运算符和其他高级语言都一样，支持**短路**
### 位运算
`&  |  ^  ~  <<  >>` 
位与、位或、异或、取反、左移、右移，和Python一样
异或，相异出1
### 三元运算符
```json
条件表达式?真值:假值

等价于简单的if...else结构

if (条件表达式) {
	真值
}
else { 
	假值
}
```
```json
console.log(('3' > 30)?'t':'f') // f


let a = 100
console.log(a); // 100
let b=a++
console.log(b); // 100
let c = 100 > ++b?'t':'f'
console.log(a, b, c); // 101  101  f
```
### 逗号操作符
JS运行多个表达式写在一起
return 会返回最后一个变量的值
### 其他
|名称| 说明 |
|:--|:--|
| instanceof | 判断是否属于指定类型 |
| typeof |返回类型字符串  |
| delete | delete操作符, 删除一个对象(an object)或一个对象的属性(an object's property)或者一个数组中某一个键值(an element at a specified index in an array) |
|  in | 如果指定的属性在对象内，则返回true |
#### instanceof、typeof
instanceof 要求必须明确使用类型定义变量，就是对象必须是new关键字声明创建的。它可以用于继承关系的判断

typeof就是返回对象的类型字符串
- 实例化 必须要加 `new` 
- `[ ]` `{ }` 是 object对象
```json
console.log('a' instanceof String); // false
console.log(typeof 'a', typeof 'a' == 'string');  // string true
console.log(1 instanceof Number); // false
console.log(typeof 1, typeof 1 == 'number'); // number true

console.log(a = new String('a'), a instanceof String,) ; // [String: 'a'] true
console.log(typeof a, typeof a == 'string'); // object false
console.log(b = new Number(1), b instanceof Number) ; // [Number: 1] true
console.log(typeof b, typeof b == 'number'); // object false

console.log([] instanceof Object) // true
```

#### delete 
删除对象、属性、数组元素
- 自定义的可以删除
- 隐式赋值可以删除
```json
x = 42;
var y = 43;
let z = 60;
myobj = new Number();
myobj.h = 4; // create property h
console.log(delete x); // returns true (can delete if declared implicitly)
console.log(delete y); // returns false (cannot delete if declared with var)
console.log(delete z); // returns false
console.log(delete Math.PI); // returns false (cannot delete predefined properties)
console.log(delete myobj.h); // returns true (can delete user-defined properties)
console.log(delete myobj); // returns true (can delete if declared implicitly)
console.log('~~~~~~~~~~~~~~~~~~~~')
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
for(var i=0;i<trees.length;i++)
 
console.log(trees[i])
console.log('==================')
delete trees[3]; // 数组中元素被删除，但空着的位置是undefined
for(var i=0;i<trees.length;i++)
 
console.log(trees[i])

// 执行结果
true
false
false
false
true
true
~~~~~~~~~~~~~~~~~~~~
redwood
bay
cedar
oak
maple
==================
redwood
bay
cedar
undefined
maple
```
删了数组的元素，个数不会少，会补充undefined
##### pop
可以pop掉，删除最后一个元素
长度会变短，元素会移除
```json
var trees = new Array("redwood", "bay", "cedar", "oak");
for (var i=0;i<trees.length;i++)
    console.log(trees[i])
console.log('=============')

trees.pop()
for (var i=0;i<trees.length;i++)
    console.log(trees[i])

// 执行结果
redwood
bay
cedar
oak
=============
redwood
bay
cedar
```

#### in
判断属性是否在对象内
```json
let trees = new Array("redwood", "bay", "cedar", "oak", "maple");
console.log(0 in trees); // returns true ，0在数组对象的index中
console.log(3 in trees); // returns true ，3在数组对象的index中
console.log(6 in trees); // returns false，6不在数组对象的index中
console.log("bay" in trees); // return false，bay不是属性，它是值
console.log("length" in trees); // returns true，length是对象的属性
console.log('~~~~~~~~~~~~~~~~~~~~')
delete trees[3];
console.log(3 in trees); // return false
for(var i=0;i<trees.length;i++)
 
console.log(trees[i]);
console.log('~~~~~~~~~~~~~~~~~~~~')
// Custom objects
let mycar = {
 
color: "red", 
 
year: 1998
};
console.log("color" in mycar); // returns true
console.log("model" in mycar); // returns false
console.log('year' in mycar) // true

// 执行结果
true
true
false
false
true
~~~~~~~~~~~~~~~~~~~~
false
redwood
bay
cedar
undefined
maple
~~~~~~~~~~~~~~~~~~~~
true
false
true
```
### 运算符优先级
- 运算符由高到低，顺序如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019070116152287.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
`* / %` 双目,以下都是双目
逗号运算符优先级最低，比赋值语句还低。
记不住，就使用括号。
## 表达式
基本表达式，和Python差不多

解析式也和Python的相似，但在ES6中非标准不推荐使用
生成器推荐使用生成器函数，ES6开始支持
```json
function* inc(){
    let i = 0;
    let j = 7;
    while (true) {
        yield i++;
        if (!j--) return 100;
    }
}

let gen = inc()
for (let i=0;i<10;i++)
    console.log(gen.next());
// 执行结果
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: 5, done: false }
{ value: 6, done: false }
{ value: 7, done: false }
{ value: 100, done: true }
{ value: undefined, done: true }
```
- j = 7
- `!j` 值取not, 7 为真，取not 为false

**value  取 值**
```json
function* inc(){
    let i = 0;
    let j = 7;
    while (true) {
        yield i++;
        if (!j--) return 100;
    }
}

let gen = inc()
for (let i=0;i<10;i++)
    console.log(gen.next().value);

// 执行结果
0
1
2
3
4
5
6
7
100
undefined
```
**done 取状态**
```json
function* inc(){
    let i = 0;
    let j = 7;
    while (true) {
        yield i++;
        if (!j--) return 100;
    }
}

let gen = inc()
for (let i=0;i<10;i++)
    console.log(gen.next().done);

// 执行结果
false
false
false
false
false
false
false
false
true
true
```



