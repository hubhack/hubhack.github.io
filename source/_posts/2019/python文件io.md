---
title: python文件io

categories: 
- python
tags:
- python
---
# 文件io常用操作
一般说io操作,指的是文件io, 如果指的是网络io,都会直接说网络io
open:打开 read:读取 write:写入 close:关闭 readline: 行读取 readlines: 多行读取
seek: 文件指针操作 tell: 指针位置

打开操作:打开一个文件,返回一个文件对象和文件描述符,打开文件失败,则返回异常.
文件操作中,最常用的操作就是读和写.
文件访问的模式有两种:文本模式和二进制模式.不同模式下,操作函数不尽相同,表现的结果也不一样.
注: windows中使用codepage代码页,可以认为每一个代码页就是一张编码表.cp936等同于GBK.
open的参数:file打开或者要创建的文件名.如果不指定路径,默认是当前路径.
mode模式 r:缺省,表示只读打开. w: 只写打开 x:创建并写入一个新文件
a: 写入打开,如果文件存在,则追加
b:二进制模式 t:缺省,文本模式 +: 读写打开一个文件.给原来只读,只写方式打开提供缺失的读或者写能力.

open默认是只读模式r打开已经存在的文件.

文件指针:mode=r, 指针起始在0, mode=a,指针起始在EOF
buffering:缓冲区
0:只在二进制模式打开,表示关buffer
1:只在文本模式使用, 表示使用行缓冲,意思就是见到换行符就flush
大于1:用于指定buffer的大小.

# 上下文管理

1.异常处理
当出现异常的时候,拦截异常.但是,因为很多代码都可能出现OSError异常,还不好判断异常就是应为资源限制产生的.
使用finally可以保证打开的文件可以被关闭.
2.上下文管理
一种特殊的语法, 交给解释器去释放文件对象.
使用with ... as关键字
上下文管理的语句并不会开启新的作用域
with语句执行的时候,自动关闭文件对象.
```
f1 = open('text')
with f1:
    f1.write('abc')
f1.closed
```
对于类似于文件对象的io对象,一般来说都需要在不使用的时候关闭,注销,以释放资源
io被打开的时候,会获得一个文件描述符,计算机资源是有限的,所以操作系统都会做限制,就是为了保护计算机的资源不要被完全耗尽,计算资源是共享的,不是独占的,一般情况下,除非特别明确的知道资源情况,否则不要提高资源的限制值来解决问题.

StringIO和BytesIO
StringIO
io模块中的类
from io import StringIO
内存中,开辟的一个文本模式的buffer,可以像对象一样操作它.
当close方法被调用的时候,这个buffer被释放.

好处:一般来说,磁盘的操作比内存的操作要慢的多,内存足够的情况下,一般的优化思路是少落地,减少磁盘io的过程,可以大大提高程序的运行效率.

BytesIO
io模块中的类
from io import BytesIO
内存中,开辟的一个二进制模式的buffer, 可以像文件对象一样操作它.
当close方法被调用的时候, 这个buffer会释放.


file-like对象
类文件对象,可以像文件一样操作
socket对象,输入输出对象都是类文件对象.


# 路径操作

from os import path
3.4版本开始
建议使用pathlib模块,提供path对象来操作.包括目录和文件
Pathlib模块

目录操作初始化
路径拼接和分解
操作符
分解
joinpath


# 通配符
glob通配给定的模式
rglob通配给定的模式,递归目录
都返回一个生成器
?代表一个字符
*表示任意个字符
[abc]或[a-z]表示一个字符

匹配
match(pattern)
模式匹配,成功返回True

文件操作
os模块
os.name windows是nt, linux是posix
os.uname() *nix支持
sys.platform windows显示win32, linux 显示linux
os.listdir返回指定目录内容列表, 不递归
os也有open,read,write等方法,但是太底层建议使用内建函数open,read ,write,使用方式相似.

# shutil模块
文件拷贝:使用打开2个文件对象,源文件读取内容,写入目标文件中来完成拷贝过程,但是这样丢失stat数据信息,因为根本没有复制这些信息过去.
python提供了一个方便的shutil(高级文件操作)
copy复制
copyfileobj(fsrc, fdst[, length])

