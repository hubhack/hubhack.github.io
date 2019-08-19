---
title: 数据分析

categories:
- 数据分析
tags:
- 数据分析

---


Pandas:最流行的Python数据分析库

基于Numpy, 专用于数据预处理和数据分析的Python第三方库, 最适合处理大型结构化表格数据.

Pandas两大数据类型

- Series: 一维
- DataFrame: 二维

Series数据类型

```
 a = pd.Series([3, 4, 5, 6, 7])
 a
```

DataFrame数据类型

```
b = pd.DataFrame([3, 4, 5], [6, ,7, 8], [9, 10, 11])
b
```

抽象和维度

维度: 观察事物的角度

日常保存数据的数据格式:

- 0维: 字符串, 单值变量
- 1维: 列表, 字典(1成括号)
- 2维: Excel表格, Mysql数据库
- 3维或以上: JSON, MongoDB, HTML

Pandas各个数据类型的关系：

> 0维单值变量 -> 1维Series -> 2维DataFrame -> 3维层次化DataFrame



### Series

列表创建Series

>  a = pd.Series([2, 3, 5])

字典创建Series

```
# 索引就是字典字典的键
d = pd.Series({'name': '张三', 'age': 18, 'gander':True})
d
```

其他方式

```
# 标量创建
pd.Series(5)
pd.Series(5, index=[1,2, 3, 4, 5])
```

```python
# Numpy的序列函数创建

np.arange(5)
np.arange(2, 5)
np.arange(9, 5, -1)
```

查询

```
class1 = pd.Series([95, 25, 59, 61], index=['ming', 'hua', 'hong','huang', 'bai'])
```

查询数据形状

1维数据的形状就是它的值个数

```
class1.shape, class1.shape[0]
```

查询值(values) 和索引(index)

一个Series数据是由2个ndarray数组组成的

```
# 查询值
class1.values
```

查询值

根据索引查询值

- 索引查询
- 切片插叙

根据条件反查索引

- 布尔查询

索引查询

索引和切片都是根据索引查询值

class1

查询单值

```
# Series有两套索引：默认索引，自定义索引
class1['hong']  # 自定义索引
class1[2]  # 默认索引
```

查询多值

```
class1[['hua', 'bai']]
class1[[1, 4]]
```

切片查询

```
# 默认索引：包含起始值，不包含结束值
class1[:3]  
class1[2:]
class1[1:4]
```

布尔查询

根据值反查索引

根据条件反查索引

```python
# 布尔查询
class1[[False, True, True, False, False]]
```

### 向量化运算

矢量运算, 并行运算

```python
a = pd.Series(x)
a
a + 5 # 向量化运算, 不需要遍历, 速度快效率高
```

```python
# Pandas向量化方式
a.sum()  # Pandas方法
np.sum(class1)  # Numpy方法
```

### 类Numpy数组操作, 和类Python字典的操作

- Pandas数据可以执行全部Numpy数据操作(因为Pandas底层基于Numpy, 所以通用)
- 也可以执行部分Python原生列表或字典操作(仅限于Pandas实现的操作)

类Numpy数组操作

```
np.mean(class1) # Numpy方法
```

类Python字典操作

- in关键字: 判断某索引是否存在
- get方法:判断某索引是否存在, 存在则直接输出值, 不存在则输出定义值

### DataFrame对象 - 创建

DataFrame对象是Pandas最常用的数据类型

DataFrame对象是由多个Series增加一个索引后组成一种表格类型数据结构

DataFrame对象既有行索引, 又有列索引

- 行索引,表明不同行, 横向索引, 叫index, 0轴, axis=0
- 列索引, 表名不同列, 纵向索引, 叫colums, 1轴, axis=1



---

列表创建

- ndarry数组创建

- 字典内嵌套列表：要求内部列表等长
- 字典内嵌套字典：内部字典不需要等长
  - 字典内嵌套Series：等同嵌套字典



列表创建

```
# 默认索引
pd.DataFrame([[1,2,3],[4,5,6],[7,8,9]])
```

使用Numpy数组创建

Numpy数组类似一个高级版的Python列表

```
np.arange(10)

np.arange(10).reshape(2, 5)
```

字典创建

字典内嵌套列表

列表值需要等长, 否则报错

```python
pd.DataFrame(
    {
        '姓名': ['张三', '李四', '王五'],
        '年龄': [18, 28, 38],
        '性别': [True, True, False],
        '分数': [85.5, 59, 78],
    }
)
```

### 字典嵌套字典

字典不要求等长

```python
pd.DataFrame(
    {
        'name': {1: '张三', 2: '李四', 3: '王五'},
        'age': {1: 18, 2: 28, 3: 38},
        'gender': {1: True, 2: True, 3: False},
        'grade': {1: 85.5, 3: 78},  # 不等长也不报错
    },
)
```

