---
title: linux命令整理(3)
categories: 
- linux
tags:
- linux基础
---


## 磁盘管理

### cd

Linux cd命令用于切换当前工作目录至 dirName(目录参数)。

其中 dirName 表示法可为绝对路径或相对路径。若目录名称省略，则变换至使用者的 home 目录 (也就是刚 login 时所在的目录)。

另外，"~" 也表示为 home 目录 的意思，"." 则是表示目前所在的目录，".." 则表示目前目录位置的上一层目录。

语法
cd [dirName]
dirName：要切换的目标目录。

### df

Linux df命令用于显示目前在Linux系统上的文件系统的磁盘使用情况统计。

语法
df [选项]... [FILE]...
文件-a, --all 包含所有的具有 0 Blocks 的文件系统
文件--block-size={SIZE} 使用 {SIZE} 大小的 Blocks
文件-h, --human-readable 使用人类可读的格式(预设值是不加这个选项的...)
文件-H, --si 很像 -h, 但是用 1000 为单位而不是用 1024
文件-i, --inodes 列出 inode 资讯，不列出已使用 block
文件-k, --kilobytes 就像是 --block-size=1024
文件-l, --local 限制列出的文件结构
文件-m, --megabytes 就像 --block-size=1048576
文件--no-sync 取得资讯前不 sync (预设值)
文件-P, --portability 使用 POSIX 输出格式
文件--sync 在取得资讯前 sync
文件-t, --type=TYPE 限制列出文件系统的 TYPE
文件-T, --print-type 显示文件系统的形式
文件-x, --exclude-type=TYPE 限制列出文件系统不要显示 TYPE
文件-v (忽略)
文件--help 显示这个帮手并且离开
文件--version 输出版本资讯并且离开

### du

Linux du命令用于显示目录或文件的大小。

du会显示指定的目录或文件所占用的磁盘空间。

语法
du [-abcDhHklmsSx][-L <符号连接>][-X <文件>][--block-size][--exclude=<目录或文件>][--max-depth=<目录层数>][--help][--version][目录或文件]
参数说明：

-a或-all 显示目录中个别文件的大小。
-b或-bytes 显示目录或文件大小时，以byte为单位。
-c或--total 除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
-D或--dereference-args 显示指定符号连接的源文件大小。
-h或--human-readable 以K，M，G为单位，提高信息的可读性。
-H或--si 与-h参数相同，但是K，M，G是以1000为换算单位。
-k或--kilobytes 以1024 bytes为单位。
-l或--count-links 重复计算硬件连接的文件。
-L<符号连接>或--dereference<符号连接> 显示选项中所指定符号连接的源文件大小。
-m或--megabytes 以1MB为单位。
-s或--summarize 仅显示总计。
-S或--separate-dirs 显示个别目录的大小时，并不含其子目录的大小。
-x或--one-file-xystem 以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。
-X<文件>或--exclude-from=<文件> 在<文件>指定目录或文件。
--exclude=<目录或文件> 略过指定的目录或文件。
--max-depth=<目录层数> 超过指定层数的目录后，予以忽略。
--help 显示帮助。
--version 显示版本信息。

### mkdir

Linux mkdir命令用于建立名称为 dirName 之子目录。

语法
mkdir [-p] dirName
参数说明：

-p 确保目录名称存在，不存在的就建一个。

### pwd

Linux pwd命令用于显示工作目录。

执行pwd指令可立刻得知您目前所在的工作目录的绝对路径名称。

语法
pwd [--help][--version]
参数说明:

--help 在线帮助。
--version 显示版本信息。

### mount

Linux mount命令是经常会使用到的命令，它用于挂载Linux系统外的文件。

语法
mount [-hV]
mount -a [-fFnrsvw] [-t vfstype]
mount [-fnrsvw] [-o options [,...]] device | dir
mount [-fnrsvw] [-t vfstype] [-o options] device dir
参数说明：

