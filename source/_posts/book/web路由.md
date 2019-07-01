---
title: web路由
categories: 
- web
tags:
- web
---

web开发中路由route和路由器router到底是什么

### 1. 什么是路由

在Web开发过程中，经常会遇到『路由』的概念。那么，到底什么是路由？简单来说，路由就是URL到函数的映射。

### 2. router和route的区别

route就是一条路由，它将一个URL路径和一个函数进行映射，例如：

> /users -> getAllUsers()
>
> /users/count -> getUsersCount()

这就是两条路由，当访问`/users`的时候，会执行`getAllUsers()`函数；当访问`/users/count`的时候，会执行`getUsersCount()`函数。

而router可以理解为一个容器，或者说一种机制，它管理了一组`route`。简单来说，`route`只是进行了URL和函数的映射，而在当接收到一个URL之后，去路由映射表中查找相应的函数，这个过程是由`router`来处理的。一句话概括就是 “The router routes you to a route”。

### 3. 服务器端路由

对于服务器来说，当接收到客户端发来的HTTP请求，会根据请求的URL，来找到相应的映射函数，然后执行该函数，并将函数的返回值发送给客户端。对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理，等等。

以Express为例，

```
app.get('/', (req, res) => {
  res.sendFile('index')
})

app.get('/users', (req, res) => {
  db.queryAllUsers()
    .then(data => res.send(data))
})
```

这里定义了两条路由：

- 当访问/的时候，会返回index页面
- 当访问/users的时候，会从数据库中取出所有用户数据并返回

> 不仅仅是URL
>
> 在router匹配route的过程中，不仅会根据URL来匹配，还会根据请求的方法来看是否匹配。例如上面的例子，如果通过POST方法来访问/users，就会找不到正确的路由。

### 4. 客户端路由

对于客户端（通常为浏览器）来说，路由的映射函数通常是进行一些DOM的显示和隐藏操作。这样，当访问不同的路径的时候，会显示不同的页面组件。客户端路由最常见的有以下两种实现方案：

- 基于Hash
- 基于History API

#### (1) 基于Hash

我们知道，URL中#及其后面的部分为hash。例如：

```
const url = require('url')
var a = url.parse('http://example.com/a/b/#/foo/bar')
console.log(a.hash)
// => #/foo/bar
```

hash仅仅是客户端的一个状态，也就是说，当向服务器发请求的时候，hash部分并不会发过去。

通过监听window对象的hashChange事件，可以实现简单的路由。例如：

```
window.onhashchange = function() {
  var hash = window.location.hash
  var path = hash.substring(1)

  switch (path) {
    case '/':
      showHome()
      break
    case '/users':
      showUsersList()
      break
    default:
      show404NotFound()
  }
}
```

#### (2) 基于History API

通过HTML5 History API可以在不刷新页面的情况下，直接改变当前URL。详细用法可以参考：

Manipulating the browser history
Using the HTML5 History API
我们可以通过监听window对象的popstate事件，来实现简单的路由：

```
window.onpopstate = function() {
  var path = window.location.pathname

  switch (path) {
    case '/':
      showHome()
      break
    case '/users':
      showUsersList()
      break
    default:
      show404NotFound()
  }
}
```

但是这种方法只能捕获前进或后退事件，无法捕获pushState和replaceState，一种最简单的解决方法是替换pushState方法，例如：

```
var pushState = history.pushState
history.pushState = function() {
  pushState.apply(history, arguments)

  // emit a event or just run a callback
  emitEventOrRunCallback()
}
```

不过，最好的方法还是使用实现好的history库。

#### (3) 两种实现的比较

总的来说，基于Hash的路由，兼容性更好；基于History API的路由，更加直观和正式。

但是，有一点很大的区别是，基于Hash的路由不需要对服务器做改动，基于History API的路由需要对服务器做一些改造。下面来详细分析。

假设服务器只有如下文件（script.js被index.html所引用）：

```
/-
 |- index.html
 |- script.js
```

基于Hash的路径有：

```
http://example.com/
http://example.com/#/foobar
```

基于History API的路径有：

```
http://example.com/
http://example.com/foobar
```

当直接访问`http://example.com/`的时候，两者的行为是一致的，都是返回了`index.html`文件。

当从`http://example.com/`跳转到`http://example.com/#/foobar`或者`http://example.com/foobar`的时候，也都是正常的，因为此时已经加载了页面以及脚本文件，所以路由跳转正常。

当直接访问`http://example.com/#/foobar`的时候，实际上向服务器发起的请求是`http://example.com/`，因此会首先加载页面及脚本文件，接下来脚本执行路由跳转，一切正常。

当直接访问`http://example.com/foobar`的时候，实际上向服务器发起的请求也是`http://example.com/foobar`，然而服务器端只能匹配`/`而无法匹配`/foobar`，因此会出现404错误。

因此如果使用了基于History API的路由，需要改造服务器端，使得访问`/foobar`的时候也能返回`index.html`文件，这样当浏览器加载了页面及脚本之后，就能进行路由跳转了。

#### 5. 动态路由

上面提到的例子都是静态路由，也就是说，路径都是固定的。但是有时候我们需要在路径中传入参数，例如获取某个用户的信息，我们不可能为每个用户创建一条路由，而是在通过捕获路径中的参数（例如用户id）来实现。

例如在Express中：

```
app.get('/user/:id', (req, res, next) => {
  // ... ...
})
在Flask中：

@app.route('/user/<user_id>')
def get_user_info(user_id):
    pass
```

#### 6. 严格路由

在很多情况下，会遇到`/foobar`和`/foobar/`的情况，它们看起来非常类似，然而实际上有所区别，具体的行为也是视服务器设置而定。

在Flask的文档中，提到，末尾有斜线的路径，类比于文件系统的一个目录；末尾没有斜线的路径，类比于一个文件。因此访问/foobar的时候，可能会重定向到`/foobar/`，而反过来则不会。

如果使用的是`Express`，默认这两者是一样的，也可以通过`app.set`来设置`strict routing`，来区别对待这两种情况。