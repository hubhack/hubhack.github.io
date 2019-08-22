---
title: web开发
date: 2019-06-21 18:46:41
tags:
- web
categories:
- web
---
@[toc](WEB开发)
# CS编程
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071322175666.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
CS编程，即客户端、服务器编程
- 客户端、服务端之间需要使用Socket，约定协议、版本（往往使用的协议是TCP或者UDP），指定地址和端口，就可以通信
- 客户端、服务端传输数据，数据可以有一定的格式，双方必须先约定好


# BS编程
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713221911825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
BS编程，即Browser、Server开发
- Browser浏览器，一种特殊的客户端，支持HTTP(s)协议，能够通过URL向服务端发起请求，等待服务端返回HTML等数据，并在浏览器内可视化展示的程序
- Server，支持HTTP(s)协议，能够接受众多客户端发起的HTTP协议请求，经过处理，将HTML等数据返回给浏览器
- 本质上来说，BS是一种特殊的CS，即客户端必须是一种支持HTTP协议且能解析并渲染HTML的软件，服务端必须是能够接收多客户端HTTP访问的服务器软件
- HTTP协议底层基于TCP协议实现

BS开发分为两端开发
- 客户端开发，或称前端开发。HTML、CSS、JavaScript等
- 服务端开发，Python有WSGI、Django、Flask、Tornado等

# HTTP协议
## 安装httpd
可以安装httpd或nginx等服务端服务程序，通过浏览器访问，观察http协议
## 无状态，有连接和短连接
- **无状态**：指的是服务器无法知道2次请求之间的联系，即使是前后2次同一个浏览器也没有任何数据能够判断出是同一个浏览器的请求。后来可以通过cookie、session来判断

- **有连接**：是因为它基于TCP协议，是面向连接的，需要3次握手、4次断开

- **短连接**：Http 1.1之前，都是一个请求一个连接，而Tcp的连接创建销毁成本高，对服务器有很大的影响。所以，自Http 1.1开始，支持keep-alive，默认也开启，一个连接打开后，会保持一段时间（可设置），浏览器再访问该服务器就使用这个Tcp连接，减轻了服务器压力，提高了效率
## 协议
Http协议是无状态协议
- 同一个客户端的两次请求之间没有任何关系，从服务器端角度来说，它不知道这两个请求来自同一个客户端
### URL组成
- URL可以说就是地址，uniform resource locator 统一资源定位符，每一个链接指向一个资源供客户端访问
`schema://host[:port#]/path/.../[;url-params][?query-string][#anchor]`
- 例如，通过下面的URL访问网页
`http://www.bing.com/pathon/index.html?id=5&name=python`
- 访问静态资源时，通过上面这个URL访问的是网站的某路径下的index.html文件，而这个文件对应磁盘上的真实的文件。就会从磁盘上读取这个文件，并把文件的内容发回浏览器端

**scheme 模式、协议**
http、ftp、https、file、mailto等等

**host:port**
`www.python.org:80` ，80端口是默认端口可以不写。域名会使用DNS解析，域名会解析成IP才能使用。实际上会对解析后返回的IP的TCP的80端口发起访问

**/path/to/resource** 
path，指向资源的路径

**?key1=value1&key2=value2**
query string，查询字符串，问号用来和路径分开，后面key=value形式，且使用&符号分割
### HTTP消息
消息分为Request请求、Response响应

Request：浏览器向服务器发起的请求
Response：服务器对客户端请求的响应

- 请求报文由Header消息报头、Body消息正文组成（可选）
请求报文第一行称为请求行

- 响应报文由Header消息报头、Body消息正文组成（可选）
响应报头第一行称为状态行

- 每一行使用回车和换行符作为结尾
- 如果有Body部分，Header、Body之间留一行空行

#### 请求报文
- 请求消息行：请求方法Method 请求路径 协议版本CRLF

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713223817876.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
##### 请求方法Method
|方法 |说明 |
|:--|:--|
|GET  | 请求获取URL对应的资源 |
|POST  | 提交数据至服务器端 |
| HEAD  | 和GET类似，不过不返回响应报文的正文 |
##### 常见传递信息的方式
1. GET方法使用Query String 
`http://www.bing.com/pathon/index.html?id=5&name=python&name=linux`
通过查询字符串在URL中传递参数，而URL在请求报文的头部的第一行
2. POST方法提交数据
 请求时提交的数据是在请求报文的正文Body部分
