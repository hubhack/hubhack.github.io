---
title: linux命令整理(1)


categories: 

- linux
tags:
- linux基础
---



1 文档管理cat chgrp chmod chown file find  cut in less more mv tee touch which cp read
2 文档编辑:grep sed tr sort uniq wc let
3 磁盘管理:cd df du mkdir pwd mount stat tree ls
4 网络通讯:telnet httpd ifconfig netatat ping tty write
5 系统管理:useradd data adduser exit kill ps  pstree top reboot sudo uname who whoami whois w id free
6 系统设置:reset clear alias enable rpm set passwd time setup
7 备份压缩:zip tar
8 其他命令: bc tail

## 文档命令

### cat

全称: concatenate files and print on the standard output
cat 命令用于连接文件并打印到标准输出设备上。使用权限:所有使用者
语法格式:cat [-AbeEnstTuv] [--help] [--version] fileName
参数说明：
-n 或 --number：由 1 开始对所有输出的行数编号。
-b 或 --number-nonblank：和 -n 相似，只不过对于空白行不编号。
-s 或 --squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行。
-v 或 --show-nonprinting：使用 ^ 和 M- 符号，除了 LFD 和 TAB 之外。
-E 或 --show-ends : 在每行结束处显示 $。
-T 或 --show-tabs: 将 TAB 字符显示为 ^I。
-A, --show-all：等价于 -vET。
-e：等价于"-vE"选项；
-t：等价于"-vT"选项；

把 textfile1 的文档内容加上行号后输入 textfile2 这个文档里：
cat -n textfile1 > textfile2
把 textfile1 和 textfile2 的文档内容加上行号（空白行不加）之后将内容附加到 textfile3 文档里：
cat -b textfile1 textfile2 >> textfile3
清空 /etc/test.txt 文档内容：
cat /dev/null > /etc/test.txt
cat 也可以用来制作镜像文件。例如要制作软盘的镜像文件，将软盘放好后输入：
cat /dev/fd0 > OUTFILE
相反的，如果想把 image file 写到软盘，输入：
cat IMG_FILE > /dev/fd0
注：
1. OUTFILE 指输出的镜像文件名.
2. IMG_FILE 指镜像文件。
3. 若从镜像文件写回 device 时，device 容量需与相当。
4. 通常用制作开机磁片

### chgrp

Linux chgrp命令用于变更文件或目录的所属群组。

在UNIX系统家族里，文件或目录权限的掌控以拥有者及所属群组来管理。您可以使用chgrp指令去变更文件与目录的所属群组，设置方式采用群组名称或群组识别码皆可。

语法:
chgrp [-cfhRv][--help][--version][所属群组][文件或目录...] 或 chgrp [-cfhRv][--help][--reference=<参考文件或目录>][--version][文件或目录...]
参数说明
　　-c或--changes 效果类似"-v"参数，但仅回报更改的部分。

　　-f或--quiet或--silent 　不显示错误信息。

　　-h或--no-dereference 　只对符号连接的文件作修改，而不更动其他任何相关文件。

　　-R或--recursive 　递归处理，将指定目录下的所有文件及子目录一并处理。

　　-v或--verbose 　显示指令执行过程。

　　--help 　在线帮助。

　　--reference=<参考文件或目录> 　把指定文件或目录的所属群组全部设成和参考文件或目录的所属群组相同。

　　--version 　显示版本信息。

### chmod

Linux/Unix 的文件调用权限分为三级 : 文件拥有者、群组、其他。利用 chmod 可以藉以控制文件如何被他人所调用。

使用权限 : 所有使用者

语法
chmod [-cfvR] [--help] [--version] mode file...
参数说明
mode : 权限设定字串，格式如下 :

[ugoa...][[+-=][rwxX]...][,...]
其中：

u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。
+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限
r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。
其他参数说明：

-c : 若该文件权限确实已经更改，才显示其更改动作
-f : 若该文件权限无法被更改也不要显示错误讯息
-v : 显示权限变更的详细资料
-R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递回的方式逐个变更)
--help : 显示辅助说明
--version : 显示版本
实例
将文件 file1.txt 设为所有人皆可读取 :

chmod ugo+r file1.txt
将文件 file1.txt 设为所有人皆可读取 :

chmod a+r file1.txt
将文件 file1.txt 与 file2.txt 设为该文件拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入 :

chmod ug+w,o-w file1.txt file2.txt
将 ex1.py 设定为只有该文件拥有者可以执行 :

chmod u+x ex1.py
将目前目录下的所有文件与子目录皆设为任何人可读取 :

chmod -R a+r *
此外chmod也可以用数字来表示权限如 :

