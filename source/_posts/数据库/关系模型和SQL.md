---
title: sql
date: 2019-06-21 18:46:41
categories:
- 数据库
- mysql
tags:
- 数据库
---
@[toc]
# 关系模型和SQL
为了介绍关系模型，以MySQL数据库为例
## 安装
MariaDB 安装
- `# yum list | grep mariadb`
```python
mariadb-libs.x86_64 1:5.5.60-1.el7_5 @anaconda
mariadb.x86_64 1:5.5.60-1.el7_5 base 
mariadb-bench.x86_64 1:5.5.60-1.el7_5 base 
mariadb-devel.i686 1:5.5.60-1.el7_5 base 
mariadb-devel.x86_64 1:5.5.60-1.el7_5 base 
mariadb-embedded.i686 1:5.5.60-1.el7_5 base 
mariadb-embedded.x86_64 1:5.5.60-1.el7_5 base 
mariadb-embedded-devel.i686 1:5.5.60-1.el7_5 base 
mariadb-embedded-devel.x86_64 1:5.5.60-1.el7_5 base 
mariadb-libs.i686 1:5.5.60-1.el7_5 base 
mariadb-server.x86_64 1:5.5.60-1.el7_5 base 
mariadb-test.x86_64 1:5.5.60-1.el7_5 base 
```
- 安装mariadb 服务，会自动安装mairadb
`# yum install mariadb-server`

`# systemctl start mariadb.service`
`# ss -tanl`
```python
State 		Recv-Q 	Send-Q Local Address:Port	 Peer Address:Port
LISTEN		0		50 				*:3306 				*:*
```
- 开机启动
```# systemctl enable mariadb.service```

- 为了安全设置Mysql服务
`# mysql_secure_installation`
- 数据库密码登录
`# mysql -u root -p`
```python
mysql> show databases;
+--------------------+
| Database |
+--------------------+
| information_schema |
| mysql |
| performance_schema |
+--------------------+
3 rows in set (0.00 sec)
```
- 创建并授权用户
```python
mysql> grant all on *.* to 'tom'@'%' identified by 'tom';
mysql> flush privileges;
```
- 导入测试脚本 testsql文件
`# mysql -u root -p < test.sql`

如果使用客户端连接数据库提示这个
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625165510188.png)
证明防火墙未关闭，CentOS7可以使用`systemctl stop firewalld.service`来关闭，或者参考下面连接
https://www.cnblogs.com/moxiaoan/p/5683743.html
## SQL语句
SQL是结构化查询语言Structured Query Language。1987年被ISO组织标准化
所有主流的关系型数据库都支持SQL，NoSQL也有很大一部分支持SQL
### SQL语句分为
- DDL数据定义语言，负责数据库定义、数据库对象定义，由CREATE、ALTER与DROP三种语句组成
- DML数据操作语言，负责对数据库对象的操作，CRUD增删改查
- DCL数据控制语言，负责数据库权限访问控制，由 GRANT 和 REVOKE 两个指令组成
- TCL事务控制语言，负责处理ACID事务，支持commit、rollback指令
### 语言规范
- SQL语句大小写不敏感
一般建议，SQL的关键字、函数等大写
- SQL语句末尾应该使用分号结束
- 注释
多行注释`/*注释内容*/`
单行注释 `-- 注释内容`
MySQL 注释可以使用`#`

- 使用空格或缩进来提高可读性
- 命名规范
必须以字母开头
可以使用`数字`、`#`、`$`和`_`
不可使用关键字
## DCL
- GRANT授权、REVOKE撤销
```python
GRANT ALL ON employees.* TO 'tom'@'%' IDENTIFIED by 'tom';
REVOKE ALL ON *.* FROM tom;
```
- `* `为通配符，指代任意库或者任意表。 `*.*` 所有库的所有表； `employees.*` 表示employees库下所有的表
- `%` 为通配符，它是SQL语句的通配符，匹配任意长度字符串
## DDL
### **删除用户**（慎用）
`DROP USER tom;`
### 创建数据库
- 库是数据的集合，所有数据按照数据模型组织在数据库中
```python
CREATE DATABASE IF NOT EXISTS test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE DATABASE IF NOT EXISTS test CHARACTER SET utf8;
```
- CHARACTER SET指定字符集
- utf8mb4是utf8的扩展，支持4字节utf8mb4，需要MySQL5.5.3+
- COLLATE指定字符集的校对规则，用来做字符串的比较的。例如a、A谁大？
### 删除数据库
`DROP DATABASE IF EXISTS gogs;`
### 创建表
- 表分为行和列，MySQL是行存数据库。数据是一行行存的，列必须固定多少列
- 行Row，也称为记录Record，元组
- 列Column，也称为字段Field、属性
- 字段的取值范围叫做 域Domain。例如gender字段的取值就是M或者F两个值
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190621132830271.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
```python
CREATE TABLE `employees` (
  `emp_no` int(11) NOT NULL,
  `birth_date` date NOT NULL,
  `first_name` varchar(14) NOT NULL,
  `last_name` varchar(16) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `hire_date` date NOT NULL,
  PRIMARY KEY (`emp_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