DataFrame整体查询

```
a.shape  # 表格形状，行数 列数
a.dtypes  # 列数据类型

a.index  # 行索引
a.columns  # 列索引
a.values  # 对象值，二维ndarray数组
```

整体数据情况

- a.info()整体信息, 查看:数据是否异常
  - 有没有缺失值
  - 列数据类型是否正确
- a.describe()整体统计指标
- a.head() 前5行
- a.tail() 后5行

内容查询

类列表/字典/ndarray数组的查询方式

功能简陋, 一般仅用于查询单列

**Pandas专用查询方式**：经过优化，推荐

三种查询方式：

- 索引
- 切片
- 过滤

**索引和切片查询，两种查询方式：**

- a.loc[行,列]，标签索引，自定义索引
- a.iloc[行,列]，位置索引，默认索引

参数书写顺序都是都是先行后列

## 索引查询

用于不连续(行列有间隔)行列区块查询

查询单行

```python
# 自定义索引查询
a.loc[3]  # 简写
a.loc[3, :]  # 完整写法

# 默认索引
a.iloc[2]
a.iloc[2, :]
```



查询多行

```python
a.loc[[2, 4]]  # 选中所有列，省略了列条件
a.loc[[2, 4], :]  # 完整写法

a.iloc[[1, 3]]
```

## 索引查询和切片查询的区别

- 索引查询更适合查询不连续的行列数据
- 切片查询适合查询连续行和列数据

索引查询可以实现切片查询的所有功能，只是有个书写效率问题

- 用索引查询查连续数据，需要将每个索引都写上，效率低
- 切片查询连续数据，只要写起始和结束索引即可。
  - 切片不能查询不连续数据

> 查询时：优先使用切片查询，无法实现功能时再使用索引查询

### 专用查询：过滤查询

索引查询和切片查询, 都是通过索引查询值

过滤查询(布尔查询) : 通过值查询索引

- 过滤查询不通过索引, 而是通过值查询
- 用于结果索引不确定的查询
- 通过运算所得布尔值对查询结果进行过滤

类list/字典查询方式

专用查询方式的布尔查询

```python
# 布尔查询
a.loc[[False, True, False, True, False], [True, True, False, False, False, True, False]]
```

```python
# 查询不及格同学的姓名、年龄和成绩
a.loc[a['grade'] < 60, ['name', 'age', 'grade']]
```

### where过滤（了解）

另一种简洁的布尔查询写法

### 总结

- 原生的布尔查询，需要每列单独判断条件，然后用逻辑运算符组合条件，得出最终结果
- where过滤过滤：先将所有需要判断条件的列抽出来，整体判断，得出最终结果
  - 优点：写法简洁
  - 缺点：where过滤所有列的判断条件，只能有一个，使用受限



- 视图模式
  - 将一个对象整体赋值给另一个变量
  - 修改一个变量，另一个变量值也会变
  - 多个变量数据指向同一内存数据
- 副本模式
  - 将一个对象查询的一部分值赋值给另一个变量
  - 修改一个变量，另一个变量值不会变

- 当将一个对象整体赋值给另一个变量时，**视图模式**，两个变量对应的内存地址相同，修改一个变量，另一个变量也会改变。
- 当使用copy()将一个对象赋值给另一个变量时
  - 或者使用查询赋值，查询数据的一部分并赋值给其他变量
  - 当赋值为原数据查询的一部分时，是**副本模式**，修改一个变量不会影响另一个变量

### 变量查询一部分数据

理论上是副本模式，但实际上，直接修改赋值变量时会报警告（能修改成功）

```python
a[['name', 'sex', 'address']]
```

数据操作

- 创建：C,Create
- 查询：R,Read
- 增加：I,Insert
- 修改：U,Update
- 删除：D,Delete

pandas数据操作: 其他操作

pandas对象的命名: name

pandas对象的遍历

Pandas对象的命名:name

Series和Dataframe对象本身, 索引都可以命名

数据的输入和输出是Pandas的基础操作

Pandas可以存取多种介质类型数据：常见的有：

- 文本类数据
  - csv
  - JSON
- 二进制磁盘数据
  - Excel
  - pkl
  - HDF5
- 数据库
  - SQL（略）
- Web API数据
  - HTML
- 其他
  - 内存

```
文本类数据文件读入Pandas时会自动推断每列数据类型（类型推断）和数据编码并转化。
二进制类数据文件没有编码问题，且部分文件会在格式中存储数据类型不需转化

对Pandas不能直接支持或不方便使用的数据格式，
可以使用支持软件将其转为csv或xlsx格式后使用Pandas读写，如SPSS文件
```