chmod 777 file
语法为：

chmod abc file
其中a,b,c各为一个数字，分别表示User、Group、及Other的权限。

r=4，w=2，x=1
若要rwx属性则4+2+1=7；
若要rw-属性则4+2=6；
若要r-x属性则4+1=5。
chmod a=rwx file
和

chmod 777 file
效果相同

chmod ug=rwx,o=x file
和

chmod 771 file
效果相同

若用chmod 4755 filename可使此程序具有root的权限

### chown

Linux/Unix 是多人多工操作系统，所有的文件皆有拥有者。利用 chown 将指定文件的拥有者改为指定的用户或组，用户可以是用户名或者用户ID；组可以是组名或者组ID；文件是以空格分开的要改变权限的文件列表，支持通配符。 。
一般来说，这个指令只有是由系统管理者(root)所使用，一般使用者没有权限可以改变别人的文件拥有者，也没有权限可以自己的文件拥有者改设为别人。只有系统管理者(root)才有这样的权限。
使用权限 : root
语法
chown [-cfhvR] [--help] [--version] user[:group] file...
参数 :
user : 新的文件拥有者的使用者 ID
group : 新的文件拥有者的使用者组(group)
-c : 显示更改的部分的信息
-f : 忽略错误信息
-h :修复符号链接
-v : 显示详细的处理信息
-R : 处理指定目录以及其子目录下的所有文件
--help : 显示辅助说明
--version : 显示版本

### file

Linux file命令用于辨识文件类型。

通过file指令，我们得以辨识该文件的类型。

语法
file [-bcLvz][-f <名称文件>][-m <魔法数字文件>...][文件或目录...]
参数：

-b 　列出辨识结果时，不显示文件名称。
-c 　详细显示指令执行过程，便于排错或分析程序执行的情形。
-f<名称文件> 　指定名称文件，其内容有一个或多个文件名称时，让file依序辨识这些文件，格式为每列一个文件名称。
-L 　直接显示符号连接所指向的文件的类别。
-m<魔法数字文件> 　指定魔法数字文件。
-v 　显示版本信息。
-z 　尝试去解读压缩文件的内容。
[文件或目录...] 要确定类型的文件列表，多个文件之间使用空格分开，可以使用shell通配符匹配多个文件。

### find

Linux find命令用来在指定目录下查找文件。任何位于参数之前的字符串都将被视为欲查找的目录名。如果使用该命令时，不设置任何参数，则find命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。

语法
find   path   -option   [   -print ]   [ -exec   -ok   command ]   {} \;
参数说明 :

find 根据下列规则判断 path 和 expression，在命令列上第一个 - ( ) , ! 之前的部份为 path，之后的是 expression。如果 path 是空字串则使用目前路径，如果 expression 是空字串则使用 -print 为预设 expression。

expression 中可使用的选项有二三十个之多，在此只介绍最常用的部份。

-mount, -xdev : 只检查和指定目录在同一个文件系统下的文件，避免列出其它文件系统中的文件

-amin n : 在过去 n 分钟内被读取过

-anewer file : 比文件 file 更晚被读取过的文件

-atime n : 在过去n天内被读取过的文件

-cmin n : 在过去 n 分钟内被修改过

-cnewer file :比文件 file 更新的文件

-ctime n : 在过去n天内被修改过的文件

-empty : 空的文件-gid n or -group name : gid 是 n 或是 group 名称是 name

-ipath p, -path p : 路径名称符合 p 的文件，ipath 会忽略大小写

-name name, -iname name : 文件名称符合 name 的文件。iname 会忽略大小写

-size n : 文件大小 是 n 单位，b 代表 512 位元组的区块，c 表示字元数，k 表示 kilo bytes，w 是二个位元组。-type c : 文件类型是 c 的文件。

d: 目录

c: 字型装置文件

b: 区块装置文件

p: 具名贮列

f: 一般文件

l: 符号连结

s: socket

-pid n : process id 是 n 的文件

你可以使用 ( ) 将运算式分隔，并使用下列运算。

exp1 -and exp2

! expr

-not expr

exp1 -or exp2

exp1, exp2

### cut

Linux cut命令用于显示每行从开头算起 num1 到 num2 的文字。

语法
cut  [-bn] [file]
cut [-c] [file]
cut [-df] [file]
使用说明:

cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段写至标准输出。

如果不指定 File 参数，cut 命令将读取标准输入。必须指定 -b、-c 或 -f 标志之一。

参数:

-b ：以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了 -n 标志。
-c ：以字符为单位进行分割。
-d ：自定义分隔符，默认为制表符。
-f ：与-d一起使用，指定显示哪个区域。
-n ：取消分割多字节字符。仅和 -b 标志一起使用。如果字符的最后一个字节落在由 -b 标志的 List 参数指示的
范围之内，该字符将被写出；否则，该字符将被排除

