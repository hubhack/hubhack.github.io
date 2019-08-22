---
title: 关系模型和sql
date: 2019-06-21 18:46:41
categories:
- 数据库
- mysql
tags:
- 数据库
---
@[toc](DML —— CRUD 增删改查)
**所有操作一定要加==条件==**

# Insert语句
- 向表中插入一行数据，自增字段、缺省值字段、可为空字段可以不写
`INSERT INTO table_name(col_name,...) VALUES (value1,...);`
- 将select查询的结果插入到表中
`INSERT INTO table_name SELECT ... ;`
- 如果主键冲突、唯一键冲突就执行update后的设置。这条语句的意思，就是主键不在新增记录，主键在就更新部分字
段
`INSERT INTO table_name (col_name1,...) VALUES (value1,...) ON DUPLICATE KEY UPDATE
col_name1=value1,...;`
- 如果主键冲突、唯一键冲突就忽略错误，返回一个警告
`INSERT IGNORE INTO table_name (col_name,...) VALUES (value1,...);`
## 例：
```python
INSERT INTO reg(loginname, `name`, `password`) 
VALUES('tom', 'tom', 'tom');

INSERT INTO reg(if, loginname, `name`, `password`) 
VALUES (5, 'tom', 'tom', 'tom');

INSERT INTO reg(id, loginname, `name`, `password`) 
VALUED (1, 'tom', 'tom', 'tom') 
ON DUPLICATE KEY UPDATE name = 'jerry'
```
# Update语句
- IFNORE 意义同Insert语句
```UPDATA [IGNORE] tal_name SET col_name1=expr1 [, col_name2=expr2 ...] [WHERE where_definition]```
```python
-- 例
UPDATE reg SET name='tom· WHERE id=5;
```
- 注意这一句非常**危险**，会更新所有数据
```python
UPDATE reg SET name ='ben';
```
- 更新一定要加条件
```python
UPDATE reg SET name = 'ben', password = 'benpwd' WHRER id = 1;
```
# Delete语句
- 删除符合条件的记录
`DELETE FROM tal_name [WHERE where_defintion]`
- 删除一定要有条件
```python
DELETE FROM reg WHERE id =1;
```
# Select语句
```python
SELECT
		[DISTINCT]
		select_expr, ...
		[FROM table_references
		[WHERE where_definition]
		[FROUP BY {col_name | expr | position}
			[ASC | DESC], ... [WITH ROLLUP]]
		[HAVING whrer_definition]
		[ORDER BY {col_name | expr | position}
			[ASC | DESC], ...]
		[LIMIT {[offset,} roe_count | row_count OFFSET offset}]
		[FOR UPDATE | LOCK IN SHARE MODE]]
```
FOR UPDATE会把行进行写锁定，这是**排它锁**
## 查询
- 查询的结果成为结果集recordset

- 最简单的查询
`SELECT 1;`
`SELECT * FROM employees;`
- 字符串合并
`SELECT emp_no, first_name + last_name FROM employees;`

**执行前**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623163909901.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
**执行后**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623163958662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 使用字符串相加函数 CONCAT

`SELECT emp_no, CONCAT(first_name,' ',last_name) FROM employees;`

**执行后**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623163836825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### AS定义别名，可选。
- 写AS是一个好习惯
`SELECT emp_no as en, CONCAT(first_name,' ',last_name) as name FROM employees;`