文件对象的复制,fsrc和fdst是open打开的文件对象,复制内容.fdst要求可写.
```
import shutil
with open ('text', 'r+') as f:
    f.write('abcd')
    with open('text1', 'w+') as f1:
        shutil.copyfileobj(f, f1)

```
复制文件内容,不含元数据,src,dst为文件的路径字符串.

# rm删除
shutil.rmtree(path, ignore_errors=False, oneerror=None)
递归删除,如同rm -rf一样危险,慎用.
他不是原子操作,有可能删除错误,就会中断,已经删除的就删除了.
shutil.retree("text") 类似rm -rf

# move移动

递归移动文件,目标到目标,返回目标
本身使用的是os.rename方法
如果不支持rename,如果是目录则copytree再删除源目录.
shutil 还有打包功能,生成tar并压缩,支持zip,gz,bz,xz

# csv文件
csv是一个被行分隔符,列分割符划分成行和列的文本文件.
csv不指定字符编码.
行分割符为\r\n,最后一行可以没有换行符.
列分割符常用逗号或者制表符.
每一行称为一条记录record.
字段可以使用双引号括起来,也可以不使用.如果字段中出现了双引号,逗号,换行符必须使用双引号括起来.
csv模块
返回reader对象,是一个行迭代器
默认使用excel方言.
delimiter列分割符,逗号.
lineterminator行分割符\r\n

# ini文件处理

作为配置文件,ini文件格式的很流行.

中括号里面的部分称为section,译作节,区, 段
每一个section内, 都是key=value形成的键值对,key称为option选项.
注意这里的DEFAULT是缺省section的名字,必须大写.
configparser
configparser模块的configparser类就是用来操作.
可以将section当做key,section存储键值对组成的字典,可以吧ini配置文件当成一个且套的字典.默认使用的是有序字典.

# 序列化和反序列化

为什么要序列化
内存要中的字典,列表,集合以及各种对象,如何保存到一个文件中.
要设计一套协议,按照某种规则,把内存中数据保存到文件中,文件是一个字节序列,所以必须把数据转换成字节序列,输出到文件,这就是序列化,反之,把文件的字节序列恢复到内存并且还是原来的类型.就是反序列化.
serialization序列化
将内存中对象存储下来,把他变为一个个字节.
deserialization反序列化
将文件的一个个字节恢复成内存中的对象
序列化保存到文件就是持久化
可以将数据序列后持久化,或者网络传输,也可以将文件中或者网络收到的字节序列反序列化
python提供了pickle库

dumps 对象序列化为bytes对象
dump 对象序列化到文件对象,就是存入文件
loads 从bytes对象反序列化
load 对象反序列化,从文件读取数据

序列化应用
一般来说本地序列化的情况,应用较少,大多数场景都应用在网络传输中.
将数据序列化后通过网络传输到远程结点,远程服务器上的服务将收到数据序列化后,就可以使用
但是,要注意一点,大多数项目,都不是单机的,也不是单服务的,需要多个程序之间配合,需要通过网络将数据传送到其他节点上去,这就需要大量的序列化,反序列化的过程.
但是,问题是,python程序之间还可以都是用pickle解决序列化,反序列化,如果是跨平台,跨语言,跨协议pickle就不太适合了,就需要公共的协议.
不同的协议,效率不同,学习曲线不同,适合不同场景,要根据不同的情况分析选型
json
json的数据类型


messagepack
messagepack是一个基于二进制高效的对象序列化库,可用于跨语言通信.
他可以像json那样,在许多语言之间交换结构对象.
但是他比json更快速也跟轻巧.
支持python.ruby,java等众多语言,
兼容json 和pickle

安装pip install msgpack

常用方法序列化对象,提供dumps来兼容pickle和json
unpackb反序列化对象.提供了loads来兼容.
pack序列化对象保存到文件对象,提供了dump来兼容.
unpack反序列化对象保存到文件对象,提供了load来兼容.
messagepack简单易用,高效压缩,支持语言丰富.
所以,用它序列化也是一种很好的选择,python很多大名鼎鼎的库都是用了msgpack.