-V：显示程序版本
-h：显示辅助讯息
-v：显示较讯息，通常和 -f 用来除错。
-a：将 /etc/fstab 中定义的所有档案系统挂上。
-F：这个命令通常和 -a 一起使用，它会为每一个 mount 的动作产生一个行程负责执行。在系统需要挂上大量 NFS 档案系统时可以加快挂上的动作。
-f：通常用在除错的用途。它会使 mount 并不执行实际挂上的动作，而是模拟整个挂上的过程。通常会和 -v 一起使用。
-n：一般而言，mount 在挂上后会在 /etc/mtab 中写入一笔资料。但在系统中没有可写入档案系统存在的情况下可以用这个选项取消这个动作。
-s-r：等于 -o ro
-w：等于 -o rw
-L：将含有特定标签的硬盘分割挂上。
-U：将档案分割序号为 的档案系统挂下。-L 和 -U 必须在/proc/partition 这种档案存在时才有意义。
-t：指定档案系统的型态，通常不必指定。mount 会自动选择正确的型态。
-o async：打开非同步模式，所有的档案读写动作都会用非同步模式执行。
-o sync：在同步模式下执行。
-o atime、-o noatime：当 atime 打开时，系统会在每次读取档案时更新档案的『上一次调用时间』。当我们使用 flash 档案系统时可能会选项把这个选项关闭以减少写入的次数。
-o auto、-o noauto：打开/关闭自动挂上模式。
-o defaults:使用预设的选项 rw, suid, dev, exec, auto, nouser, and async.
-o dev、-o nodev-o exec、-o noexec允许执行档被执行。
-o suid、-o nosuid：
允许执行档在 root 权限下执行。
-o user、-o nouser：使用者可以执行 mount/umount 的动作。
-o remount：将一个已经挂下的档案系统重新用不同的方式挂上。例如原先是唯读的系统，现在用可读写的模式重新挂上。
-o ro：用唯读模式挂上。
-o rw：用可读写模式挂上。
-o loop=：使用 loop 模式用来将一个档案当成硬盘分割挂上系统。

### ls

Linux ls命令用于显示指定工作目录下之内容（列出目前工作目录所含之文件及子目录)。

语法
 ls [-alrtAFR] [name...]
参数 :

-a 显示所有文件及目录 (ls内定将文件名或目录名称开头为"."的视为隐藏档，不会列出)
-l 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出
-r 将文件以相反次序显示(原定依英文字母次序)
-t 将文件依建立时间之先后次序列出
-A 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
-F 在列出的文件名称后加一符号；例如可执行档则加 "*", 目录则加 "/"
-R 若目录下有文件，则以下之文件亦皆依序列出

## 系统管理

### useradd

Linux useradd命令用于建立用户帐号。

useradd可用来建立用户帐号。帐号建好之后，再用passwd设定帐号的密码．而可用userdel删除帐号。使用useradd指令所建立的帐号，实际上是保存在/etc/passwd文本文件中。

语法
useradd [-mMnr][-c <备注>][-d <登入目录>][-e <有效期限>][-f <缓冲天数>][-g <群组>][-G <群组>][-s <shell>][-u <uid>][用户帐号]
或

useradd -D [-b][-e <有效期限>][-f <缓冲天数>][-g <群组>][-G <群组>][-s <shell>]
参数说明：

-c<备注> 　加上备注文字。备注文字会保存在passwd的备注栏位中。
-d<登入目录> 　指定用户登入时的启始目录。
-D 　变更预设值．
-e<有效期限> 　指定帐号的有效期限。
-f<缓冲天数> 　指定在密码过期后多少天即关闭该帐号。
-g<群组> 　指定用户所属的群组。
-G<群组> 　指定用户所属的附加群组。
-m 　自动建立用户的登入目录。
-M 　不要自动建立用户的登入目录。
-n 　取消建立以用户名称为名的群组．
-r 　建立系统帐号。
-s<shell>　 　指定用户登入后所使用的shell。
-u<uid> 　指定用户ID

### data

Linux date命令可以用来显示或设定系统的日期与时间，在显示方面，使用者可以设定欲显示的格式，格式设定为一个加号后接数个标记，其中可用的标记列表如下：

时间方面：

% : 印出 %
%n : 下一行
%t : 跳格
%H : 小时(00..23)
%I : 小时(01..12)
%k : 小时(0..23)
%l : 小时(1..12)
%M : 分钟(00..59)
%p : 显示本地 AM 或 PM
%r : 直接显示时间 (12 小时制，格式为 hh:mm:ss [AP]M)
%s : 从 1970 年 1 月 1 日 00:00:00 UTC 到目前为止的秒数
%S : 秒(00..61)
%T : 直接显示时间 (24 小时制)
%X : 相当于 %H:%M:%S
%Z : 显示时区
日期方面：

%a : 星期几 (Sun..Sat)
%A : 星期几 (Sunday..Saturday)
%b : 月份 (Jan..Dec)
%B : 月份 (January..December)
%c : 直接显示日期与时间
%d : 日 (01..31)
%D : 直接显示日期 (mm/dd/yy)
%h : 同 %b
%j : 一年中的第几天 (001..366)
%m : 月份 (01..12)
%U : 一年中的第几周 (00..53) (以 Sunday 为一周的第一天的情形)
%w : 一周中的第几天 (0..6)
%W : 一年中的第几周 (00..53) (以 Monday 为一周的第一天的情形)
%x : 直接显示日期 (mm/dd/yy)
%y : 年份的最后两位数字 (00.99)
%Y : 完整年份 (0000..9999)
若是不以加号作为开头，则表示要设定时间，而时间格式为 MMDDhhmm[[CC]YY][.ss]，其中 MM 为月份，DD 为日，hh 为小时，mm 为分钟，CC 为年份前两位数字，YY 为年份后两位数字，ss 为秒数。

