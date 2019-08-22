---
title: 模拟登录
categories: 
- 爬虫
tags:
- 爬虫
---
# 模拟登陆oschina（新浪）
一般登录后，用户就可以一段时间内可以使用该用户身份操作，不需要频繁登录了。这背后往往使用了Cookie技术

登录后，用户获得一个cookie值，这个值在浏览器当前会话中保存，只要不过期甚至可以保存很久

用户每次向服务器提交请求时，将这些Cookie提交到服务器，服务器经过分析Cookie中的信息，以确认用户身份，确认是信任的用户身份，就可以继续使用网站功能

## Cookie 
网景公司发明。cookie一般是一个键值对name=value，但还可以包括expire过期时间、path路径、domain域、secure安全、httponly等信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730125400526.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
清空oschina.net的所有cookies，重新登录，勾选"记住密码‘’
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730125423491.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
登陆前需将所有cookies清除
```
使用 wei.xu@magedu.com/magedu.com18 登录oschina后，HTTP请求头如下
```
```
Host: www.oschina.net
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Referer: https://www.oschina.net/home/login?goto_page=https%3A%2F%2Fwww.oschina.net%2F%3Fnocache%3D1564293263846
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: aliyungf_tc=AQAAAMgC7FB9xAEADtR2e0KAzgb3hr0a; _user_behavior_=768762a3-dbce-4152-a024-264820556c9c; OSCHINA_SESSION=4DFB86BECA93B1D28BC8FEF2E1478E97; _reg_key_=EwiEfyB66X3jlOb4pNzk; oscid=ZV2oveUqo28xv80qumQtfRqukWzpKq2brNqjn0Y0a5kFTeUQUUbcPj2dwLIiVt%2FuobUFKx4%2FabVv%2BZ5n%2BrJhvE8p%2BKdiM%2FUIONcDpf9cQ%2FCwMTYxj0IZhKrEKkqVYfw%2BdNYj1bbHQEhDiqhDeFBZbsf7ouMp1Msoa4cH6mU1ZtM%3D
```
- 对比登录前后的cookie值，发现登录后有oscid
- 那就把这个HTTP 请求头放在代码中

注意：**每次登录后要重新生成下面的headers**
使用`Postman`将请求头改为KV对形式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730130346752.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730130436327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730130503281.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730130516829.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190730130537403.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
```python
from bs4 import BeautifulSoup
import requests

url = "https://www.oschina.net"

headers = {
    'Host': "www.oschina.net",
    'Connection': "keep-alive",
    'Upgrade-Insecure-Requests': "1",
    'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36",
    'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    'Referer': "https://www.oschina.net/home/login?goto_page=https%3A%2F%2Fwww.oschina.net%2F%3Fnocache%3D1564293263846",
    'Accept-Encoding': "gzip, deflate, br",
    'Accept-Language': "zh-CN,zh;q=0.9,en;q=0.8",
    'Cookie': "aliyungf_tc=AQAAAMgC7FB9xAEADtR2e0KAzgb3hr0a; _user_behavior_=768762a3-dbce-4152-a024-264820556c9c; OSCHINA_SESSION=4DFB86BECA93B1D28BC8FEF2E1478E97; _reg_key_=EwiEfyB66X3jlOb4pNzk; oscid=ZV2oveUqo28xv80qumQtfRqukWzpKq2brNqjn0Y0a5kFTeUQUUbcPj2dwLIiVt%2FuobUFKx4%2FabVv%2BZ5n%2BrJhvE8p%2BKdiM%2FUIONcDpf9cQ%2FCwMTYxj0IZhKrEKkqVYfw%2BdNYj1bbHQEhDiqhDeFBZbsf7ouMp1Msoa4cH6mU1ZtM%3D",
    'cache-control': "no-cache"
    }

response = requests.request("GET", url, headers=headers)

with response:
    with open('d:/osc.html', 'w', encoding='utf-8') as f:
        f.write(response.text)
```
已登录访问首页，右上角会有用户信息，如下
```html
<div class="right menu">
        <a class="item" href="https://www.oschina.net/home/go?page=admin%2Fpublish">投递新闻/软件</a>
        <div class="ui icon dropdown item" id="message">
            <i class="alarm icon"></i>
            <div class="ui red circular mini label total-count">-3</div>
            <div class="menu">
                <div class="header message-header"> 暂没有未读消息 </div>
                <a class="item " style='display: none'></a>
                <div class="message-list"></div>
                <div class="header action clearfix">
                    <span class="go-inbox"><a
                            href="https://my.oschina.net/u/3881396/admin/inbox">消息中心</a></span>
                    <span class="mark-read-all"><a href="javascript:;">全部标记为已读</a></span>
                </div>
            </div>
        </div>
        <a class="ui dropdown item toggle-user-sidebar">
            <div class="osc-avatar small-portrait _28x28 ui avatar image current-user-avatar"
                title="magedu_wayne" data-user-id="3881396">
                <span class="text-portrait" style="background: #16a085">m</span>
            </div>
            <i class="caret right icon"></i>
        </a>
    </div>
</div>
<div id="mainScreen">
    <div class="home-container">
```
如果没有登录，一定不能在页面中出现用户的名称和userid的
未登录访问首页，右上角显示登录、注册链接，如下
```html
<div class="right menu">
	<a class="item" href="https://www.oschina.net/home/go?page=admin%2Fpublish">投递新闻/软件</a>
	<a class="item" href="https://www.oschina.net/home/login?
goto_page=https%3A%2F%2Fwww.oschina.net%2F">登录</a>
	<a class="item" href="https://www.oschina.net/home/reg?
goto_page=https%3A%2F%2Fwww.oschina.net%2F">注册</a>
</div>
```
新浪微博等都一样，只要允许记住用户登录，就可以通过上述方法登录后爬取内容
