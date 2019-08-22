---
title: js-模块化
date: 2019-06-21 18:46:41
tags:
- js
categories:
- js
---
@[toc](模块化)
# 概念
ES6之前，JS没有出现模块化系统。因为它在设计之初根本没有想到今天的JS应用场景

JS主要在前端的浏览器中使用，js文件下载缓存到客户端，在浏览器中执行
比如简单的表单本地验证，漂浮一个广告
服务器端使用ASP、JSP等动态网页技术，将动态生成数据嵌入一个HTML模板，里面夹杂着JS后使用 `<script>` 标签，返回浏览器端执行。 `<script>` 还可以使用src属性，发起一个GET请求返回一个js文件，嵌入到当前页面执行环境中执行

这时候的JS只是一些简单函数和语句的组合

2005年之后，随着Google大量使用了A JAX技术之后，可以异步请求服务器端数据，带来了前端交互的巨大变化
前端功能需求越来越多，代码也越来也多。随着js文件的增多，灾难性的后果产生了：
- 众多js文件通过 `<script>` 引入到当前页面中，每一个js文件发起一个GET请求，众多的js文件都需要返回到浏览器端。网络开销成本颇高
- 习惯了随便写，js脚本中各种**全局变量污染**，函数名冲突
- JS脚本加载有顺序，JS文件中的代码之间的依赖关系（依赖前后顺序、相互依赖）

亟待模块化的出现

2008年V8引擎发布，2009年诞生了Nodejs，支持服务端JS编程。使用JS编程的项目规模越来越大，没有模块化是不可以的
之后社区中诞生诸多模块化解决方案

CommonJS规范（2009年），使用全局require函数导入模块，将所有对象约束在模块对象内部，使用exports导出指定的对象
最早这种规范是用在Nodejs后端的，后来又向前端开发移植，这样浏览器端开发也可以使用CommonJS了

AMD（Asynchronous Module Definition）异步模块定义，这是由社区提出的一种浏览器端模块化标准。使用异步方式加载模块，模块的加载不影响它后面语句的执行。所有依赖这个模块的语句，都需要定义在一个回调函数，回调函数中使用模块的变量和函数，等模块加载完成之后，这个回调函数才会执行，就可以安全的使用模块的资源
了。其实现就是AMD/RequireJs。AMD虽然是异步，但是会预先加载和执行。目前应用较少

CMD（Common Module Definition），使用seajs，作者是淘宝前端玉伯，兼容并包解决了RequireJs的问题
CMD推崇as lazy as possible，尽可能的懒加载

由于社区的模块化呼声很高，ES6开始提供支持模块的语法，但是浏览器目前支持还不够
# ES6模块化
ES6中模块自动采用严格模式
- `import语句`，导入另一个模块导出的绑定
- `export语句`，从模块中导出函数、对象、值的，供其它模块import导入用
## 导出
建立一个模块目录src，然后在这个目录下新建一个moda.js，内容如下：
### 缺省导出
```js
export default class A{
    constructor(x){
        this.x = x;
    }
    show(){
        console.log(this.x);
    }
}
```
### 导出函数
```js
export function foo(){
    console.log('foo function');
}
```
### 导出常量
```js
export const CONSTA = 'aaa'
```
## 导入
其它模块中导入语句如下
```js
import {CONSTA, foo} from "./moda";
import * as mod_a from "./moda";
```
VS Code可以很好的语法支持了，但是运行环境，包括V8引擎，都不能很好的支持模块化语法
# 转译工具
转译就是从一种语言代码转换到另一个语言代码，当然也可以从高版本转译到低版本的支持语句

由于JS存在不同版本，不同浏览器兼容的问题
使用transpiler转译工具解决对语法的支持问题
## babel
开发中可以使用较新的ES6语法，通过转译器转换为指定的某些版本代码

官网 http://babeljs.io/

参考文档 https://babeljs.io/docs/en/6.26.3/index.html

注意当前版本7.x已经有了较大的变化，请参看6.x文档

打开Try it out，测试一段代码
```js
function * counter(){
	let i = 0; 
	while(true) 
		yield (++i);
}

g = counter();
console.log(g.next().value);
```
## 预设
有如下一些预设presets，我们先看看有哪些，一会儿再进行预设的安装和配置
```js
presets：
babel-preset-env 当前环境支持的代码，新target

ES2015转码规则
$ npm install --save-dev babel-preset-es2015

react转码规则
$ npm install --save-dev babel-preset-react

ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```
## 离线转译安装配置
### 1、初始化npm
在项目目录中使用
`$ npm init`
npm 相当于 linux 的yum ；相当于python 的pip
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071314484045.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
在项目根目录下会生成package.json文件，内容就是上面花括号的内容
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713144949595.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
descriotion  描述
entry point 入口
 test command 测试的命令
license 许可证

 package.json 根目录
 这个文件很重要  
 先对项目初始化，才可以使用babel
 ### 2、设置镜像
 为了连接国内的服务器，当前项目创建一个配置 `.npmrc`文件