```
请求消息如下
POST /xxx/yyy?id=5&name=bing HTTP/1.1
HOST: 127.0.0.1:9999
content-length: 26
content-type: application/x-www-form-urlencoded

age=5&weight=80&height=170
```
3. URL中本身就包含着信息
`http://www.bing.com/python/student/001`
#### 响应报文
- 响应消息行：协议版本 状态码 消息描述CRLF 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713224211291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
##### status code状态码
- 状态码在响应头第一行
```
1xx 提示信息，表示请求已被成功接收，继续处理
2xx 表示正常响应
	200 正常返回了网页内容
3xx 重定向
	301 页面永久性移走，永久重定向。返回新的URL，浏览器会根据返回的url发起新的request请求
	302 临时重定向
	304 资源未修改，浏览器使用本地缓存
4xx 客户端请求错误
	404 Not Found，网页找不到，客户端请求的资源有错
	400 请求语法错误
	401 请求要求身份验证
	403 服务器拒绝请求
5xx 服务器端错误
	500 服务器内部错误
	502 上游服务器错误，例如nginx反向代理的时候
```
### Cookie技术
- 键值对信息
- 是一种客户端、服务器端传递数据的技术
- 一般来说cookie信息是在服务器端生成，返回给浏览器端的
- 浏览器端可以保持这些值，浏览器对同一域发起每一请求时，都会把Cookie信息发给服务器端
- 服务端收到浏览器端发过来的Cookie，处理这些信息，可以用来判断这次请求是否和之前的请求有关联

曾经Cookie唯一在浏览器端存储数据的手段，目前浏览器端存储数据的方案很多，Cookie正在被淘汰

当服务器收到HTTP请求时，服务器可以在响应头里面添加一个Set-Cookie键值对。浏览器收到响应后通常会保存这些Cookie，之后对该服务器每一次请求中都通过Cookie请求头部将Cookie信息发送给服务器

另外，Cookie的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。
可以使用 `Set－Cookie: NAME=VALUE；Expires=DATE；Path=PATH；Domain=DOMAIN_NAME；SECURE`

- 例如：
```
 Set-Cookie:aliyungf_tc=AQAAAJDwJ3Bu8gkAHbrHb4zlNZGw4Y; Path=/; HttpOnly
 set-cookie:test_cookie=CheckForPermission; expires=Tue, 19-Mar-2018 15:53:02 GMT; path=/; 
 domain=.doubleclick.net

 Set-Cookie: BD_HOME=1; path=/
```
|key  |value说明  |
|:--|:--|
| Cookie过期  | Cookie可以设定过期终止时间，过期后将被浏览器清除<br>如果缺省，Cookie不会持久化，浏览器关闭Cookie消失，称为会话级Cookie |
| Cookie域 |域确定有哪些域可以存取这个Cookie<br>缺省设置属性值为当前主机，例如 `www.python.org`<br>如果设置为 `python.org` 表示包含子域 |
| Path | 确定哪些目录及子目录访问可以使用该Cookie |
|  **Secure**| 表示Cookie随着`HTTPS`加密过得请求发送给服务端<br>有些浏览器已经不允许`http://`协议使用Secure<br>这个Secure不能保证Cookie是安全的，Cookie中不要传输敏感信息 |
| HttpOnly  | 将Cookie设置此标记，就**不能**被`JavaScript`访问，只能发给服务器端 |

>Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
告诉浏览器端设置这个Cookie的键值对，有过期时间，使用HTTPS加密传输到服务器端，且不能被浏览器中JS脚本访问该Cookie

```
Cookie的作用域：Domain和Path定义Cookie的作用域

Domain
domain=www.baidu.com 表示只有该域的URL才能使用
domain=.baidu.com 表示可以包含子域，例如www.baidu.com 、python.baidu.com 等

Path
path=/ 所有/的子路径可以使用
domain=www.baidu.com; path=/webapp 表示只有www.baidu.com/webapp下的URL匹配，例如
http://www.baidu.com/webapp/a.html就可以
```
**缺点**
- Cookie一般明文传输（Secure是加密传输），安全性极差，不要传输敏感数据
- 有4kB大小限制
- 每次请求中都会发送Cookie，增加了流量
### Session技术
WEB 服务器端，尤其是动态网页服务端Server，有时需要知道浏览器方是谁，但是HTTP是无状态的，怎么办？
- 服务端会为每一次浏览器端第一次访问生成一个SessionID，用来唯一标识该浏览器，通过Set-Cookie发送到浏览器端
- 浏览器端收到之后并不永久保持这个Cookie，只是**会话级**的。浏览器访问服务端时，会使用Cookie，也会带上这个SessionID的Cookie值

```
Set-Cookie:JSESSIONID=741248A52EEB83DF182009912A4ABD86.Tomcat1; Path=/; HttpOnly
```
服务端会维持这个SessionID一段时间，如果超时，会清理这些超时没有人访问的SessionID。如果浏览器端发来的SessionID无法在服务端找到，就会自动再次分配新的SessionID，并通过Set-Cookie发送到浏览器端以覆盖原有的存在浏览器中的会话级的SessionID


### 推荐图书《HTTP权威指南》