### ln

Linux ln命令是一个非常重要命令，它的功能是为某一个文件在另外一个位置建立一个同步的链接。

当我们需要在不同的目录，用到相同的文件时，我们不需要在每一个需要的目录下都放一个必须相同的文件，我们只要在某个固定的目录，放上该文件，然后在 其它的目录下用ln命令链接（link）它就可以，不必重复的占用磁盘空间。

语法
 ln [参数][源文件或目录][目标文件或目录] 其中参数的格式为
[-bdfinsvF] [-S backup-suffix] [-V {numbered,existing,simple}]

[--help] [--version] [--]

命令功能 : 
Linux文件系统中，有所谓的链接(link)，我们可以将其视为档案的别名，而链接又可分为两种 : 硬链接(hard link)与软链接(symbolic link)，硬链接的意思是一个档案可以有多个名称，而软链接的方式则是产生一个特殊的档案，该档案的内容是指向另一个档案的位置。硬链接是存在同一个文件系统中，而软链接却可以跨越不同的文件系统。

不论是硬链接或软链接都不会将原本的档案复制一份，只会占用非常少量的磁碟空间。

软链接：

1.软链接，以路径的形式存在。类似于Windows操作系统中的快捷方式
2.软链接可以 跨文件系统 ，硬链接不可以
3.软链接可以对一个不存在的文件名进行链接
4.软链接可以对目录进行链接
硬链接：

1.硬链接，以文件副本的形式存在。但不占用实际空间。
2.不允许给目录创建硬链接
3.硬链接只有在同一个文件系统中才能创建
命令参数
必要参数：

-b 删除，覆盖以前建立的链接
-d 允许超级用户制作目录的硬链接
-f 强制执行
-i 交互模式，文件存在则提示用户是否覆盖
-n 把符号链接视为一般目录
-s 软链接(符号链接)
-v 显示详细的处理过程
选择参数：

-S "-S<字尾备份字符串> "或 "--suffix=<字尾备份字符串>"
-V "-V<备份方式>"或"--version-control=<备份方式>"
--help 显示帮助信息
--version 显示版本信息

### less

less 与 more 类似，但使用 less 可以随意浏览文件，而 more 仅能向前移动，却不能向后移动，而且 less 在查看之前不会加载整个文件。

语法
less [参数] 文件 
参数说明：

-b <缓冲区大小> 设置缓冲区的大小
-e 当文件显示结束后，自动离开
-f 强迫打开特殊文件，例如外围设备代号、目录和二进制文件
-g 只标志最后搜索的关键词
-i 忽略搜索时的大小写
-m 显示类似more命令的百分比
-N 显示每行的行号
-o <文件名> 将less 输出的内容在指定文件中保存起来
-Q 不使用警告音
-s 显示连续空行为一行
-S 行过长时间将超出部分舍弃
-x <数字> 将"tab"键显示为规定的数字空格
/字符串：向下搜索"字符串"的功能
?字符串：向上搜索"字符串"的功能
n：重复前一个搜索（与 / 或 ? 有关）
N：反向重复前一个搜索（与 / 或 ? 有关）
b 向后翻一页
d 向后翻半页
h 显示帮助界面
Q 退出less 命令
u 向前滚动半页
y 向前滚动一行
空格键 滚动一页
回车键 滚动一行
[pagedown]： 向下翻动一页
[pageup]： 向上翻动一页

### more

Linux more命令
Linux 命令大全 Linux 命令大全

Linux more 命令类似 cat ，不过会以一页一页的形式显示，更方便使用者逐页阅读，而最基本的指令就是按空白键（space）就往下一页显示，按 b 键就会往回（back）一页显示，而且还有搜寻字串的功能（与 vi 相似），使用中的说明文件，请按 h 。

语法
more [-dlfpcsu] [-num] [+/pattern] [+linenum] [fileNames..]
参数：

-num 一次显示的行数
-d 提示使用者，在画面下方显示 [Press space to continue, 'q' to quit.] ，如果使用者按错键，则会显示 [Press 'h' for instructions.] 而不是 '哔' 声
-l 取消遇见特殊字元 ^L（送纸字元）时会暂停的功能
-f 计算行数时，以实际上的行数，而非自动换行过后的行数（有些单行字数太长的会被扩展为两行或两行以上）
-p 不以卷动的方式显示每一页，而是先清除萤幕后再显示内容
-c 跟 -p 相似，不同的是先显示内容再清除其他旧资料
-s 当遇到有连续两行以上的空白行，就代换为一行的空白行
-u 不显示下引号 （根据环境变数 TERM 指定的 terminal 而有所不同）
+/pattern 在每个文档显示前搜寻该字串（pattern），然后从该字串之后开始显示
+num 从第 num 行开始显示
fileNames 欲显示内容的文档，可为复数个数

