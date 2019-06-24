---
title: linux知识框架

categories:
- linux
tags:
- linux基础

---

# 介绍



## 操作系统

os(operating system),通用目的的软件程序
>硬件驱动
>进程管理
>内存管理
>网络管理
>安全管理
>文件管理

## 安装linux

>linux发行版企业多用红帽(redhat)的centos 个人电脑推荐kde桌面的[manjaro](https://www.manjaro.cn/153)或[mint](https://www.linuxmint.com/download.php)
>分区和启动:
>硬盘MBR分区(主引导记录)他有自己的启动器最大支持2tb
>uefi的GPT分区:逐渐代替MBR标准
>主分区 一块硬盘最多4个,不能划分更小,最小单位
>扩展分区:一块硬盘最多一个,不能直接创建文件系统
>安装过程大同小异 [详细步骤](https://blog.csdn.net/python_lqx/article/details/88670425)
>需要注意的是如何分区:这里的分区在虚拟机上只是虚拟的,分100g不影响物理硬盘实际占用.实际情况要自己斟酌.
>/dev/sda 100g
>/dev/sda1 /boot mountpoint  1g
>/dev/sda2 /                50g
>/dev/sda3 /data            20g
>/dev/sda5 /swap             2g

## 开发接口标准

>ABI:application binary interface ABI描述了程序与os之间的底层接口
>API:application programming interface
>开源协议: GPLv2,GPLv3 Apache BSD Mozilla Mit

## 用户和内核空间

>username 用户程序的运行空间 为了安全,他们是隔离的即使用户的程序崩溃,内核也不受影响  
>内核空间:kernel space

## linux哲学思想

在linux上一切皆文件,其实就是硬盘也是以文件格式展示出来的


## 文件操作

文件和目录被组织成单根倒置树结构
文件系统从根目录下开始,用"/"表示
proc虚拟的,在硬盘上不存在
文件 区别大小写( 这是文件系统决定,微软的ntfs不存在,而linux的ext4大小写敏感)
以.开头的文件为隐藏文件
元数据:metadata(包含属性,权限,大小)每个文件都有自己的元数据,有指针指向到数据的真实内容.
数据:data(内容在硬盘上)
文件系统分成结构:LSB
文件名最长255个字节,文件系统不一样大小不一样
包括路径在内文件名称最长4095个字节
蓝色---目录 绿色---可执行文件  红色---压缩文件
浅蓝色---链接文件 灰色---其他文件 粉色是socket(套接字文件)双向传递
管道文件 p开头(pipe)单工传输

## 文件系统结构元素

/boot：引导文件存放目录，内核文件(vmlinuz)、引导加载器(bootloader, grub)都存放于此目录
/bin：供所有用户使用的基本命令；不能关联至独立分区，OS启动即会用到的 程序
/sbin：管理类的基本命令；不能关联至独立分区，OS启动即会用到的程序
/lib：启动时程序依赖的基本共享库文件以及内核模块文件(/lib/modules)
/lib64：专用于x86_64系统上的辅助共享库文件存放位置
/etc：配置文件目录
/home/USERNAME：普通用户家目录
/root：管理员的家目录
/media：便携式移动设备挂载点
/mnt：临时文件系统挂载点
/dev：设备文件及特殊文件存储位置  b: block device，随机访问  c: character device，线性访问
/opt：第三方应用程序的安装位置
/srv：系统上运行的服务用到的数据
/tmp：临时文件存储位置
/proc: 用于输出内核与进程信息相关的虚拟文件系统
/sys：用于输出当前系统上硬件设备相关信息虚拟文件系统
/selinux: security enhanced Linux，selinux相关的安全策略等信息的存储位置文
/usr: universal shared, read-only data  bin: 保证系统拥有完整功能而提供的应用程序  
sbin:  lib：32位使用  lib64：只存在64位系统
include: C程序的头文件(header files)  
share：结构化独立的数据，例如doc, man等
local：第三方应用程序的安装位置 bin, sbin, lib, lib64, etc, share 文

/var: variable data files  cache: 应用程序缓存数据目录  
lib: 应用程序状态信息数据  
local：专用于为/usr/local下的应用程序存储可变数据  
lock: 锁文件  log: 日志目录及文件  
opt: 专用于为/opt下的应用程序存储可变数据
run: 运行中的进程相关数据,通常用于存储进程pid文件  
spool: 应用程序数据池
tmp: 保存系统两次重启之间产生的临时数据

## Linux下的文件类型

-：普通文件
d: 目录文件
b: 块设备(硬盘,以块为单位,有缓存,一块一块写,有缓存区)
c: 字符设备(设备主要以字符为单位,键盘为主)
l: 符号链接文件
p: 管道文件pipe
s: 套接字文件socket

### 显示当前工作目录

每个shell和系统进程都有一个当前的工作目录  
CWD:current work directory
显示当前shell CWD的绝对路径 pwd: printing working directory -P 显示真实物理路径 -L 显示链接路径（默认）

### 更改目录

cd  改变目录 使用绝对或相对路径： cd /home/wang/        cd home/wang 切换至父目录：  cd .. 切换至当前用户主目录： cd 切换至以前的工作目录： cd - 
选项：-P  
相关的环境变量：  PWD：当前目录路径   OLDPWD：上一次目录路径

### 列出目录内容

列出当前目录的内容或指定目录
用法：ls [options] [ files_or_dirs ]
示例: ls -a 包含隐藏文件 ls -l 显示额外的信息 ls -R  目录递归通过 ls -ld  目录和符号链接信息 ls -1  文件分行显示 ls –S  按从大到小排序 ls –t   按mtime排序 ls –u   配合-t选项，显示并按atime从新到旧排序 
ls –U  按目录存放顺序显示 ls –X  按文件后缀排序
>[root@centos7 sysconfig]# ll /etc/motd
>-rw-r--r--. 1 root root 15 Mar 21 03:19 /etc/motd
>[root@centos7 sysconfig]# ll ../motd
>-rw-r--r--. 1 root root 15 Mar 21 03:19 ../motd
-a 全部
-r 递归
ll 是别名 (ls -l)

### 查看文件状态

stat
文件：metadata, data
三个时间戳: access time：访问时间，atime，读取文件内容
modify time: 修改时间,
mtime，改变文件内容（数据） change time: 改变时间, ctime，元数据发生改变
data 时间不会一直更新
通配符* 任意字符
二进制查看hexdump -C

### 创建和查看文件

touch 命令是个外部命令
[]表示其中一个字母
[^  ]表示除去其中字符的任意字符
两个大于号比 touch安全

### 文件统配符

man 7 glob

### 复制和转移删除文件

cp [OPTION]... [-T] SOURCE DEST外部命令 现在的cp是别名 元数据会丢失
原始命令前加\
拷贝文件夹 -r(递归)
cp 有可能丢失数据不能用rmdir删除

data是个挂载点
cp [OPTION]... SOURCE... DIRECTORY cp [OPTION]... -t DIRECTORY SOURCE... cp SRC DEST SRC是文件：如果目标不存在：新建DEST，并将SRC中内容填充至DEST中      如果目标存在： 如果DEST是文件：将SRC中的内容覆盖至DEST中  基于安全，建议为cp命令使用-i选项 如果DEST是目录：在DEST下新建与原文件同名的文件，并将SRC中内容填 充至新文件中
cp SRC... DEST    SRC...：多个文件      
DEST必须存在，且为目录，其它情形均会出错；cp SRC DEST 
SRC是目录：此时使用选项：-r
如果DEST不存在：则创建指定目录，复制SRC目录中所有文件至DEST中；
如果DEST存在：
如果DEST是文件：报错 
如果DEST是目录：
inode（index node）表中包含文件系统所有文件列表 
一个节点 （索引节点）是在一个表项，包含有关文件的信息（ 元数据 ），包 括：  文件类型，权限，UID，GID  链接数（指向这个文件名路径名称个数）  该文件的大小和不同的时间戳  指向磁盘上文件的数据块指针  有关文件的其他数据 

inode 唯一标识在元数据里
删除其实删的元数据.删文件比建文件快多了

### 软和硬链接

硬链接
创建硬链接会增加额外的记录项以引用文件 
对应于同一文件系统上一个物理文件 
每个目录引用相同的inode号 
创建时链接数递增 
删除文件时： 
rm命令递减计数的链接 
文件要存在，至少有一个链接数 
当链接数为零时，该文件被删除 
不能跨越驱动器或分区
语法:  ln filename  [linkname ]
软连接
一个符号文件链接指向一个文件
ls -s显示链接的名称和应用的文件
一个符号链接的内容是他引用文件的名称
可以对目录进行
可以跨分区
指向的是另一个文件的路径;其大小为指向的路径字符串的长度;不增加或减少目标文件inode的引用计数
语法:ln -s 文件 链接名

## i/0 重定向至文件

程序:指令+数据
input 和output
打开的文件都有一个fd:file descrptor(文件描述符)
linux 给程序提供三种i/o设备
标准输入(STDIN)-0 默认接受来自键盘的输入
标准输出(STDOUT) -1默认输出到终端窗口
标准错误(STDERR) -2 默认输出到窗口
i/o重定向:改变默认位置
语法:命令  操作符号 文件名
操作符>把STDOUT重定向到文件
2> 把STDERR重定向到文件
$> 把所有输出重定向到文件
tr 转换和删除字符

## 管道

管道用来连接命令
命令1|命令2|命令3
将命令1的STDOUT发送给命令2的STDIN,命令2的STDOUT发送给命令3的STDIN
less 一页一页地查看输入
重定向到多个目标(tee)
把命令1的STDOUT保存在文件中,作为命令2的输入
-a追加
使用:
保存不同阶段的输入
复杂管道的故障排除
同时查看和记录输出

# 用户组权限

## 用户user

令牌token,identity
linux用户:username/UID
管理员:root,0
普通用户:1-65535
系统用户:1-499,1-999
对守护进程获取资源进行权限进行分配
登录用户:500+,1000
交互式登录
nologin 是软件启动没有用户登录

## 组group

linux:Groupname/GID
管理员:
系统 :1-499,1-999
普通组:500+,1000+
安全上下文:
进行中的程序:程序(process)
以进程发起者的身份运行:
root:/bin/cat
mage:/bin/cat
组的类别
用户的主要组:
用户必须属于一个且只有一个主组
组名同用户名,且包含一个用户,私有组
用户和组的配置文件
/etc/passwd:用户及其属性信息
/etc/group:组及其属性信息
/etc/shadow:用户密码及其相关属性
/etc/gshadow:组密码及其相关属性
passwd文件格式
login name:登录用名
passwd:密码
UID:用户身份编号
GID:登录默认所在组编号
GECOS:用户全名或注释
home diretory:用户主目录
shell:用户默认使用shell
shadow文件格式
useradd usermod userdel
组账号维护命令:groupadd
groupmod groupdel

## 用户创建:useradd

useradd [options]LOGIN
-u UID
-o 配合-u选项,不检查UID的唯一性
-g GID:指明用户所属基本组,可谓组名,也可以GID
-c "COMMENT":用户的注释信息
默认设置:/etc/default/useradd文件中
删除用户:userdel -r删除用户目录

## 查看用户相关的ID信息

id [OPTIONS]...[USER]
-u :显示UID
-g :显示GID
-G :显示用户所属的组的ID
-n :显示名称,需配合ugG使用

## 切换用户或以其他用户身份执行命令

su[options] [-] [user[args...]]
切换用户的方式
ssh root@ip
curl ww
service network restat

## 设置密码

passwd
常用选项：
 -d:删除指定用户密码
 -l:锁定指定用户
 -u:解锁指定用户
 -e:强制用户下次登录修改密码
 -f: 强制操作
 -n mindays: 指定最短使用期限
 -x maxdays：最大使用期限
 -w warndays：提前多少天开始警告
 -i inactivedays：非活动期限
 --stdin：从标准输入接收用户密码
 echo "PASSWORD" | passwd --stdin USERNAME

## 创建组

groupadd[option]...group_name
-g GID:指明GID号:
-r:创建系统组
修改和删除组:
组属性修改:groupmod
组删除:groupdel
组密码:gpasswd
newgrp命令:临时切换主组
chown设置文件的所有者
chgrp设置文件的属组信息
修改文件的属主和属组chown
修改文件的属组:chgrp

## 文件权限

文件的权限主要针对三类对象进行定义
owner: 属主, u
group: 属组, g
other: 其他, o
每个文件针对每类访问者都定义了三种权限
r: Readable
w: Writable
x: eXcutable

### 修改文件权限

chmod [OPTION]... OCTAL-MODE FILE...
 -R: 递归修改权限
chmod [OPTION]... MODE[,MODE]... FILE...
 MODE：
 修改一类用户的所有权限：
 u= g= o= ug= a= u=,g=
 修改一类用户某位或某些位权限
 u+ u- g+ g- o+ o- a+ a- + -
chmod [OPTION]... --reference=RFILE FILE...
参考RFILE文件的权限，将FILE的修改为同RFILE
数字权限法:chmod数字 file
rwx r-x r-- file
其中：

u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。
+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。
其他参数说明：

-c : 若该文件权限确实已经更改，才显示其更改动作
-f : 若该文件权限无法被更改也不要显示错误讯息
-v : 显示权限变更的详细资料
-R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递回的方式逐个变更)
--help : 显示辅助说明
--version : 显示版本

# 文本工具

## 基础

文件内容:less和cat
文件截取:head和tail
按列抽取:cut
按关键字抽取:grep
文件查看:cat tac rev
分页查看:more
一页一页的查看:less
less 命令是man命令使用的分页器

### 显示文本前后或后行内容

head[option]...[FILE]默认看文本前10行,配合管道可以看命令前两行
tail[option]...[FILE]看文本尾
tail-f 跟踪看日志
cut命令取字段
past 横着合并文件
wc 收集文本

### 文本排序sort

把整理过的文本显示在STDOUT,不改变原始文件
sort[opiton]file(s)
uniq:从输入中删除前后相接的重复的行,处理日志
liunx:文本处理三剑客
grep:文本过滤,文本搜索 逐行匹配符合条件的字符 现在用的grep是个别名 输出变红
sed:stream editor, 文本编辑工具
awk:liunx上的实现gawk,文本报告生成器
grep作用:文本搜索工具,根据用户指定的模式对目标文本逐行进行匹配检查;打印匹配到行

## 正则表达式

匹配次数:用在要指定次数的字符后面,用于指定前面字符的次数
位置锚定:定位
正则字符特殊 元字符
.单个任意字符
[abc]表示其中一个字符
[^abc]除去abc任意字母
[:lower:]小写
[:upper:]大写
分组方式
abc\{3}\
搜索替代工具
grep过滤特定行,sed也可以并且编辑修改文件

## vim编辑器

vi:visual interface 文本编辑器
文本:asscii ,unicode
文本编辑种类:
行编辑器:sed
全屏编辑器:nano,vi
vim -viimproved
其他编辑器
gedit 一个简单的图形编辑器
gvim 一个vim编辑器的图形版本
vi一开始是vim的别名
vim有三种模式:normal(普通) insert(插入) extendcommand(命令)
normal :默认模式,移动光标,剪切/粘贴文本
insert :修改文本
extend command:保存,退出

### 搜索替代

/ :从当前光标所在处向文件尾部查找
? :从当前光标所在处向文件首部查找
n :与命令同方向
N :与命令反方向
处理文本的工具sed
stream editor 行编辑器
sed是一种编辑器,他一次处理一行内容.处理时,把当前处理的行存储在临时缓冲区中,称为"模式空间",接着用sed命令处理缓冲区的内容,处理完成后,把缓冲区的内容送往屏幕.然后读入下行,执行下一个循环.如果没有使诸如'D'的特殊命令,那会在两个循环之间清空模式空间,但不会清空保留空间.这样不断重复,直到文件末尾.文件内容并没有改变,除非你使用重定向存储输出.
vim不适合修改大批量文件,sed可以
sed 配合管道可以使用
awk 语言
sed '' passwd
'地址命令'地址不写代表全部文件 命令不写代表输出

# 软件管理

## 包管理器

rpm 打包文件 不需要考虑部署 安装路径都定义好
二进制应用程序的组成部分:二进制文件、库文件、配置文件、帮助文件
程序包管理器：
debian：deb文件, dpkg包管理器  
redhat: rpm文件, rpm包管理器  
rpm: Redhat Package Manager   RPM  Package Manager
源代码：name-VERSION.tar.gz|bz2|xz  VERSION: major.minor.release
rpm包命名方式:name-VERSION-release.arch.rpm  
例：bash-4.2.46-19.el7.x86_64.rpm  VERSION: major.minor.release  release：release.OS  
常见的arch：  x86: i386, i486, i586, i686  x86_64: x64, x86_64, amd64  powerpc: ppc  跟平台无关：noarch

包：分类和拆包  
Application-VERSION-ARCH.rpm: 主包
Application-devel-VERSION-ARCH.rpm 开发子包  Application-utils-VERSION-ARHC.rpm 其它子包  Application-libs-VERSION-ARHC.rpm 其它子包
包之间：可能存在依赖关系，甚至循环依赖
解决依赖包管理
工具:yum：rpm包管理器的前端工具  apt-get：deb包管理器前端工具  zypper: suse上的rpm前端管理工具  dnf: Fedora 18+ rpm包管理器前端管理工具 npm:nodejs包管理工具

查看二进制程序所依赖的库文件  ldd /PATH/TO/BINARY_FILE
管理及查看本机装载的库文件  ldconfig 加载库文件  /sbin/ldconfig -p: 显示本机已经缓存的所有可用库文件名及文件 路径映射关系  配置文件：/etc/ld.so.conf, /etc/ld.so.conf.d/*.conf  缓存文件：/etc/ld.so.cache

### 程序包管理器

功能：将编译好的应用程序的各组成文件打包一个或几个程序包文件,从而方便快捷地实现程序包的安装、卸载、查询、升级和校验等管理操作.
包文件组成 (每个包独有)
RPM包内的文件 RPM的元数据，如名称，版本，依赖性，描述等.  
安装或卸载时运行的脚本
数据库(公共)：/var/lib/rpm 程序包名称及版本  依赖关系  功能说明  包安装后生成的各文件路径及校验码信息
管理程序包的方式:使用包管理器：rpm  使用前端工具：yum, dnf
获取程序包的途径：  
(1) 系统发版的光盘或官方的服务器;CentOS镜像:https://www.centos.org/download/   http://mirrors.aliyun.com   http://mirrors.sohu.com   http://mirrors.163.com  
(2) 项目官方站点程序包的来源 
(3) 第三方组织:Fedora-EPEL:Extra Packages for Enterprise Linux  Rpmforge:RHEL推荐，包很全 搜索引擎:http://pkgs.org http://rpmfind.net   http://rpm.pbone.net https://sourceforge.net/ 
(4) 自己制作 注意：第三方包建议要检查其合法性  来源合法性,程序包的完整性

* rpm包管理 
CentOS系统上使用rpm命令管理程序包:安装、卸载、升级、查询、校验、数据库维护  安装：  
rpm {-i|--install} [install-options] PACKAGE_FILE… 
   -v: verbose  
   -h: 以#显示程序包管理执行进度  rpm -ivh PACKAGE_FILE ...

* rpm包安装
[install-options]  
--test: 测试安装，但不真正执行安装，即dry run模式  
--nodeps：忽略依赖关系  
--replacepkgs | replacefiles  
--nosignature: 不检查来源合法性  
--nodigest：不检查包完整性  
--noscripts：不执行程序包脚本   %pre: 安装前脚本；
--nopre   %post: 安装后脚本；
--nopost   %preun: 卸载前脚本；
--nopreun   %postun: 卸载后脚本；  --nopostun
* rpm包升级
升级：rpm {-U|--upgrade} [install-options] PACKAGE_FILE...
rpm {-F|--freshen} [install-options] PACKAGE_FILE...  
upgrade：安装有旧版程序包，则“升级”
如果不存在旧版程序包，则“安装”  
freshen：安装有旧版程序包，则“升级”
如果不存在旧版程序包，则不执行升级操作  rpm -Uvh PACKAGE_FILE ...  rpm -Fvh PACKAGE_FILE ...  
--oldpackage：降级  
--force: 强制安装

* 升级注意项
注意：
(1) 不要对内核做升级操作；Linux支持多内核版本并存，因此，对直接安装新版 本内核 (2) 如果原程序包的配置文件安装后曾被修改，升级时，新版本的提供的同一个配 置文件并不会直接覆盖老版本的配置文件，而把新版本的文件重命名 (FILENAME.rpmnew)后保留
* 包查询
rpm {-q|--query} [select-options] [query-options] [select-options]  
-a: 所有包  
-f: 查看指定的文件由哪个程序包安装生成  
-p rpmfile：针对尚未安装的程序包文件做查询操作  
--whatprovides CAPABILITY：查询指定的CAPABILITY由哪个包所提供  --whatrequires CAPABILITY：查询指定的CAPABILITY被哪个包所依赖
rpm2cpio 包文件|cpio –itv  预览包内文件 rpm2cpio 包文件|cpio –id  “*.conf” 释放包内文件

* 常用查询用法：  -qi PACKAGE, -qf FILE, -qc PACKAGE, -ql PACKAGE, -qd PACKAGE  -qpi PACKAGE_FILE, -qpl PACKAGE_FILE, ...  -qa 
包卸载：  rpm {-e|--erase} [--allmatches] [--nodeps] [--noscripts] [--notriggers] [--test] PACKAGE_NAME ...

包校验
rpm {-V|--verify} [select-options] [verify-options]  S file Size differs  M Mode differs (includes permissions and file type)  5 digest (formerly MD5 sum) differs  D Device major/minor number mismatch  L readLink(2) path mismatch  U User ownership differs  G Group ownership differs  T mTime differs  P capabilities differ
包校验
包来源合法性验正及完整性验正  
完整性验正：SHA256  
来源合法性验正：RSA 公钥加密  
对称加密：加密、解密使用同一密钥  
非对称加密：密钥是成对儿的
public key: 公钥，公开所有人

* rpm数据库
数据库重建：  /var/lib/rpm rpm {--initdb|--rebuilddb}  initdb: 初始化   如果事先不存在数据库，则新建之   否则，不执行任何操作  rebuilddb：重建已安装的包头的数据库索引目录

## yum

CentOS: yum, dnf YUM: Yellowdog Update Modifier，rpm的前端程序，可解决软件包相关依 赖性，可在多个库之间定位软件包，up2date的替代工具  yum repository: yum repo，存储了众多rpm包，以及包的相关的元数据 文件（放置于特定目录repodata下）  文件服务器: http:// https://   ftp://   file:// 

* yum配置文件 
yum客户端配置文件:/etc/yum.conf：为所有仓库提供公共配置  /etc/yum.repos.d/*.repo：为仓库的指向提供配置  
仓库指向的定义：   [repositoryID]   name=Some name for this repository   baseurl=url://path/to/repository/   enabled={1|0}   gpgcheck={1|0}   gpgkey=URL   enablegroups={1|0}   failovermethod={roundrobin|priority}    roundrobin：意为随机挑选，默认值    priority:按顺序访问   cost=   默认为1000
* yum仓库
yum的repo配置文件中可用的变量：  $releasever: 当前OS的发行版的主版本号  $arch: 平台，i386,i486,i586,x86_64等  $basearch：基础平台；i386, x86_64  $YUM0-$YUM9:自定义变量 实例:  http://server/centos/$releasever/$basearch/http://server/centos/7/x86_64  http://server/centos/6/i384 
yum源
阿里云repo文件:http://mirrors.aliyun.com/repo/ 
CentOS系统的yum源 阿里云：https://mirrors.aliyun.com/centos/$releasever/os/x86_64/ 
EPEL的yum源:阿里云：https://mirrors.aliyun.com/epel/$releasever/x86_64 

### yum命令

yum命令的用法：  yum [options] [command] [package ...] 
显示仓库列表：  yum repolist [all|enabled|disabled] 
显示程序包：  yum list  yum list [all | glob_exp1] [glob_exp2] [...]  yum list {available|installed|updates} [glob_exp1] [...] 安装程序包：  yum install package1 [package2] [...]  yum reinstall package1 [package2] [...]  (重新安装) 
yum命令 
升级程序包：  yum update [package1] [package2] [...]  yum downgrade package1 [package2] [...] (降级) 
检查可用升级：  yum check-update 
卸载程序包：  yum remove | erase package1 [package2] [...] 
yum命令 
查看程序包information：  yum info [...] 
查看指定的特性(可以是某文件)是由哪个程序包所提供：  yum provides | whatprovides feature1 [feature2] [...] 
清理本地缓存：  清除/var/cache/yum/$basearch/$releasever缓存  yum clean [ packages | metadata | expire-cache | rpmdb | plugins | all ] 
构建缓存：  yum makecache 
yum命令 
搜索：yum search string1 [string2] [...]  以指定的关键字搜索程序包名及summary信息 
查看指定包所依赖的capabilities：  yum deplist package1 [package2] [...] 
查看yum事务历史：  yum history [info|list|packages-list|packages-info|  summary|addon-info|redo|undo|  rollback|new|sync|stats]  yum history  yum history info 6  yum history undo 6  
日志 ：/var/log/yum.log
安装及升级本地程序包:yum localinstall rpmfile1 [rpmfile2] [...](用install替代)  
yum localupdate rpmfile1 [rpmfile2] [...] (用update替代)
包组管理的相关命令：  yum groupinstall group1 [group2] [...]   groupupdate group1 [group2] [...]   yum grouplist [hidden] [groupwildcard] [...]   yum groupremove group1 [group2] [...]   yum groupinfo group1 [...] 
yum命令 
yum的命令行选项：  --nogpgcheck：禁止进行gpg check  -y: 自动回答为“yes”  -q：静默模式  --disablerepo=repoidglob：临时禁用此处指定的repo  --enablerepo=repoidglob：临时启用此处指定的repo  --noplugins：禁用所有插件 
系统光盘yum仓库
系统安装光盘作为本地yum仓库：
(1) 挂载光盘至某目录，例如/mnt/cdrom   mount /dev/cdrom /mnt/cdrom 
(2) 创建配置文件   [CentOS7]   name=   baseurl=   gpgcheck=   enabled= 创建yum仓库：  createrepo [options] <directory>

### 程序包编译

程序包编译安装： Application-VERSION-release.src.rpm --> 安装后，使用rpmbuild命令制作 成二进制格式的rpm包，而后再安装 源代码-->预处理-->编译-->汇编-->链接-->执行 
源代码组织格式：  多文件：文件中的代码之间，很可能存在跨文件依赖关系  C、C++：make 项目管理器   configure脚本 --> Makefile.in --> Makefile  java: maven

## C语言源代码编译安装三步骤:
1、./configure(1)通过选项传递参数，指定启用特性、安装路径等；执行时会参考用户的 指定以及Makefile.in文件生成Makefile(2)检查依赖到的外部环境，如依赖的软包 2、make  根据Makefile文件，构建应用程序
3、make install  复制文件到相应路径
开发工具:autoconf: 生成configure脚本 automake：生成Makefile.in 
注意：安装前查看INSTALL，README

开源程序源代码的获取:官方自建站点:apache.org (ASF：Apache Software    Foundation) mariadb.org 代码托管:SourceForge.net  Github.com      code.google.com
c/c++编译器: gcc (GNU C Complier)

编译C源代码：  准备：提供开发工具及开发环境   开发工具：make, gcc等   开发环境：开发库，头文件    glibc：标准库  实现：通过“包组”提供开发组件   Development Tools   Server Platform Development

第一步：configure脚本 选项：指定安装位置、指定启用的特性 --help: 获取其支持使用的选项  选项分类：安装路径设定:--prefix=/PATH: 指定默认安装位置,默认为/usr/local/--sysconfdir=/PATH：配置文件安装位置System types:支持交叉编译

Optional Features: 可选特性 --disable-FEATURE  --enable-FEATURE[=ARG] Optional Packages: 可选包 --with-PACKAGE[=ARG],依赖包    --without-PACKAGE,禁用依赖关系 注意：通常被编译操作依赖的程序包，需要安装此程序包的“开发”组件， 其包名一般类似于name-devel-VERSION

第二步：make 第三步：make install

安装后的配置：
(1) 二进制程序目录导入至PATH环境变量中   编辑文件/etc/profile.d/NAME.sh export PATH=/PATH/TO/BIN:$PATH
(2) 导入帮助手册  编辑/etc/man.config|man_db.conf文件 添加一个MANPATH

# shell编程

## 基础

程序：指令+数据
程序编程风格：
        过程式：以指令为中心，数据服务于指令
        对象式：以数据为中心，指令服务于数据
        shell程序：提供了编程能力，解释执行

### 编程基本概念

编程逻辑处理方式：
顺序执行
循环执行
选择执行

### shell编程：过程式、解释执行

编程语言的基本结构：
各种系统命令的组合
数据存储：变量、数组
表达式: a + b
语句:if
shell脚本基础
shell脚本:
包含一些命令或声明，并符合一定格式的文本文件
格式要求:首行shebang机制
>#!/bin/bash
>#!/usr/bin/python
>#!/usr/bin/perl
shell脚本的用途有：
自动化常用命令

执行系统管理和故障排除

创建简单的应用程序

处理文本或文件

### 添加注释

注释以#开头
第二步：运行脚本
给予执行权限，在命令行上指定脚本的绝对或相对路径
直接运行解释器，将脚本作为解释器程序的参数运行

### 脚本规范

脚本代码开头约定
1、第一行一般为调用使用的语言
2、程序名，避免更改文件名为无法找到正确的文件
3、版本号
4、更改后的时间
5、作者相关信息
6、该程序的作用，及注意事项
7、最后是各版本的更新简要说明

脚本调试
检测脚本中的语法错误
bash -n /path/to/some_script
调试执行
bash -x /path/to/some_script

## 变量

变量：命名的内存空间
数据存储方式：
字符：
数值：整型，浮点型
变量：变量类型
作用：
1、数据存储格式
2、参与的运算
3、表示的数据范围
类型：
字符
数值：整型、浮点型
变量命名法则：
1、不能使程序中的保留字：例如 if, for
2、只能使用数字、字母及下划线，且不能以数字开头
3、见名知义
4、统一命名规则：驼峰命名法，建议大写

* bash中变量的种类
根据变量的生效范围等标准划分下面变量类型：
        局部变量：生效范围为当前shell进程；对当前shell之外的其它shell进程，
包括当前shell的子shell进程均无效
        环境（全局）变量：生效范围为当前shell进程及其子进程
        本地变量：生效范围为当前shell进程中某代码片断，通常指函数
        位置变量：$1, $2, ...来表示，用于让脚本在脚本代码中调用通过命令行传
递给它的参数
        特殊变量：$?, $0, $*, $@, $#,$$
* 局部变量
变量赋值：name=‘value’
可以使用引用value:
(1) 可以是直接字串; name=“root"
(2) 变量引用：name="$USER"
(3) 命令引用：name=`COMMAND` name=$(COMMAND)
变量引用：${name} $name
""：弱引用，其中的变量引用会被替换为变量值
''：强引用，其中的变量引用不会被替换为变量值，而保持原字符串
显示已定义的所有变量：set
删除变量：unset name

* 环境变量
bash内建的环境变量：
PATH
SHELL
USER
UID
HOME
PWD
SHLVL
LANG
 MAIL
HOSTNAME
HISTSIZE
—

### 只读和位置变量

只读变量：只能声明，但不能修改和删除
声明只读变量：
        readonly name
        declare -r name
查看只读变量：
        readonly –p
位置变量：在脚本代码中调用通过命令行传递给脚本的参数
$1, $2, ...：对应第1、第2等参数，shift [n]换位置
$0: 命令本身
$*: 传递给脚本的所有参数，全部参数合为一个字符串
$@: 传递给脚本的所有参数，每个参数为独立字符串
$#: 传递给脚本的参数的个数
$@ $* 只在被双引号包起来的时候才会有差异
set -- 清空所有位置变量
* 退出状态
进程使用退出状态来报告成功或失败
• 0 代表成功，1－255代表失败
• $? 变量保存最近的命令退出状态
例如：
ping -c1 -W1 hostdown &> /dev/null
echo $?
退出状态码
bash自定义退出状态码
exit [n]：自定义退出状态码
注意：脚本中一旦遇到exit命令，脚本会立即终止；终止退出状态取决于exit命
令后面的数字
注意：如果未给脚本指定退出状态码，整个脚本的退出状态码取决于脚本中执
行的最后一条命令的状态码

## 运算

bash中的算术运算:help let
+, -, *, /, %取模（取余）, **（乘方）
实现算术运算：
(1) let var=算术表达式
(2) var=$[算术表达式]
(3) var=$((算术表达式))
(4) var=$(expr arg1 arg2 arg3 ...)
(5) declare –i var = 数值
(6) echo ‘算术表达式’ | bc
乘法符号有些场景中需要转义，如*
bash有内建的随机数生成器：RANDOM（0-32767）
echo $[$RANDOM%50] ：0-49之间随机数
赋值
* 增强型赋值：
+=, -=, *=, /=, %=
let varOPERvalue
例如:let count+=3
自加3后自赋值
自增，自减：
        let var+=1
        let var++
        let var-=1
        let var--
* 逻辑运算
true, false
1, 0
        与：
        1 与 1 = 1
        1 与 0 = 0
        0 与 1 = 0
        0 与 0 = 0
        或:
        1 或 1 = 1
        1 或 0 = 1
        0 或 1 = 1
        0 或 0 = 0
        非：！
        ! 1 = 0
        ! 0 = 1

* 短路运算

* 短路与
第一个为0，结果必定为0
第一个为1，第二个必须要参与运算
* 短路或
第一个为1，结果必定为1
第一个为0，第二个必须要参与运算
* 异或：^
异或的两个值,相同为假，不同为真
* 条件测试
判断某需求是否满足，需要由测试机制来实现
专用的测试表达式需要由测试命令辅助完成测试过程
评估布尔声明，以便用在条件性执行中
• 若真，则返回0
• 若假，则返回1
* 测试命令：
• test EXPRESSION
• [ EXPRESSION ]
• [[ EXPRESSION ]]
注意：EXPRESSION前后必须有空白字符
bash的数值测试
-v VAR
变量VAR是否设置
* 数值测试：
-gt 是否大于
-ge 是否大于等于
-eq 是否等于
-ne 是否不等于
-lt 是否小于
-le 是否小于等于
bash的字符串测试

* 字符串测试:

>== 是否等于
> ascii码是否大于ascii码
< 是否小于
!= 是否不等于
=~ 左侧字符串是否能够被右侧的PATTERN所匹配
注意: 此表达式一般用于[[ ]]中；扩展的正则表达式
>-z "STRING“ 字符串是否为空，空为真，不空为假
>-n "STRING“ 字符串是否不空，不空为真，空为假
注意：用于字符串比较时的用到的操作数都应该使用引号
Bash的文件测试

* 存在性测试

-a FILE：同-e
-e FILE: 文件存在性测试，存在为真，否则为假
存在性及类别测试
-b FILE：是否存在且为块设备文件
-c FILE：是否存在且为字符设备文件
-d FILE：是否存在且为目录文件
-f FILE：是否存在且为普通文件
-h FILE 或 -L FILE：存在且为符号链接文件
-p FILE：是否存在且为命名管道文件
-S FILE：是否存在且为套接字文件
Bash的文件权限测试

* 文件权限测试：
-r FILE：是否存在且可读
-w FILE: 是否存在且可写
-x FILE: 是否存在且可执行
* 文件特殊权限测试：
-u FILE：是否存在且拥有suid权限
-g FILE：是否存在且拥有sgid权限
-k FILE：是否存在且拥有sticky权限
Bash的文件属性测试
* 文件大小测试：
-s FILE: 是否存在且非空
文件是否打开：
-t fd: fd 文件描述符是否在某终端已经打开
-N FILE：文件自从上一次被读取之后是否被修改过
-O FILE：当前有效用户是否为文件属主
-G FILE：当前有效用户是否为文件属组
Bash的文件属性测试
* 双目测试：
FILE1 -ef FILE2: FILE1是否是FILE2的硬链接
FILE1 -nt FILE2: FILE1是否新于FILE2（mtime）
FILE1 -ot FILE2: FILE1是否旧于FILE2

使用read命令来接受输入
使用read来把输入值分配给一个或多个shell变量
-p 指定要显示的提示
-s 静默输入，一般用于密码
-n N 指定输入的字符长度N
-d ‘字符’ 输入结束符
-t N TIMEOUT为N秒
read 从标准输入中读取值，给每个单词分配一个变量
所有剩余单词都被分配给最后一个变量
read -p “Enter a filename: “ FILE

## 流程控制

过程式编程语言：
        顺序执行
        选择执行
        循环执行
条件选择if语句

* 选择执行:

注意：if语句可嵌套
单分支
        if 判断条件;then
        条件为真的分支代码
        fi
双分支
        if 判断条件; then
        条件为真的分支代码
        else
条件为假的分支代码
fi

* 
多分支
        if 判断条件1; then
        条件为真的分支代码
        elif 判断条件2; then
        条件为真的分支代码
        elif 判断条件3; then
        条件为真的分支代码
        else
        以上条件都为假的分支代码
        fi
逐条件进行判断，第一次遇为“真”条件时，执行其分支，而后结束整个if语句

* 条件判断：case语句
        case 变量引用 in
        PAT1)
        分支1
        ;;
        PAT2)
        分支2
        ;;
        ...
        *)
        默认分支
        ;;
        esac

case支持glob风格的通配符：
        *: 任意长度任意字符
        ?: 任意单个字符
        []：指定范围内的任意单个字符
        a|b: a或b

* 循环
  

循环执行
将某代码段重复运行多次
重复运行多少次：
循环次数事先已知
循环次数事先未知
有进入条件和退出条件
for, while, until
for循环
for 变量名 in 列表;do
循环体
done
执行机制：
依次将列表中的元素赋值给“变量名”; 每次赋值后即执行一次循环体; 直
到列表中的元素耗尽，循环结束

* for循环
列表生成方式：
(1) 直接给出列表
(2) 整数列表：
(a) {start..end}
(b) $(seq [start [step]] end)
(3) 返回列表的命令
$(COMMAND)
(4) 使用glob，如：*.sh
(5) 变量引用；
$@, $*
while循环
while CONDITION; do
循环体
done
CONDITION：循环控制条件；进入循环之前，先做一次判断；每一次循环之后
会再次做判断；条件为“true”，则执行一次循环；直到条件测试状态为
“false”终止循环
因此：CONDTION一般应该有循环控制变量；而此变量的值会在循环体不断地
被修正
进入条件：CONDITION为true
退出条件：CONDITION为false
until循环
until CONDITION; do
循环体
done
进入条件： CONDITION 为false
退出条件： CONDITION 为true
循环控制语句continue
用于循环体中
ontinue [N]：提前结束第N层的本轮循环，而直接进入下一轮判断；最内层为
第1层
while CONDTIITON1; do
CMD1
...
if CONDITION2; then
continue
fi
CMDn
...
done
循环控制语句break
用于循环体中
break [N]：提前结束第N层循环，最内层为第1层
while CONDTIITON1; do
CMD1
...
if CONDITION2; then
break
fi
CMDn
...
done
特殊用法
双小括号方法，即((…))格式，也可以用于算术运算
双小括号方法也可以使bash Shell实现C语言风格的变量操作
I=10
((I++))
for循环的特殊格式：
 for ((控制变量初始化;条件判断表达式;控制变量的修正表达式))
 do
* 循环体
 done
控制变量初始化：仅在运行到循环代码段时执行一次
控制变量的修正表达式：每轮循环结束会先进行控制变量修正运算，而后再做
条件判断

## 函数介绍

函数function是由若干条shell命令组成的语句块，实现代码重用和模块化编程
它与shell程序形式上是相似的，不同的是它不是一个单独的进程，不能独立运
行，而是shell程序的一部分
函数和shell程序比较相似，区别在于：
Shell程序在子Shell中运行
而Shell函数在当前Shell中运行。因此在当前Shell中，函数可以对shell中变
量进行修改
定义函数
函数由两部分组成：函数名和函数体
help function
语法一：
f_name （）{
...函数体...
}
 语法二：
function f_name {
...函数体...
}
 语法三：
function f_name （） {
...函数体...
}

* 函数使用
函数的定义和使用：
可在交互式环境下定义函数
可将函数放在脚本文件中作为它的一部分
可放在只包含函数的单独文件中
调用：函数只有被调用才会执行
调用：给定函数名
函数名出现的地方，会被自动替换为函数代码
函数的生命周期：被调用时创建，返回时终止函数返回值
函数有两种返回值：
函数的执行结果返回值：
(1) 使用echo等命令进行输出
(2) 函数体中调用命令的输出结果
函数的退出状态码：
(1) 默认取决于函数中执行的最后一条命令的退出状态码
(2) 自定义退出状态码，其格式为：
return 从函数中返回，用最后状态命令决定返回值
return 0 无错误返回。
return 1-255 有错误返回
交互式环境下定义和使用函数

>示例:
 >dir() {
 > ls -l
 > }
定义该函数后，若在$后面键入dir，其显示结果同ls -l的作用相同
dir
该dir函数将一直保留到用户从系统退出，或执行了如下所示的unset命令
unset dir
在脚本中定义及使用函数
函数在使用前必须定义，因此应将函数定义放在脚本开始部分，直至shell首次发现它
后才能使用
调用函数仅使用其函数名即可
>示例：
>cat func1
>!/bin/bash
>func1
>hello()
>{
> echo "Hello there today's date is `date +%F`"
>}
>echo "now going to the function hello"
>hello
>echo "back from the function"
使用函数文件
可以将经常使用的函数存入函数文件，然后将函数文件载入shell
文件名可任意选取，但最好与相关任务有某种联系。例如：functions.main
一旦函数文件载入shell，就可以在命令行或脚本中调用函数。可以使用set
命令查看所有定义的函数，其输出列表包括已经载入shell的所有函数
若要改动函数，首先用unset命令从shell中删除函数。改动完毕后，再重新
载入此文件

* 创建函数文件

函数文件示例：
>cat functions.main
>#!/bin/bash
>#functions.main
>findit()
>{
> if [ $# -lt 1 ] ; then
> echo "Usage:findit file"
> return 1
>fi
>find / -name $1 –print
>}

* 载入函数
函数文件已创建好后，要将它载入shell
定位函数文件并载入shell的格式：
. filename 或 source filename
注意：此即<点> <空格> <文件名>
这里的文件名要带正确路径

* 检查载入函数
使用set命令检查函数是否已载入。set命令将在shell中显示所有的载入函数

>示例：
>set
> findit=( )
> {
> if [ $# -lt 1 ]; then
> echo "usage :findit file";
> return 1
> fi
> find / -name $1 -print
> }

* 执行shell函数
要执行函数，简单地键入函数名即可
示例：
findit groups
/usr/bin/groups
/usr/local/backups/groups.bak
* 删除shell函数
现在对函数做一些改动后，需要先删除函数，使其对shell不可用。使用unset命
令完成删除函数
命令格式为：
unset function_name
示例：
unset findit
再键入set命令，函数将不再显示
* 函数参数
函数可以接受参数：
传递参数给函数：调用函数时，在函数名后面以空白分隔给定参数列表即可；
例如“testfunc arg1 arg2 ...”
在函数体中当中，可使用$1, $2, ...调用这些参数；还可以使用$@, $*, $#
等特殊变量
函数变量
变量作用域：
环境变量：当前shell和子shell有效
本地变量：只在当前shell进程有效，为执行脚本会启动专用子shell进程；
因此，本地变量的作用范围是当前shell脚本程序文件，包括脚本中的函数
局部变量：函数的生命周期；函数结束时变量被自动销毁
注意：如果函数中有局部变量，如果其名称同本地变量，使用局部变量
在函数中定义局部变量的方法
local NAME=VALUE
函数递归示例
* 函数递归：
函数直接或间接调用自身
注意递归层数
递归实例：
阶乘是基斯顿·卡曼于 1808 年发明的运算符号，是数学术语
一个正整数的阶乘（factorial）是所有小于及等于该数的正整数的积，并且有0的
阶乘为1，自然数n的阶乘写作n!
n!=1×2×3×...×n
阶乘亦可以递归方式定义：0!=1，n!=(n-1)!×n
n!=n(n-1)(n-2)...1
n(n-1)! = n(n-1)(n-2)!
函数递归示例:

>        示例：fact.sh
>
>        fact() {
>        if [ $1 -eq 0 -o $1 -eq 1 ]; then
>        echo 1
>        else
>        echo $[$1*$(fact $[$1-1])]
>        fi
>        }
>        fact $1

* fork炸弹

fork炸弹是一种恶意程序，它的内部是一个不断在fork进程的无限循环，实质是
一个简单的递归程序。由于程序是递归的，如果没有任何限制，这会导致这个
简单的程序迅速耗尽系统里面的所有资源
函数实现
:(){ :|:& };:
bomb() { bomb | bomb & }; bomb  实际上: 代表bomb
脚本实现
>cat Bomb.sh
>./$0|./$0&
