---
title: html
date: 2019-06-21 18:46:41
categories:
- js
tags:
- html
---
@[toc](HTML)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>这是分段</p>
	<h1>这是标题</h1>
	<div><a href="http://www.baidu.com">这是链接</a></div>
	<div id="logo" class="logo">
		<img src="http://www.baidu.com/wp-content/uploads/2018/12/2018122312035677.png">
	</div>
</body>
</html>
```
- HTML（超文本标记语言——HyperText Markup Language），它使用标签来定义文本的显示方式。简单来说，HTML就是一种文本文件，里面的内容超出一般文本文件表示，它是用来控制显示格式和对内容进行排版的。
- 1997年W3C发布HTML 4.0。
- 2014年发布HTML5 
# 标签
```html
<p>这是分段</p>
<h1>这是大标题</h1>
```
如上， `<p>` 中的p就是标签，且是**开始标签**， `</p>` 是**结束标签**。开始、结束标签和内容组成完整的元素
`<p>` 标签，它的作用范围是下一个和它层次对应的结束标签 `</p>` 
```html
<a href="www.baidu.com" target="_blank">这是链接</a>
```
`href`和`target`是标签的属性

`<p />` 空元素可以在开始标签中关闭，也可以 `<p></p>` 。由于p标签是容器标签，在 `<p></p>` 中间可以插入其它
标签
在HTML中使用单独标签，例如 `<br>` `<hr>` `<img>` 等。它们中就不能插入其它标签
标签名可以使用大小写，但是推荐使用小写
标签会被解析成一个有层次的**DOM**树，不要出现标签交错的现象，这是错误的，但是浏览器有容错能力，但是可能显示的格式就不对了
# HTML文档结构
- 文档声明： `<!DOCTYPE html>` 声明文档类型，这是Html5的声明方式。早期的文档声明很长，规定了HTML遵从的规范，能自动检查错误等
- 根标签：html标签是根标签
- 头部：head标签就是头部，一般不是用来显示
	内部可以写`meta`信息、`title`网页标题、`script`脚本、样式表等标签
	`<meta charset="utf-8">` 定义网页编码格式为`utf-8`。浏览器会按照这个编码显示字符
- 正文：`body`标签才是浏览器显示的正文部分

alt + shift + f 对齐
# 常用标签
## 链接
```html
<a href="http://www.baidu.com" target="_blank" onclick="alert('anchor')">这是链接</a>
```
- `href`属性，指定链接，资源定位符
默认 self 打开一个新标签，打开一个新页面，_blank，超链接是最常使用的

- `target`属性，指定是否在本窗口中打开。_blank就是指新窗口打开链接

**onclick是点击事件**，等号后面往往写一个js函数或脚本执行。很多HTML标签都支持很多事件属性，常见有onclick、ondblclick、onkeydown、onkeyup、onkeypress、onmousedown、onmousemove、onmouseover、onsubmit、onchange等等。后面写的函数称作事件响应函数或事件回调函数。

- 链接，锚点，定位本页面中资源，还可以定位另一个页面的资源
`href=“#test”` 锚点，前面一定要加`#` ，在地址栏网页后加`#test`
```html
// 锚点使用
<body>
	<h1>这是最大的标题</h1>
	<p>这是段落</p>
	<div> style="backgroud-color: #f0f0f0"><a href="#test" target="_blank">anchor</a></a></div>
</body>
```
- 默认情况下，超链接点击后会发起一个HTTP GET请求
```html
<body>
    <h1>这是最大的标题</h1>
    <p>这是段落</p>
    <div> style="backgroud-color: #f0f0f0"><a href="http://www.baidu.com" target="_blank">anchor</a></a></div>
</body>
```
- 一般连接内部直接写内容,也可以放图片
- 如果需要访问超链接，需要加`http://` 
- 不然会当做文件访问，跳转相对路径
## url
- `index.html`   静态页面,更快
- 如果一个都找不到 会抛404错误,配置错误
![在这里插入图片描述](https://img-blog.csdnimg.cn/201907101800461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- `..` 上一层的
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710180109962.png)
## 图片
```html
<img src="http://www.baidu.com/wp-content/uploads/2018/12/2018122312035677.png">
```
图片标签，src指定图片路径
注意，图片会发起一个HTTP GET请求
如果去掉`http://` 为相对路径
直接发起请求
## 标题
`<h1>~<h6>` ，标题标签，默认`h1`字体最大，`h6`字体最小
## 图层
```html
<div id="logo" class="logo"></div>
```
id属性，非常重要，标签的唯一标识