### mv

Linux mv命令
Linux 命令大全 Linux 命令大全

Linux mv命令用来为文件或目录改名、或将文件或目录移入其它位置。

语法
mv [options] source dest
mv [options] source... directory
参数说明：

-i: 若指定目录已有同名文件，则先询问是否覆盖旧文件;
-f: 在mv操作要覆盖某已有的目标文件时不给任何指示;
mv参数设置与运行结果

mv 文件名 文件名 将源文件名改为目标文件名
mv 文件名 目录名 将文件移动到目标目录
mv 目录名 目录名 目标目录已存在，将源目录
移动到目标目录；目标
目录不存在则改名
mv 目录名 文件名 出错

### rm

rm命令用于删除一个文件或者目录。

语法
rm [options] name...
参数：

-i 删除前逐一询问确认。
-f 即使原档案属性设为唯读，亦直接删除，无需逐一确认。
-r 将目录及以下之档案亦逐一删除。

### tee

Linux tee命令用于读取标准输入的数据，并将其内容输出成文件。

tee指令会从标准输入设备读取数据，将其内容输出到标准输出设备，同时保存成文件。

语法
tee [-ai][--help][--version][文件...]
参数：

-a或--append 　附加到既有文件的后面，而非覆盖它．
-i或--ignore-interrupts 　忽略中断信号。
--help 　在线帮助。
--version 　显示版本信息。

### touch

Linux touch命令用于修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件。

ls -l 可以显示档案的时间记录。

语法
touch [-acfm][-d<日期时间>][-r<参考文件或目录>] [-t<日期时间>][--help][--version][文件或目录…]
参数说明：
a 改变档案的读取时间记录。
m 改变档案的修改时间记录。
c 假如目的档案不存在，不会建立新的档案。与 --no-create 的效果一样。
f 不使用，是为了与其他 unix 系统的相容性而保留。
r 使用参考档的时间记录，与 --file 的效果一样。
d 设定时间与日期，可以使用各种不同的格式。
t 设定档案的时间记录，格式与 date 指令相同。
--no-create 不会建立新档案。
--help 列出指令格式。
--version 列出版本讯息。

### which

Linux which命令用于查找文件。

which指令会在环境变量$PATH设置的目录里查找符合条件的文件。

语法
which [文件...]
参数：

-n<文件名长度> 　指定文件名长度，指定的长度必须大于或等于所有文件中最长的文件名。
-p<文件名长度> 　与-n参数相同，但此处的<文件名长度>包括了文件的路径。
-w 　指定输出时栏位的宽度。
-V 　显示版本信息

### cp

Linux cp命令主要用于复制文件或目录。

语法
cp [options] source dest
或

cp [options] source... directory
参数说明：

-a：此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于dpR参数组合。
-d：复制时保留链接。这里所说的链接相当于Windows系统中的快捷方式。
-f：覆盖已经存在的目标文件而不给出提示。
-i：与-f选项相反，在覆盖目标文件之前给出提示，要求用户确认是否覆盖，回答"y"时目标文件将被覆盖。
-p：除复制文件的内容外，还把修改时间和访问权限也复制到新文件中。
-r：若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件。
-l：不复制文件，只是生成链接文件。

### read

Linux read命令用于从标准输入读取数值。

read 内部命令被用来从标准输入读取单行数据。这个命令可以用来读取键盘输入，当使用重定向的时候，可以读取文件中的一行数据。

语法
read [-ers] [-a aname] [-d delim] [-i text] [-n nchars] [-N nchars] [-p prompt] [-t timeout] [-u fd] [name ...]
参数说明:

-a 后跟一个变量，该变量会被认为是个数组，然后给其赋值，默认是以空格为分割符。
-d 后面跟一个标志符，其实只有其后的第一个字符有用，作为结束的标志。
-p 后面跟提示信息，即在输入前打印提示信息。
-e 在输入的时候可以使用命令补全功能。
-n 后跟一个数字，定义输入文本的长度，很实用。
-r 屏蔽\，如果没有该选项，则\作为一个转义字符，有的话 \就是个正常的字符了。
-s 安静模式，在输入字符时不再屏幕上显示，例如login时输入密码。
-t 后面跟秒数，定义输入字符的等待时间。
-u 后面跟fd，从文件描述符中读入，该文件描述符可以是exec新开启的。

