---
title: flask
categories: 
- 后端框架
- flask
tags:
- python
---


下载示例代码, 安装到当前目录的flasky文件夹下.

```
git clone https://github.com/miguelgrinberg/flasky.git
```

```
git checkout 1a
git reset --hard
git fetch --all
git fetch --tags
git reset --hard orign/master
git diff 2a 2b

```

### flask

在大多数标准中, flask都算小型框架, 小到可以称为"微框架".它具有一个包含接班服务的强健核心, 其他功能则可通过扩展实现.

flask有3个主要依赖: 路由,调试, web服务网关接口(wsgi)子系统由werkzeug提供, 模板系统由jinja2提供, 命令行集成有click提供.

创建应用目录

```
git clone https://github.com/miguelgrinberg/flasky.git
cd flasky
```

初始化

所有的Flask应用都必须创建一个应用实例.web服务器使用一种名为web服务器网关接口(wsgi)的协议.把接收自客户端的所有请求都转交给这个对象处理.应用实例是Flask类的对象.通常有下列代码创建.

```
from flask import Flask
app = Flask(__name__)
```

-----

在flask中有两种上下文: 应用上下文和请求上下文.

钩子函数:有时在处理请求之前或之后执行代码会很有用.

before_request

注册一个函数, 在每次请求之前运行

before_first_request

注册一个函数, 只在处理第一个请求之前运行,可以通过这个钩子函数添加服务器初始化任务.

after_request注册一个函数, 如果没有未处理的异常抛出, 在每次请求之后运行.

teardown_request

注册一个函数, 即使有未处理的异常抛出, 也在每次请求之后运行.

在请求钩子函数和视图函数之间共享数据一般使用上下文全局变量g, 