**执行后**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623163744440.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
## Limit子句
- 返回5条记录， [1,5]左闭右闭
`SELECT * FROM employees as emp LIMIT 5;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623165030966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 返回5条记录，偏移3条，(3,8]左开右闭
 `SELECT * FROM employees as emp LIMIT 3, 5;`
 等价于
 `SELECT * FROM employees as emp LIMIT 5 offset 3;` ，
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623165128942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
 
 
## Where子句
|运算符|  描述符|
|:--|:--|
| = | 等于 |
|  <>| 不等于 |
| >、 <、 >=、 <= | 大于、小于、大于等于、小于等于 |
|BETWEEN  | 在某个范围之内，between a and b等价于[a, b] |
| LIKE | 字符串模式匹配，%表示任意多个字符，_表示一个字符 |
| IN |指定针对某个列的多个可能值  |
|AND  | 与 |
|OR  | 或 |
- 能用键匹配用键
- LIKE 只能使用左前缀，尽量不使用，性能差

注意：如果很多表达式需要使用AND、OR计算逻辑表达式的值的时候，由于有结合律的问题，建议使用**小括号**来避免产生错误
- 查询条件
```python
SELECT * FROM employees WHERE emp_no < 10015 and last_name LIKE 'P%';
SELECT * FROM employees WHERE emp_no BETWEEN 10010 AND 10015 AND last_name LIKE 'P%';
SELECT * FROM employees WHERE emp_no in (10001, 10002, 10010);
```
### EXPLAIN 可判断查询条件性能如何
```python
EXPLAIN SELECT emp_no AS id, birth_date, concat(FIRST_name, ' ', last_name) as name
	FROM employees as emp WHERE last_name='Sluis';
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623170406947.png)
```python
EXPLAIN SELECT emp_no AS id, birth_date, concat(FIRST_name, ' ', last_name) as name
	FROM employees as emp WHERE emp_no BETWEEN 10010 and 10015 and last_name='Sluis';
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623170556443.png)
说明第二个查询条件优于第一个
## ORder by 子句
对查询结果进行排序，可以升序ASC、降序DESC。默认不填为升序
- 升序
`SELECT * FROM employees WHERE emp_no in (10001, 10002, 10010) ORDER BY emp_no;`![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062317110772.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 降序
`SELECT * FROM employees WHERE emp_no in (10001, 10002, 10010) ORDER BY emp_no DESC`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623171210298.png)
- OROER BY 先执行，在执行 LIMIT
```python
SELECT * FROM employees WHERE emp_no in (10001, 10002, 10010) 
 ORDER BY birth_date, emp_no DESC LIMIT 1, 2;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623171754561.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 会先按照第一条件进行排序，如果无法区分先后顺序，在使用第二条件进行排序
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623173236717.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
## DISTINCT
不返回重复记录
- 原表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623172232517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- `SELECT DISTINCT dept_no FROM dept_emp;`
执行结果如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623172830177.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- `SELECT DISTINCT emp_no FROM dept_emp;`
执行结果如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623172905146.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- `SELECT dept_no,emp_no FROM dept_emp;`
会将`dept_no`与`emp_no`看成二元祖来筛选
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623172946512.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
## 聚合函数
|函数  | 描述 |
|:--|:--|
| COUNT(expr) | 返回记录中记录的数目，如果指定列，则返回非NULL值的行数 |
| COUNT(DISTINCT expr,[expr...]) |  返回不重复的非NULL值的行数|
| AVG([DISTINCT] expr) | 返回平均值，返回不同值的平均值 |
| MIN(expr), MAX(expr) |  最小值，最大值|
| SUM([DISTINCT] expr)  | 求和，Distinct返回不同值求和 |