- 可以放在全局配置下，所有人用
- 可以放到用户家目录中，当前用户下所有项目使用
- 可以放到项目根目录中，当前项目用（**推荐此种做法**）

参考 http://npm.taobao.org/
本次放到项目根目录中，内容如下 `registry=https://registry.npm.taobao.org`
```js
`$ echo "registry=https://registry.npm.taobao.org" > .npmrc`
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713150237179.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713150212417.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 3、安装
项目根目录下执行
`$ npm install babel-core babel-cli --save-dev`

`--save-dev`说明
- 当你为你的模块安装一个依赖模块时，正常情况下你得先安装他们（在模块根目录下npm install module-name），然后连同版本号手动将他们添加到模块配置文件`package.json`中的依赖里（dependencies）。开发用
- `--save`和`--save-dev`可以省掉你手动修改`package.json`文件的步骤
- `spm install module-name --save` 自动把模块和版本号添加到dependencies部分。部署运行时用
- `spm install module-name --save-dev` 自动把模块和版本号添加到devdependencies部分

安装完后，在项目根目录下出现 `node_modules`目录 ，里面有babel相关模块及依赖的模块

-g 安装全局，非万不得，不要使用
没有加 -g 默认安装到当前项目中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713150743106.png)

### 4、配置babel和安装预设
在目录根目录下创建 `.babelrc` 文件，Json格式
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071315123078.png)
```js
{ 
	"presets": ["env"]
}
```
env 可以根据当前环境自动选择
安装依赖
`$ npm install babel-preset-env --save-dev`
### 5、准备目录
项目根目录下建立src和lib目录
- `src` 是源码目录
- `lib` 是目标目录

### 6、修改package.json
替换为 `scripts` 的部分
```js
{
  "name": "src",
  "version": "1.0.0",
  "description": "",
  "main": "moda.js",
  "scripts": {
    "build": "babel src -d lib"
  },
  "author": "luxia",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0"
  }
}
```
`babel src -d lib` 意思是从src目录中转译后的文件输出到lib目录
### 7、准备js文件
在src中的moda.js文件
```js
// 缺省导出
export default class A{
    constructor(x){
        this.x = x;
    }
    show(){
        console.log(this.x)
    }
}

export function foo(){
    console.log('foo function')
}
```
src目录下新建index.js
```js
import A, {foo} from "./moda";

var a = new A(100);
a.show();

foo();
```
直接在VS Code的环境下执行出错。估计很难有能够正常运行的环境。所以，要转译为ES5的代码。

- 在项目根目录下执行命令
```js
$ npm run build
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713152900657.png)
可以在lib文件夹中看到，2个文件被转译

- 运行文件

```js
$ node lib/index.js
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713152941937.png)

使用babel等转译器转译JS非常流行
开发者可以在高版本中使用新的语法特性，提高开发效率，把兼容性问题交给转译器处理

npx是包之心器命令从npm 5.2开始提供。npx可以直接执行已经安装过的包的命令，而不用配置package.json中的run-script
```js
npx babel src -d lib
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713153539871.png)
```js
node lib/index.js
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713153547627.png)
# 导入导出
导出代码都在src/moda.js中，导入代码都写在src/index.js中
## 缺省导入导出
只允许一个缺省导出，缺省导出可以是变量、函数、类，但不能使用let、var、const关键字作为默认导出
- 缺省导入的时候，可以自己重新命名，可以不需要和缺省导出时的名称一致，但最好一致
- 缺省导入，不需要在import后使用花括号
```js
// 缺省导出 匿名函数
export default function(){
    console.log('default export function')
}

// 缺省导入
import defaultFunc from '/.moda'
defaultFunc();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071315412552.png)
```js
// 缺省导出 命名函数
export default function xyz(){
    console.log('default export function')
}

// 缺省导入
import defaultFunc from './moda'
defaultFunc();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713154456127.png)
## 命名导入导出
- 导出举例

```js
// 缺省导出类
export default class {
    constructor(x) {
        this.x = x;
    }
    show() {
        console.log(this.x);
    }
}

// 命名导出 函数
export function foo() {
    console.log('regular foo()');
}

// 函数定义
function bar() {
    console.log('regular bar()');
}

// 变量常量定义
let x = 100;
var y = 200;
const z = 300;

// 导出
export { bar, x, y, z };
```
- 导入举例
as 设置别名
```js
import defaultCls, { foo, bar, x, y, z as CONST_C } from './moda';

foo();
bar();
console.log(x); // x只读，不可修改，x++异常
console.log(y); // y只读
console.log(CONST_C);
new defaultCls(1000).show();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713154822763.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 也可以使用下面的形式，导入所有导出，但是会定义一个新的名词空间。使用名词空间可以避免冲突
```js
import * as newmod from './mod';

newmod.foo();
newmod.bar();
new newmod.default(2000).show();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071315533885.png)