反引号标注的名称，会被认为是非关键字，使用反引号避免冲突
### DESC
查看列信息
`{DESCRIBE | DESC} tbl_name [col_name | wild]`
```python
DESC employees;
DESC employees '%name';
```
### 练习
设计一张表，记录登录账户的注册信息，应该存储用户的姓名、登录名、密码
```python
DROP DATABASE IF EXISTS test;
CREATE DATABASE IF NOT EXISTS test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
```python
CREATE TABLE `reg` (
  `id` int(11) NOT NULL,
  `loginname` varchar(50) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```
## 关系
- 在关系数据库中，关系就是二维表，由行和列组成
行Row，也称为记录Record，元组
列Column，也称为字段Field、属性

字段的取值范围叫做 域Domain。例如gender字段的取值就是M或者F两个值

维数：关系的维数指关系中属性的个数
基数：元组的个数

注意在关系中，属性的顺序并不重要。理论上，元组顺序也不重要，但是由于元组顺序与存储相关，会影响查询效率
### 候选键
- 关系中，能唯一标识一条元组的属性或属性集合，称为候选键
### PRIMARY KEY主键
- 表中一列或者多列组成唯一的key，也就是通过这一个或者多个列能唯一的标识一条记录。即被选择的候选键
- 主键的列不能包含空值null。主键往往设置为整型、长整型，可以为自增AUTO_INCREMENT字段
- 表中可以没有主键，但是，一般表设计中，往往都会有主键，以避免记录重复
### Foreign KEY外键
严格来说，当一个关系中的某个属性或属性集合与另一个关系（也可以是自身）的候选键匹配时，就称作这个属性或属性集合是外键
### 索引Index
可以看做是一本字典的目录，为了快速检索用的。空间换时间，显著提高查询效率
可以对一列或者多列字段设定索引

**主键索引**，主键会自动建立主键索引，主键本身就是为了快速定位唯一记录的
**唯一索引**，表中的索引列组成的索引必须唯一，但可以为空，非空值必须唯一
**普通索引**，没有唯一性的要求，就是建了一个字典的目录而已

- 在MySQL中，InnoDB和MyISAM的索引数据结构可以使用Hash或BTree，默认是BTree

- Hash时间复杂度是O(1)，但是只能进行精确匹配，也就是Hash值的匹配，比如范围匹配就没办法了，hash值无序所以无法知道原有记录的顺序。Hash问题较多

- BTree索引，以B+树为存储结构

- 虽然，索引可以提高查询所读，但是却影响增删改的效率，因为需要索引更新或重构。频繁出现在where子句中的列可以考虑使用索引。要避免把性别这种字段设索引
## 约束Constraint
为了保证数据的完整正确，数据模型还必须支持完整性约束

- “必须有值”约束
- 某些列的值必须有值，不许为空NULL
### 域约束Domain Constraint
- 限定了表中字段的取值范围
### 实体完整性Entity Integrity
- PRIMARY KEY约束定义了主键，就定义了主键约束。主键不重复且唯一，不能为空
### 引用完整性Referential Integrity ***
- 外键定义中，可以不是引用另一张表的主键，但是，往往实际只会关注引用主键
- 外键：在表B中的列，引用了表A中的主键，表B中的列就是外键
A表称为主表，B表称为从表
#### 插入规则
- 不需要指定
- 如果在表B插入一条记录，B的外键列插入了一个值，这个值必须是表A中存在的主键值
#### 更新规则
- 定义外键约束时指定该规则
#### 删除规则
- 定义外键约束时指定该规则
#### 外键约束的操作
|  设定值| 说明 |
|:--|:--|
| CASCADE | 级联，从父表删除或更新会自动删除或更新子表中匹配的行 |
| SET  NULL | 从父表删除或更新行，会设置子表中的外键列为NULL，但必须保证子表列没有指定NOT NULL，也就是说子表的字段可以为NULL才行|
| RESTRICT | 如果从父表删除主键，如果子表引用了，则拒绝对父表的删除或更新操作 |
|NO ACTION  | 标准SQL的关键字，在MySQL中与RESTRICT相同。拒绝对父表的删除或更新操作 |
外键约束，是为了保证数据完整性、一致性，杜绝数冗余、数据错误
## 实体-联系E-R
- 数据库建立，需要收集用户需求，设计符合企业要求的数据模型。而构建这种模型需要方法，这种方法需要成为E-R实体-联系建模。也出现了一种建模语言——UML（Unified Modeling Language）统一建模语言

- 实体Entity：现实世界中具有相同属性的一组对象，可以是物理存在的事物或抽象的事物
- 联系Relationship：实体之间的关联集合
## 实体间联系类型
假设有实体部门，实体员工
| 类型 |  描述| 解决方案|
|:--|:--|:--|
| 一对多联系 `1:n` | 一个员工属于一个部门，一个部门有多个员工 |员工外键；部门主键 |
| 多对多联系 `m:n`| 一个员工属于多个部门，一个部门有多个员工  |建立第三表 |
| 一对一联系 `1:1`| 假设有实体管理者，一个管理者管理一个部门，一个部门只有一个管理者 |字段建在哪张表都行|
一对一关系用的较少，往往表示表A的一条记录唯一关联表B的一条记录，反之亦然
它往往是为了将一张表多列分割并产生成了多张表，合起来是完整的信息，或为了方便查询，或为了数据安全隔离一部分字段的数据等等
## 视图
视图，也称虚表，看起来像表。它是由查询语句生成的。可以通过视图进行CRUD操作
视图的作用
- 简化操作，将复杂查询SQL语句定义为视图，可以简化查询
- 数据安全，视图可以只显示真实表的部分列，或计算后的结果，从而隐藏真实表的数据
## 数据类型
- MySQL中的数据类型

|类型| 含义 |
|:--|:--|
| tinyint | 1字节，带符号的范围是-128到127。无符号的范围是0到255。bool或boolean，就是tinyint，0表示假，非0表示真 |
| smallint |  2字节，带符号的范围是-32768到32767。无符号的范围是0到65535|
| int | 整型，4字节，同Integer，带符号的范围是-2147483648到2147483647。无符号的范围是0到4294967295 |
| bigint |  长整型，8字节，带符号的范围是-9223372036854775808到9223372036854775807。无符号的范围是0到18446744073709551615|
|float  |单精度浮点数精确到大约7位小数位  |
| double | 双精度浮点数精确到大约15位小数位 |
| DATE | 日期。支持的范围为'1000-01-01'到'9999-12-31' |
| DATETIME |  支持的范围是'1000-01-01 00:00:00'到'9999-12-31 23:59:59'|
| TIMESTAMP |时间戳。范围是'1970-01-01 00:00:00'到2037年  |
| char(M) | 固定长度，右边填充空格以达到长度要求。M为长度，范围为0~255。M指的是字符个数 |
| **varchar(M)** | 变长字符串。M 表示最大列长度。M的范围是0到65,535。但不能突破行最大字节数65535 |
| text | 大文本。最大长度为65535(2^16-1)个字符 |
| BLOB | 大字节。最大长度为65535(2^16–1)字节的BLOB列 |
- LENGTH函数返回字节数。而char和varchar定义的M是字符数限制
- char可以将字符串定义为固定长度，空间换时间，效率略高；varchar为变长，省了空间
## 关系操作
关系：在关系数据库中，关系就是二维表
关系操作就是对表的操作
- 选择（selection）：又称为限制，是从关系中选择出满足给定条件的元组
- 投影（projection）：在关系上投影就是从选择出若干属性列组成新的关系
- 连接（join）：将不同的两个关系连接成一个关系

 
 