`SELECT COUNT(*), AVG(emp_no), sum(emp_no), min(emp_no), max(emp_no) FROM employees;`
- 原表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623174106574.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 执行后
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623174027167.png)
```python
SELECT emp_no, COUNT( emp_no ), sum( emp_no ), avg( emp_no ) AS sal_avg 
	FROM employees  WHERE emp_no > 10001 
	GROUP BY emp_no HAVING sal_avg > 10005
	ORDER BY sal_avg DESC LIMIT 1;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623174658903.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
执行顺序 ：HAVING > select  > GROUP BY > HAVING > ORDER BY
## 分别查询
使用`Group by`子句，如果有条件，使用Having子句过滤分组、聚合过的结果
- 原表
```python
emp_no  salary  from_date   to_date
10001	60117	1986-06-26	1987-06-26
10001	62102	1987-06-26	1988-06-25
10001	66074	1988-06-25	1989-06-25
10001	66596	1989-06-25	1990-06-25
10001	66961	1990-06-25	1991-06-25
10001	71046	1991-06-25	1992-06-24
10001	74333	1992-06-24	1993-06-24
10001	75286	1993-06-24	1994-06-24
10001	75994	1994-06-24	1995-06-24
10001	76884	1995-06-24	1996-06-23
10001	80013	1996-06-23	1997-06-23
10001	81025	1997-06-23	1998-06-23
10001	81097	1998-06-23	1999-06-23
10001	84917	1999-06-23	2000-06-22
10001	85112	2000-06-22	2001-06-22
10001	85097	2001-06-22	2002-06-22
10001	88958	2002-06-22	9999-01-01
10002	65828	1996-08-03	1997-08-03
10002	65909	1997-08-03	1998-08-03
10002	67534	1998-08-03	1999-08-03
10002	69366	1999-08-03	2000-08-02
10002	71963	2000-08-02	2001-08-02
10002	72527	2001-08-02	9999-01-01
10003	40006	1995-12-03	1996-12-02
10003	43616	1996-12-02	1997-12-02
10003	43466	1997-12-02	1998-12-02
10003	43636	1998-12-02	1999-12-02
10003	43478	1999-12-02	2000-12-01
10003	43699	2000-12-01	2001-12-01
10003	43311	2001-12-01	9999-01-01
10004	40054	1986-12-01	1987-12-01
10004	42283	1987-12-01	1988-11-30
10004	42542	1988-11-30	1989-11-30
10004	46065	1989-11-30	1990-11-30
10004	48271	1990-11-30	1991-11-30
10004	50594	1991-11-30	1992-11-29
10004	52119	1992-11-29	1993-11-29
10004	54693	1993-11-29	1994-11-29
10004	58326	1994-11-29	1995-11-29
10004	60770	1995-11-29	1996-11-28
```
### 聚合所有
`SELECT emp_no, SUM(salary), avg(salary), count(emp_no) from salaries;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623175204250.png)
### 聚合被选择的记录
`SELECT emp_no, SUM(salary), avg(salary), count(emp_no) from salaries WHERE emp_no < 10003;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623175425309.png)
### 分组
`SELECT emp_no FROM salaries GROUP BY emp_no;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062317552673.png)
`SELECT emp_no FROM salaries WHERE emp_no < 10003 GROUP BY emp_no;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623175612762.png)
### 按照不同emp_no分组，每组分别聚合
```python
SELECT emp_no, SUM(salary), AVG(salary), count(emp_no) 
	from salaries WHERE emp_no < 10003 GROUP BY emp_no;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623181037697.png)
### HAVING子句对分组结果过滤
```python
SELECT emp_no, SUM(salary), AVG(salary), count(emp_no) 
	from salaries GROUP BY emp_no HAVING AVG(salary) > 45000
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623181705131.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 使用别名
```python
SELECT emp_no, SUM(salary), AVG(salary) as sal_avg, count(emp_no) 
	from salaries GROUP BY emp_no HAVING sal_avg > 45000
```
### 最后对分组过滤后的结果排序
```
SELECT emp_no, SUM(salary), AVG(salary) AS sal_avg, COUNT(emp_no) 
	from salaries GROUP BY emp_no HAVING sal_avg > 60000 ORDER BY sal_avg; 
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623184110915.png)

- 分组是将数据按照指定的字段分组，最终每组只能出来一条记录。这就带来了问题，每一组谁做代表，其实谁做代表都不合适
- 如果只投影分组字段、聚合数据，不会有问题，如果投影非分组字段，显示的时候不能确定是组内谁的数据
- 分组
```python
SELECT emp_no, MAX(salary) FROM salaries; -- 10001 88958
SELECT emp_no, MIN(salary) FROM salaries; -- 10001 40006
```
上例很好的说明了使用了聚合函数，虽然没有显式使用Group By语句，但是其实就是把所有记录当做一组，每组只能出一条，那么一组也只能出一条，所以结果就一条

