---
title: python 三大器


categories: 
- python
tags:
- python
---

# 装饰器
装饰器本质是一个python函数,它可以让其他函数在不需要做任何代码变动的前提下增加额外功能,装饰器的返回值也是一个函数对象.它经常用于有切面需求的场景,比如:插入日志,性能测试,事务处理,缓存,权限校验等场景.装饰器是解决这类问题的绝佳设计,有了装饰器,我们就可以抽离出大量与函数功能本身无关的雷同代码并继续重用.

```python
def 炼丹炉(func):
	def 变身(*args):
        火眼金睛
        returrn 孙悟空
    return 变身
@炼丹炉# 新孙悟空 = 炼丹炉(孙悟空)
def 孙悟空:
    return
```

**装饰器在包装函数的时候运行外层，在运行被包装函数的时候才运行内层wrapper**

单层的只需要function 如:注册器

双层的是返回一个全新的函数 如:打印log



# 迭代器
迭代器协议是指:对象需要提供next方法,他要么返回迭代的下一项,要么就引起一个stopliteration异常.以终止迭代
可迭代对象就是,实现了迭代器协议的对象.
协议是一种约定,可迭代对象实现迭代器协议,python的内置工具(for循环,sum, min,max)
使用迭代器协议访问对象.
举个例子:
for n in [1, 2, 3, 4]:
    print(n)

但是对python稍微熟悉一点的朋友应该知道,python的for 循环不但可以用来遍历list,还可以用来遍历文件对象
with open ('/etc/passwd') as f:
    for line in f:
        print(line)

def gensquares(n):
    for i in range(n):
        yield i ** 2
for item in  genquares(s):
    print(item)

# 生成器
语法上和函数类似:生成器函数和常规函数几乎是一样的,他们都是使用def语句进行定义,差别在于,生成器使用yield语句返回一个值,而常规函数使用return语句返回一个值.
自动实现迭代器协议:



