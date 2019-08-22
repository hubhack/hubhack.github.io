---
title: 序列化与json
categories: 
- web
tags:
- 序列化
---



### 序列化与反序列化

内存中的字典,列表,集合以及各种对象,如何保存到一个文件中.

如果是自己定义的类的实例, 如何保存到一个文件中.

如何从文件中读取数据,并让他们再内存中再次恢复成自己对应的类的实例.

要设计一套协议, 按照某种规则,把内存中的数据保存到文件中. 文件是一个字节序列,所以必须把数据转换成字节序列,输出到文件.这就是序列化, 反之, 从文件的字节序列恢复到内存并且还是原来的类型,就是反序列化.

### 定义

serialization 序列化

将内存中的对象存储下来,把它变成一个个字节.->二进制

deserialization 反序列化

将文件的一个个字节恢复成内存中对象 <-二进制

序列化保存到文件就是持久化.

可以将数据序列化后持久化,或者网络传输; 也可以将从文件中或者网络收到的字节序列反序列化.



### json

JSON是JavaScript Object Notation的缩写，中文译为JavaScript对象表示法。用来作为数据交换的文本格式，作用类似于XML，而2001年Douglas Crockford提出的目的就是为了取代XML，它不是一种编程语言，仅用来描述数据结构。


json是对js对象文本的一个描述， 相比xml来说更轻在web中流行广泛，因为是js的一部分，所以在浏览器中直接被被解析，网页传输中应用广泛。



## 1、JSON语法规则

JSON的语法可以表示以下三种类型的值：简单值、JSON对象和数组。

**（1）简单值**

简单值使用与JavaScript相同的语法，可以在JSON中表示字符串、数值、布尔值和null。

```js
// 简单值
"Hello World!" // 字符串
99 // 数值
true // 布尔型
false // 布尔型
null

// 在JSON中不能使用的值
NaN // 数值不能是NaN
Infinity // 数值不能是Infinity
undefined // 在JSON也不可以使用JavaScript中的undefined
'Hello World!' // 字符串必须使用双引号表示，不能使用单引号
0x1 // 数值必须以十进制表示，不能使用十六进制
```

**（2）对象**

对象是一组有序的键值对的数据组成的数据类型。键值对中，值可以是简单值，也可以是对象和数组（数组也是用来表示JSON的数据类型，见接下来内容）。一般很多刚入门的同学都在JavaScript中使用JSON所以经常会和JSON对象混淆，要十分注意。

```js
// 对象，对象的属性名必须使用双引号，值要是字符串也必须使用双引号
{
  "name": "Andy",
  "age": 18,
  "isStudent": true,
  "isLeader": false,
  "mark": null,
  "school": {
    "name": "BIT",
    "region": "Beijing" // 这个地方不能有逗号，因为是对象的最后一个属性成员
  } // 这个地方也不可以有逗号，因为也是对象的最后一个属性成员
}
```

**（3）数组**

数组是由一组有序的数组组成的列表。在数组中，值可以是简单值，也可以是对象和数组。记住，记住，再记住，在JSON中数组最后一个元素一定不要有逗号。

```js
// 示例一
["Andy", "Ruby", "Danny", "Peter", "Lisa"]
// 示例二
[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// 示例三
[
  {"name": "Andy", "age": 18},
  {"name": "Ruby", "age": 18},
  {"name": "Danny", "age": 20}
]
// 示例四
[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]
```

------

## 2、JSON字符串和JSON对象

**（1）JSON字符串**

JSON字符串与普通的字符串没有任何特殊的地方，但是之所以称为JSON字符串是因为，这个字符串符合我们前面介绍的语法规则。

```js
//JSON字符串
var p ='{"name":"Andy","gender":"男","age":"18"}';
console.log(p); // {"name":"Andy","gender":"男","age":"18"}
alert(typeof(p));// string
```

**（2）JSON对象**

JSON对象主要是在JavaScript的说法。在面向对象编程中，类的实例化叫做对象，对象拥有不同的属性，键值对就是对象的属性和值。

```js
// JSON对象
var person={
  "name":"Andy",
  "gender":"男",
  "age":"18"
}
console.log(person.name);// 在控制台输出Andy，可以通过点运算直接访问对象属性
alert(typeof(person));// object
```

**（3）JSON字符串和JSON对象互相转换**

JavaScript中有一个全局的对象，JSON。JSON中有两个方法 *stringify() 和 parse()。*

*JSON.parse()* 把JSON字符串解析为JSON对象

```js
//JSON字符串通过parse转化为JSON对象
var p ='{"name":"Andy","gender":"男","age":"18"}';
person = JSON.parse(p)
console.log(person.name);// 在控制台输出Andy，可以通过点运算直接访问对象属性
alert(typeof(person));// object
```

*JSON.stringify()* 用于把JSON对象序列化为JSON字符串。

```js
//JSON对象通过stringify转化为JSON字符串
var person={
  "name":"Andy",
  "gender":"男",
  "age":"18"
}
var p = JSON.stringify(person)
console.log(p); // {"name":"Andy","gender":"男","age":"18"}
alert(typeof(p));// string
```