但是`emp_no`就是非分组字段，那么它就要开始覆盖，所以，显示为10001。当求最大值的时候，正好工资表中10001的工资最高，感觉是对的。但是，求最小工资的时候，明明最小工资是10003的40006，由于emp_no不是分组字段，导致最后被覆盖为10001
```pythopn
SELECT emp_no, MIN(salary) FROM salaries GROUP BY emp_no;
```
- 上句才是正确的语义，按照不同员工emp_no工号分组，每一个人一组，每一个人有多个工资记录，按时每组只能按照人头出一条记录
- 单标较为复杂的语句
```python
SELECT
	emp_no,
	AVG( salary ) AS avg_sal 
FROM
	salaries 
WHERE
	salary > 70000 
GROUP BY
	emp_no 
HAVING
	avg( salary ) > 50000 
ORDER BY
	avg_sal DESC 
	LIMIT 1;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623214352740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 子查询
- 查询语句可以嵌套，内部查询就是子查询
- 子查询必须在一组小括号中
- 子查询中不能使用Order by
```python
SELECT
	* 
FROM
	employees 
WHERE
	emp_no IN ( SELECT emp_no FROM employees WHERE emp_no > 10015 ) 
ORDER BY
	emp_no DESC;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623214313124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
```python
SELECT
	emp.emp_no,
	emp.first_name,
	gender 
FROM
	( SELECT * FROM employees WHERE emp_no > 10015 ) AS emp 
WHERE
	emp.emp_no < 10019 
ORDER BY
	emp_no DESC;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623214549928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 连接join
#### 交叉连接 cross join 
- 笛卡尔乘积，全部交叉
- 在MySQL中，CROSS JOIN从语法上说与INNER JOIN等同
- 没有 join 就不能用 on

Join会构建一张**临时表**
```python
-- 工资40行
SELECT * FROM salaries;

-- 20行
SELECT * FROM employees;

-- 800行
SELECT * FROM employees CROSS JOIN salaries;

-- 隐式连接，800行
SELECT * FROM employees, salaries;
```
注意：salaries和employees并没有直接的关系，做笛卡尔乘积只是为了看的清楚
#### 内连接 inner join
- 可省略为join
- 等值连接，只选某些field相等的元组（行），使用On限定关联的结果
- 自然连接，特殊的等值连接，会去掉重复的列。用的少
```python
-- 内连接，笛卡尔乘积 800 行
SELECT * FROM employees JOIN salaries;
SELECT * FROM employees INNER JOIN salaries;

-- on等值连接 40行
SELECT * FROM employees JOIN salaries ON employees.emp_no = salaries.emp_no;

-- 自然连接，去掉了重复列，且自行使用 employees.emp_no = salaries.emp_no的条件
SELECT * FROM employees NATURAL JOIN salaries;
```
#### 外连接 outer join
- 可以省略为join
分为左外连接，即左连接；右外连接，即右连接；全外连接
##### 左连接
（56条记录）
```python
SELECT * FROM employees LEFT JOIN salaries ON employees.emp_no = salaries.emp_no;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623220144384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)

##### 右连接 

（40 条记录）
```python
SELECT * FROM employees RIGHT JOIN salaries ON employees.emp_no = salaries.emp_no;
```

- 这个右连接等价于上面的左连接（56条记录）
```python
SELECT * FROM salaries RIGHT JOIN employees ON employees.emp_no = salaries.emp_no;
```
##### 左外连接、右外连接
```python
 SELECT * FROM employees RIGHT JOIN salaries ON employees.emp_no = salaries.emp_no;
```
 结果是先employees后salaries的字段显示，Right是看表的数据的方向，从salaries往employees看，以salaries为准，它的所有数据都显示
```python
SELECT
	employees.*
FROM
	salaries
	RIGHT JOIN employees ON employees.emp_no
salaries.emp_no 
WHERE
	salaries.emp_no IS NULL
```
##### 自连接
表，自己和自己连接
```python
select manager.* from emp manager,emp worker where 
manaer.empno=worker.mgr and worker.empno=1;

select manager.* from emp manager inner join emp 
worker on manaer.empno=worker.mgr where worker.empno=1;
```
## 存储过程、触发器
- 存储过程（Stored Procedure），数据库系统中，一段完成特定功能的SQL语句。编写成类似函数的方式，可以传参并调用。支持流程控制语句

- 触发器（Trigger），由事件触发的特殊的存储过程，例如insert数据时触发
- 这两种技术，虽然是数据库高级内容，性能不错，但基本很少用了
- 它们移植性差，使用时占用的服务器资源，排错、维护不方便
- 最大的原因，不太建议把逻辑放在数据库中

 
 





 
 