class属性，非常重要，样式表定位并附加样式

`<div>` 标签，目前该标签加上CSS，被广泛用于网页布局中
## script
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071018035128.png)
- http请求，200 是OK，找不到 404错误

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710180417445.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)

## 列表
- 无序列表
无符号的默认样子
```html
<ul>
	 <li>Coffee</li>
	 <li>Milk</li>
</ul>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710180534964.png)
- 有序列表
```html
<ol>
	 <li>Coffee</li>
	 <li>Milk</li>
</ol>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710180559673.png)
## 表格
登录使用 div
报表展示 table

HTML 表格的基本结构：
- `<table>…</table>`：定义表格
- `<tr>…</tr>`：定义表格的行
- `<th>…</th>`：定义表格的标题列（文字加粗），一般不用
- `<td>…</td>`：定义表格的列
不过th现在用的少了，表格表头是否字体加粗，都用css控制。所以表中有tr表示行，td表示格子

`<br>` 换行
`<hr>` 分割线
`&nbsp;`  空格
```html
<table border="1">
	<tr> 
		<th>1,1</th>
		<th>1,2</th>
	</tr>
	<tr>
		<td>2,1</td>
		<td>2,2</td>
	</tr>
	<tr>
		<td colspan="2">占2列</td>
	</tr>
</table>
```
## path 路径 
windows  会先搜索当前工作路径,在搜索path路径
linux 需要加 `./`  
## 表单
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>helloword html</title>
    <script src="jquery.min.js"></script>
    <style>
        td {
            padding: 5px
        }
    </style>
</head>

<body>
    <form action="" method="POST" enctype="application/x-www-form-urlencoded">
        <table border="1" style="border-collapse: collapse">
            <tr>
                <td colspan="2">用户注册</td>
            </tr>
            <tr>
                <td>用户名</td>
                <td><input type="text" placeholder="用户名"></td>
            </tr>
            <tr>
                <td>密码</td>
                <td><input type="password" name="password" id="password"></td>
            </tr>
            <tr>
                <td>性别</td>
                <td>
                    <input type="radio" name="gender" id="gender" checked value="M">男
                    <input type="radio" name="gender" id="gender" value="F">女
                </td>
            </tr>
            <tr>
                <td>爱好</td>
                <td>
                    <input type="checkbox" name="interest" id="interest" value="music">音乐
                    <input type="checkbox" name="interest" id="interest" checked value="movie">
                    电影
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="submit" value="提交">
                    <input type="reset" value="重置">
                </td>
            </tr>
        </table>
    </form>
    
</body>

</html>
```
**特别注意**：表单控件如果要提交数据，**必须使用name属性**，否则不能提交到服务端

**form标签的重要属性**
- action，表单数据submit提交到哪里
- method，提交的方法，常用POST
- enctype，对提交的数据编码
	- application/x-www-form-urlencoded，在发送前编码所有字符（默认）
		- 空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值
	- multipart/form-data，不对字符编码。在使用包含文件上传控件的表单时，必须使用该值
	- text/plain，空格转换为 "+" 加号，但不对特殊字符编码
	
**form标签方法有 get post**
- get 我要这个资源你给我，get 只有 head
- post  提交数据,返回数据 ,常用于表单


### GET方法
- `/test.html` 请求路径
- `HTTP/1.1` 请求协议
- `Host: 127.0.0.1` 请求主机

keep-alive 留一段时间
URL= 路径 + 协议 + 主机
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710180946996.png)
- 304 用网页本地缓存
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710181136359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)

- referer 基于某个页面![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710181203847.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![-](https://img-blog.csdnimg.cn/20190710181255863.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
 - get 方法请求
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710181316581.png)
-  以问号开头，使用谁and谁方式
![在这里插入图片描述](https://img-blog.csdnimg.cn/201907101813417.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
-  ID给JS用的
- name是提交用的，没有name就没有资格提交
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710181400415.png)