使用权限：所有使用者。

当您不希望出现无意义的 0 时(比如说 1999/03/07)，则可以在标记中插入 - 符号，比如说 date '+%-H:%-M:%-S' 会把时分秒中无意义的 0 给去掉，像是原本的 08:09:04 会变为 8:9:4。另外，只有取得权限者(比如说 root)才能设定系统时间。

当您以 root 身分更改了系统时间之后，请记得以 clock -w 来将系统时间写入 CMOS 中，这样下次重新开机时系统时间才会持续抱持最新的正确值。

语法
date [-u] [-d datestr] [-s datestr] [--utc] [--universal] [--date=datestr] [--set=datestr] [--help] [--version] [+FORMAT] [MMDDhhmm[[CC]YY][.ss]]
参数说明：

-d datestr : 显示 datestr 中所设定的时间 (非系统时间)
--help : 显示辅助讯息
-s datestr : 将系统时间设为 datestr 中所设定的时间
-u : 显示目前的格林威治时间
--version : 显示版本编号

### ps

Linux ps命令用于显示当前进程 (process) 的状态。

语法
ps [options] [--help]
参数：

ps 的参数非常多, 在此仅列出几个常用的参数并大略介绍含义
-A 列出所有的行程
-w 显示加宽可以显示较多的资讯
-au 显示较详细的资讯
-aux 显示所有包含其他使用者的行程
au(x) 输出格式 :
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
USER: 行程拥有者
PID: pid
%CPU: 占用的 CPU 使用率
%MEM: 占用的记忆体使用率
VSZ: 占用的虚拟记忆体大小
RSS: 占用的记忆体大小
TTY: 终端的次要装置号码 (minor device number of tty)
STAT: 该行程的状态:
D: 不可中断的静止 (通悸□□缜b进行 I/O 动作)
R: 正在执行中
S: 静止状态
T: 暂停执行
Z: 不存在但暂时无法消除
W: 没有足够的记忆体分页可分配
<: 高优先序的行程
N: 低优先序的行程
L: 有记忆体分页分配并锁在记忆体内 (实时系统或捱A I/O)
START: 行程开始时间
TIME: 执行的时间
COMMAND:所执行的指令

### top

Linux top命令用于实时显示 process 的动态。

使用权限：所有使用者。

语法
top [-] [d delay] [q] [c] [S] [s] [i] [n] [b]
参数说明：

d : 改变显示的更新速度，或是在交谈式指令列( interactive command)按 s
q : 没有任何延迟的显示速度，如果使用者是有 superuser 的权限，则 top 将会以最高的优先序执行
c : 切换显示模式，共有两种模式，一是只显示执行档的名称，另一种是显示完整的路径与名称S : 累积模式，会将己完成或消失的子行程 ( dead child process ) 的 CPU time 累积起来
s : 安全模式，将交谈式指令取消, 避免潜在的危机
i : 不显示任何闲置 (idle) 或无用 (zombie) 的行程
n : 更新的次数，完成后将会退出 top
b : 批次档模式，搭配 "n" 参数一起使用，可以用来将 top 的结果输出到档案内

### pstree

Linux pstree命令将所有行程以树状图显示，树状图将会以 pid (如果有指定) 或是以 init 这个基本行程为根 (root)，如果有指定使用者 id，则树状图会只显示该使用者所拥有的行程。

使用权限：所有使用者。

语法
pstree [-a] [-c] [-h|-Hpid] [-l] [-n] [-p] [-u] [-G|-U] [pid|user]
或

pstree -V
参数说明：

-a 显示该行程的完整指令及参数, 如果是被记忆体置换出去的行程则会加上括号
-c 如果有重覆的行程名, 则分开列出（预设值是会在前面加上 *）

### reboot

Linux reboot命令用于用来重新启动计算机。

若系统的 runlevel 为 0 或 6 ，则重新开机，否则以 shutdown 指令（加上 -r 参数）来取代

语法
reboot [-n] [-w] [-d] [-f] [-i]
参数：

-n : 在重开机前不做将记忆体资料写回硬盘的动作
-w : 并不会真的重开机，只是把记录写到 /var/log/wtmp 档案里
-d : 不把记录写到 /var/log/wtmp 档案里（-n 这个参数包含了 -d）
-f : 强迫重开机，不呼叫 shutdown 这个指令
-i : 在重开机之前先把所有网络相关的装置先停止

### screen

Linux screen命令用于多重视窗管理程序。

screen为多重视窗管理程序。此处所谓的视窗，是指一个全屏幕的文字模式画面。通常只有在使用telnet登入主机或是使用老式的终端机时，才有可能用到screen程序。

