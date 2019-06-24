---
title: python小技巧


categories: 
- python
tags:
- python
---

## 为多个变量赋值
有时，有多个变量需要赋值，这时你会怎么赋值呢？
常规方法：常规方法是给变量逐个赋值。
```python
a = 0  
b = 1  
c = 2  
```
优雅方法：
直接按顺序对应一一赋值.  
a, b, c = 0, 1, 2
## 序列解包
需要取出列表中的元素。
常规方法：一般我们知道可以通过下标获取具体元素。
```python
info = ['brucepk', 'man', 'python']
name = info[0]
sex = info[1]
tech = info[2]
print(name,sex,tech)
结果:
brucepk man python
```
优雅方法：给出对应变量接收所有元素。
```
info = ['brucepk', 'man', 'python']
name,sex,tech = info
print(name,sex,tech)
结果:
brucepk man python
```
## 优雅你的判断语句
我们用判断语句来定义一个绝对值函数。
常规方法：
```python
x = -6
if x < 0:
    y = -x
else:
    y = x
print(y)
结果:
6
优雅方法：
x = -6
y = -x if x<0 else x
print(y)
结果
6
```
## 区间判断
使用 and 连续两次判断的语句，条件都符合时才执行语句。
常规方法：
```python
score = 82
if score >=80 and score < 90:
    level = 'B'
print(level)
结果
B
```
优雅方法：使用链式判断。
```
score = 82
if  80 <= score < 90:
    level = 'B'
print(level)
结果
B
```
## 多个值符合条件判断
多个值任意一个值符合条件即为 True 的情况。
常规方法：
```
num = 1
if num == 1 or num == 3 or num == 5:
    type = '奇数'
print(type)
结果
奇数
```
优雅方法：使用关键字 in，让你的语句更优雅。
```
num = 1
if num in(1,3,5):
    type = '奇数'
print(type)
结果
奇数
```
## 判断是否为空
判断元素是空还是非空。
常规方法：一般我们想到的是 len() 方法来判断元素长度，大于 0 则为非空。
```
A,B,C =[1,3,5],{},''
if len(A) > 0:
    print('A 为非空')
if len(B) > 0:
    print('B 为非空')
if len(C) > 0:
    print('C 为非空')
结果
A 为非空
```

优雅方法：if 后面的执行条件是可以简写的，只要条件 是非零数值、非空字符串、非空 list 等，就判断为 True，否则为 False。

```
A,B,C =[1,3,5],{},''  
if A:
    print('A 为非空')  
if B:
    print('B 为非空')  
if C:
    print('C 为非空')  
结果
A 为非空
```
## 多条件内容判断至少一个成立
常规方法：用 or 连接多个条件。
```
math,English,computer =90,80,88
if math<60 or English<60 or computer<60:
    print('not pass')
结果
not pass
```
优雅方法：使用 any 语句。
```
math,English,computer =90,59,88
if any([math<60,English<60,computer<60]):
    print('not pass')
结果
not pass
```
## 多条件内容判断全部成立
常规方法：使用 and 连接条件做判断。
```
math,English,computer =90,80,88
if math>60 and English>60 and computer>60:
    print('pass')
结果
pass
```
优雅方法：使用 all 方法。
```
math,English,computer =90,80,88
if all([math>60,English>60,computer>60]):
    print('pass')
结果
pass
```
## 遍历序列的元素和元素下标
常规方法：使用 for 循环进行遍历元素和下标。
```
L =['math', 'English', 'computer', 'Physics']
for i in range(len(L)):
    print(i, ':', L[i])
结果
0 : math
1 : English
2 : computer
3 : Physics
```
优雅方法：使用 enumerate 函数。
```
L =['math', 'English', 'computer', 'Physics']
for k,v in enumerate(L):
    print(k, ':', v)
结果
0 : math
1 : English
2 : computer
3 : Physics
```
## 循环语句优化
之前的文章 零基础学 Python 之列表生成式 中讲过列表生成时的用法，举例：生成 [1x1,2x2,3x3，4x4，5x5]。
常规方法：使用简单的 for 循环可以达到目的。
```
L = []
for i in range(1, 6):
    L.append(i*i)
print(L) 
结果：
[1, 4, 9, 16, 25]
```
优雅方法：使用列表生成式，一行代码搞定。
```
print([x*x for x in range(1, 6)]) 
结果：
[1, 4, 9, 16, 25]
```
## 将list中的所有元素转为单个字符串

```
a = ["python", "is", "awesome"]
print(" ",join(a))
```
## 字符串倒转

方法一：最简单的切片法，a[::-1]就相当于a[尾:头:-1]。
方法二：用Python自带reversed()函数，它可被用于list倒转。
方法三：第三种是通过倒转数据类型和切片倒转整数.

## 链式调用
在python 中实现链式调用只需在函数返回对象自己就行
```
def product(a, b):
    return a * b
def add(a, b):
    return a + b
b = True
print((product if b else add)(5, 7))
```
## 复制list

在Python中，变量指向的是某个对象的标签。也就是说，按照这种的写法，b和a指向的是内存中的同一个列表，对b操作，就相当于对a操作。所以正确的写法有以下几种：
方法一：b=a[:]。
方法二：b=list(a)。
方法三：使用Python 3的copy()函数，直接复制list，类似a[:]。
方法四：使用copy.deepcopy()。

## 按value排序字典

Python的内置字典数据类型是无序的，而key可以被用来获取对应的value。有时我们需要根据value对字典中的item进行排序输出。方法如下所示：
方法一：用sorted函数排序，其中key参数是lamda表达式。
方法二：用operator.itemgetter而不是lamda表达式进行排序。
方法三：如果只需得到排序后的key，可用.get。

## for ... else语法

## 合并字典

方法一：Python 3.5可以存在重复键值，print({**d1 ,**d2})。
方法二：在内存中创建两个列表，再创建第三个列表，拷贝完成后，创建新的dict，删除掉前三个列表。
方法三：d1.update()。

## 从list中删除重复项

方法一：把list转成set，去除重复项，再转回list。
方法二：调用collections里的OrderedDict，和set差不多。

