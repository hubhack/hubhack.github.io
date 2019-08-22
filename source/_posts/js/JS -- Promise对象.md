---
title: js-Promise
date: 2019-06-21 18:46:41
tags:
- js
categories:
- js
---


@[toc](Promise)
# 概念
ES6开始支持
Promise对象用于一个异步操作的最终完成（包括成功和失败）及结果值的表示

简单说，就是处理异步请求的。
之所以叫做Promise，就是我承诺做这件事，如果成功则怎么处理，失败则怎么处理
```js
// 语法
new Promise(
	/* 下面定义的函数是executor */
	function(resolve, reject) {...}
);
```
## executor
- executor 是一个带有 resolve 和 reject 两个参数的函数 
- executor 函数在Promise构造函数执行时立即执行，被传递resolve和reject函数（executor 函数在Promise构造函数返回新建对象前被调用）
- executor 内部通常会执行一些异步操作，一旦完成，可以调用resolve函数来将promise状态改成fulfilled即完成，或者在发生错误时将它的状态改为rejected即失败
- 如果在executor函数中抛出一个错误，那么该promise 状态为rejected。executor函数的返回值被忽略
- executor中，resolve或reject只能执行其中一个函数
## Promise的状态
- pending: 初始状态，不是成功或失败状态
- fulfilled: 意味着操作成功完成
- rejected: 意味着操作失败
```js
setInterval(function[, delay]); // 间隔多少毫秒就执行函数一次，循环执行
setTimeout(function[, delay]); // 等待多少毫秒就执行函数一次，结束
delay  // 延时，缺省0，立即执行
function // 延时到的时候执行的函数
var myPromise = new Promise(function(resolve, reject){
	console.log('do sth.')
	setTimeout(()=>{
		console.log('~~~~~')
		resolve('ok');
	}, 3000); // 
})

console.log(myPromise);

setInterval(() => {
	console.log(myPromise, '++++')
}, 1000); // 每隔1秒执行一次
```
## Promise.then(onFulfilled, onRejected)
参数是2个函数，根据当前Promise对象A的状态来调用不同的函数，fulfilled走onFulfilled函数F1，rejected走onRejected函数F2
then的返回值是一个新的promise对象B，执行任意一个回调函数，对这个promise对象来说就是其返回值
调用任何一个函数后，其返回值可以被后续的then方法继续捕捉（链式）

任何一个回调函数执行，其返回值ret被resolve(ret)，作为B的完成结果
```js
var myPromise = new Promise(function(resolve, reject){
	console.log('do sth.')
	setTimeout(()=>{
		console.log('~~~~~')
		resolve('ok');
		//reject('error');
	}, 3000); // 延时3秒执行一次结束
})

console.log(myPromise);

setInterval(() => {
	console.log(myPromise, '++++');
}, 1000); // 每隔1秒执行一次

let pro1 = myPromise.then(
	value => {
		console.log('successful');
		return 1111;
	},
	reason => {
		console.log('failed');
		return 2222;
	}
)

setInterval(() => {
	console.log(pro1, '@@@@');
}, 1000); // 每隔1秒执行一次
```
## catch(onRejected)
- 为当前Promise对象A添加一个拒绝回调F，返回一个**新的Promise对象B**

- 如果A进入fulfilled状态，则A的完成结果作为B的完成结果

- 如果A进入rejected状态，回调F执行，F的返回值ret来resolve(ret)
```js
var myPromise = new Promise(function(resolve, reject){
	console.log('do sth.')
	setTimeout(()=>{
		console.log('~~~~~')
		resolve('ok');
		//reject('error');
	}, 3000); // 延时3秒执行一次结束
})

console.log(myPromise);

setInterval(() => {
	console.log(myPromise, '++++');
}, 1000); // 每隔1秒执行一次

let pro2 = myPromise.catch(reason=>{
	console.log(reason, '****')
})

setInterval(() => {
	console.log(pro2, '####');
}, 1000); // 每隔1秒执行一次
```
**Promise 提供2个方法**：
- Promise.resolve(value) 返回 状态为fulfilled的Promise对象
- Promise.reject(reason)返回 状态为rejected状态的Promise对象
```js
var myPromise = new Promise(function(resolve, reject){ 
	console.log('do sth.')
	setTimeout(()=>{
		console.log('~~~~~')
		resolve('ok');
		//reject('error');
	}, 3000); // 延时3秒执行一次结束
})

let pro1 = myPromise.then( 
	value => {/*如果成功则显示结果*/
		console.log(1, 'successful');
		return 1111;
	},
	reason => {/*如果失败则显示原因*/ 
		console.log(2, 'failed');
		return 2222;
	}
)

let pro2 = myPromise.catch(reason=>{
	console.log(3, reason)
})

// 开始链式调用
pro2.then( 
	value => console.log(4, value), // value是什么？
 	reason => console.log(5, reason) // reason是什么？
).then(
	value => {
		console.log(6, value) // 已经不是pro2对象了，value是什么
		return Promise.reject('pro2 => new Promise object rejected');
 	}
).catch(
	reason => {
		console.log(7, reason);
 		return Promise.resolve(reason + ' *')
	}
).then(
	value => console.log(8, value), // value是什么？
	reason => console.log(9, reason) // reason是什么？
) // 返回的是什么？

/*执行结果
do sth.
~~~~~
1 'successful'
4 'ok'
6 undefined
7 'pro2 => new Promise object rejected'
8 'pro2 => new Promise object rejected *'
*/
```
# 异步实例
```js
function runAsync() {
    return new Promise(function (resolve, reject) {
        // 异步操作   
        setTimeout(function () {
            console.log('do sth...');
            resolve('ok...');
        }, 3000);
    });
}

// 调用
runAsync().then(
    value => {
        console.log(value);
        return Promise.reject(value + '*');
    }
).catch(
    reason => {
        console.log(reason);
        return Promise.resolve(reason + '*');
    }
).then(
    value => {
        console.log(value);
        console.log('Promise END');
    }
)

console.log('==== FIN ====');

/*执行结果
==== FIN ====
do sth...
ok...
ok...*
ok...**
Promise END
*/
```