语法
screen [-AmRvx -ls -wipe][-d <作业名称>][-h <行数>][-r <作业名称>][-s <shell>][-S <作业名称>]
参数说明：

-A 　将所有的视窗都调整为目前终端机的大小。
-d<作业名称> 　将指定的screen作业离线。
-h<行数> 　指定视窗的缓冲区行数。
-m 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。
-r<作业名称> 　恢复离线的screen作业。
-R 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。
-s<shell> 　指定建立新视窗时，所要执行的shell。
-S<作业名称> 　指定screen作业的名称。
-v 　显示版本信息。
-x 　恢复之前离线的screen作业。
-ls或--list 　显示目前所有的screen作业。
-wipe 　检查目前所有的screen作业，并删除已经无法使用的screen作业。

### shutdown

Linux shutdown命令可以用来进行关机程序，并且在关机以前传送讯息给所有使用者正在执行的程序，shutdown 也可以用来重开机。

使用权限：系统管理者。

语法
shutdown [-t seconds] [-rkhncfF] time [message]
参数说明：

-t seconds : 设定在几秒钟之后进行关机程序。
-k : 并不会真的关机，只是将警告讯息传送给所有使用者。
-r : 关机后重新开机。
-h : 关机后停机。
-n : 不采用正常程序来关机，用强迫的方式杀掉所有执行中的程序后自行关机。
-c : 取消目前已经进行中的关机动作。
-f : 关机时，不做 fcsk 动作(检查 Linux 档系统)。
-F : 关机时，强迫进行 fsck 动作。
time : 设定关机的时间。
message : 传送给所有使用者的警告讯息。

### swatch

Linux swatch命令用于系统监控程序。

swatch可用来监控系统记录文件，并在发现特定的事件时，执行指定的动作。swatch所监控的事件以及对应事件的动作都存放在swatch的配置文件中。预设的配置文件为拥护根目录下的.swatchrc。然而在Red Hat Linux的预设用户根目录下并没有.swatchrc配置文件，您可将/usr/doc/swatch-2.2/config_files/swatchrc.personal文件复制到用户根目录下的.swatchrc，然后修改.swatchrc所要监控的事件及执行的动作。

语法
swatch [-A <分隔字符>][-c <设置文件>][-f <记录文件>][-I <分隔字符>][-P <分隔字符>][-r <时间>][-t <记录文件>]
参数说明：

-A<分隔字符> 　预设配置文件中，动作的分隔字符，预设为逗号。
-c<设置文件> 　指定配置文件，而不使用预设的配置文件。
-f<记录文件> 　检查指定的记录文件，检查完毕后不会继续监控该记录文件。
-I<分隔字符> 　指定输入记录的分隔字符，预设为换行字符。
-P<分隔字符> 　指定配置文件中，事件的分隔字符，预设为逗号。
-r<时间> 　在指定的时间重新启动。
-t<记录文件> 　检查指定的记录文件，并且会监控加入记录文件中的后继记录。

### id

Linux id命令用于显示用户的ID，以及所属群组的ID。

id会显示用户以及所属群组的实际与有效ID。若两个ID相同，则仅显示实际ID。若仅指定用户名称，则显示目前用户的ID。

语法
id [-gGnru][--help][--version][用户名称]
参数说明：

-g或--group 　显示用户所属群组的ID。
-G或--groups 　显示用户所属附加群组的ID。
-n或--name 　显示用户，所属群组或附加群组的名称。
-r或--real 　显示实际ID。
-u或--user 　显示用户ID。
-help 　显示帮助。
-version 　显示版本信息。

### free

Linux free命令用于显示内存状态。

free指令会显示内存的使用情况，包括实体内存，虚拟的交换文件内存，共享内存区段，以及系统核心使用的缓冲区等。

语法
free [-bkmotV][-s <间隔秒数>]
参数说明：

-b 　以Byte为单位显示内存使用情况。
-k 　以KB为单位显示内存使用情况。
-m 　以MB为单位显示内存使用情况。
-o 　不显示缓冲区调节列。
-s<间隔秒数> 　持续观察内存使用状况。
-t 　显示内存总和列。
-V 　显示版本信息。

## 系统设置

### setup

Linux setup命令设置公用程序，是一个启动图形设置系统的命令。

setup 命令：用来配置X，打印设置，时区设置，系统服务，网络配置，配置，防火墙配置，验证配置，鼠标配置。

语法
setup
setup是一个设置公用程序，提供图形界面的操作方式。在setup中可设置7类的选项：

１.登陆认证方式
２.键盘组态设置
３.鼠标组态设置
４.开机时所要启动的系统服务
５.声卡组态设置
６.时区设置
７.X Windows组态设置