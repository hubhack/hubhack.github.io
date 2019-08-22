---
title: WSGI
date: 2019-06-21 18:46:41
categories:
- 后端框架
tags:
- 后端
---


![在这里插入图片描述](https://img-blog.csdnimg.cn/20190714102236481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- WSGI（Web Server Gateway Interface）主要规定了服务器端和应用程序间的接口

# WSGI服务器——wsgiref
- wsgiref是Python提供的一个WSGI参考实现库，不适合生产环境使用
- `wsgiref.simple_server` 模块实现一个简单的WSGI HTTP服务器

```python
from wsgiref.simple_server import make_server,demo_app

ip = '127.0.0.1'
port = 9999
server = make_server(ip, port, demo_app) # demo_app应用程序，可调用
server.serve_forever() # server.handle_request() 执行一次
```
- 查看`demo_app`源码
```js
def demo_app(environ,start_response):
    from io import StringIO
    stdout = StringIO()
    print("Hello world!", file=stdout)
    print(file=stdout)
    h = sorted(environ.items())
    for k,v in h:
        print(k,'=',repr(v), file=stdout)
    start_response("200 OK", [('Content-Type','text/plain; charset=utf-8')])
    return [stdout.getvalue().encode("utf-8")]
```
- `StringIO` 在内存中读写str
- `print("Hello world!", file=stdout)`
 将`Hello world!`内容写入内存中
 - `start_response` 构造head
 - `getvalue` 把缓冲区的内容全部读取出来，内容必须为`btyes`
# WSGI服务器作用
- 监听HTTP服务端口（TCPServer，默认端口80）
- 接收浏览器端的HTTP请求并解析封装成`environ`环境数据
- 负责调用应用程序，将`environ`数据和`start_response`方法两个实参传入给`Application`
- 将应用程序响应的正文封装成HTTP响应报文返回浏览器端
- 所有头和内容都是由server来封装
# WSGI APP应用程序端
1. 应用程序应该是一个可调用对象
Python中应该是**函数**、**类**、实现了 `__call__` 方法的**类的实例**
2. 这个可调用对象应该接收两个参数
## 1. 函数实现
```python
from wsgiref.simple_server import make_server

return_res = b'Hello World'

def application(environ, start_response):
    start_response("200 OK", [('Content-Type', 'text/plain; charset=utf-8')])
    return [return_res]

ip = '127.0.0.1'
port = 9999
server = make_server(ip, port, application) # demo_app应用程序，可调用
server.serve_forever() # server.handle_request() 执行一次
```
## 2. 类实现
```python
from wsgiref.simple_server import make_server

return_res = b'Hello World'


class Application:
    def __init__(self, environ, start_response):
        self.env = environ
        self.sr = start_response
    def __iter__(self): # 对象可迭代
        self.sr("200 OK", [('Content-Type', 'text/plain; charset=utf-8')])
        yield return_res

ip = '127.0.0.1'
port = 9999
server = make_server(ip, port, Application) # Demo_app应用程序，可调用
server.serve_forever() # server.handle_request() 执行一次
```
## 3. 类实现，可调用对象
```python
from wsgiref.simple_server import make_server

return_res = b'Hello World'


class Application:
    def __call__(self, environ, start_response):
        start_response("200 OK", [('Content-Type', 'text/plain; charset=utf-8')])
        return [return_res]

ip = '127.0.0.1'
port = 9999
server = make_server(ip, port, Application()) # Application(e,s)
server.serve_forever() # server.handle_request() 执行一次
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190714130104904.png)
- environ和start_response这两个参数名可以是任何合法名，但是一般默认都是这2个名字
- 应用程序端还有些其他的规定，暂不用关心

**注意**：第2、第3种实现调用时的不同
## 自定义 返回头
一般自定义习惯用`‘X’`开头
```python
from wsgiref.simple_server import make_server

return_res = b'Hello World'

class Application:
    def __call__(self, environ, start_response):
        start_response("200 OK", [
            ('Content-Type', 'text/plain; charset=utf-8'),
            ('X-Server', 'MyDemo_app')
        ])
        return [return_res]

ip = '127.0.0.1'
port = 9999
server = make_server(ip, port, Application()) # Application应用程序，可调用
server.serve_forever() # server.handle_request() 执行一次
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190714130445156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
## environ
environ是包含Http请求信息的dict字典对象
| 名称 | 含义 |
|:--|:--|
|REQUEST_METHOD |请求方法，GET、POST等|
|PATH_INFO| URL中的路径部分|
|QUERY_STRING| 查询字符串|
|SERVER_NAME, SERVER_PORT| 服务器名、端口|
|HTTP_HOST| 地址和端口|
|SERVER_PROTOCOL |协议|
|HTTP_USER_AGENT| UserAgent信息|

```
CONTENT_TYPE = 'text/plain'
HTTP_HOST = '127.0.0.1:9999'
HTTP_USER_AGENT = 'Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN) AppleWebKit/537.36 (KHTML, 
like Gecko) Version/5.0.1 Safari/537.36'
PATH_INFO = '/'
QUERY_STRING = ''
REMOTE_ADDR = '127.0.0.1'
REMOTE_HOST = ''
REQUEST_METHOD = 'GET'
SERVER_NAME = 'DESKTOP-D34H5HF'
SERVER_PORT = '9999'
SERVER_PROTOCOL = 'HTTP/1.1'
SERVER_SOFTWARE = 'WSGIServer/0.2'
```
## start_response

它是一个可调用对象。有3个参数，定义如下：
`start_response(status, response_headers, exc_info=None)`
|参数名称 |说明|
|:--|:--|
|status |状态码和状态描述，例如 200 OK|
|response_headers |一个元素为二元组的列表<br>例如`[('Content-Type', 'text/plain;charset=utf-8')]`|
|exc_info |在错误处理的时候使用|
start_response应该在返回可迭代对象之前调用，因为它返回的是Response Header。返回的可迭代对象是Response Body
# 服务器端
服务器程序需要调用符合上述定义的可调用对象APP，传入`environ`、`start_response`，APP处理后，返回响应头和可迭代对象的正文，由服务器封装返回浏览器端
- 返回网页的例子
```python
from wsgiref.simple_server import make_server

def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-Type', 'text/html;charset=utf-8')]
    start_response(status, headers)
    # 返回可迭代对象
    html = '<h1>Hello World</h1>'.encode("utf-8")
    return [html]

ip = '127.0.0.1'
port = 9999
server = make_server(ip, port, application)
server.serve_forever() # server.handle_request() 执行一次
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190714131425785.png)
simple_server 只是参考用，不能用于生产环境

## Linux 测试用命令
```
$ curl -I http://192.168.142.1:9999/xxx?id=5
$ curl -X POST http://192.168.142.1:9999/yyy -d '{"x":2}'
```
- `-I` 使用HEAD方法
- `-X` 指定方法，`-d`传输数据

到这里就完成了一个简单的WEB 程序开发
## WSGI WEB服务器
- 本质上就是一个TCP服务器，监听在特定端口上
- 支持HTTP协议，能够将HTTP请求报文进行解析，能够把响应数据进行HTTP协议的报文封装并返回浏览器端
- 实现了WSGI协议，该协议约定了和应用程序之间接口（参看PEP333，https://www.python.org/dev/peps/pep-0333/ ）
## WSGI APP应用程序
- 遵从WSGI协议
- 本身是一个可调用对象
- 调用start_response，返回响应头部
- 返回包含正文的可迭代对象

WSGI 框架库往往可以看做增强的更加复杂的Application

