---
title: vmware
categories: 
- linux
tags:
- linux
---


# 新手如何安装及配置虚拟机及远程管理软件  
## &ensp;&ensp;&ensp;&ensp;**VMware Workstation Pro & Xshell**  
1. 下载并安装**VMware Workstation Pro**及**Xshell**。  
2. 访问[mirrors.163.com](http://mirrors.163.com/)，下载镜像**centos**。登陆后找到镜像名**centos/**，点击后下载最新版（[如7系版本](http://mirrors.163.com/centos/7/isos/x86_64/)）(CentOS-7-x86_64-Everything-1810.iso) 。
3. 打开**VMware Workstation Pro**软件，需要输入密钥，可在某度寻找。
4. 如何新建虚拟机，步骤如下：
> &ensp;&ensp;&ensp;&ensp;点击创建新的虚拟机，选择‘ 典型 ’；  
&ensp;&ensp;&ensp;&ensp;安装来源选择‘ 稍后安装操作系统 ’；  
&ensp;&ensp;&ensp;&ensp;客户机操作系统选择**Linux**，版本选择**CentOS 7 64位**； 
&ensp;&ensp;&ensp;&ensp;保存位置建议为**固态硬盘**；  
&ensp;&ensp;&ensp;&ensp;磁盘大小设置为200G，选择“将虚拟磁盘储存为单个文件”，完成。
5. 双击**设备**下任意处，1弹出的对话窗口中设置如下：
> &ensp;&ensp;&ensp;&ensp;内存设置为2048MB；  
> &ensp;&ensp;&ensp;&ensp;处理器数量为2；  
> &ensp;&ensp;&ensp;&ensp;CD/DVD(IDE) 连接方式为**使用ISO映像文件**，选择刚才下载的镜像文件装入即可；  
> &ensp;&ensp;&ensp;&ensp;网络适配器设置为仅主机模式。
6. 单机菜单栏**绿色三角形**，启动虚拟机(Ctrl+Alt+enter为切换窗口大小)  
```
注：第一选项为安装，第二项为测试media并安装，第三项为修复(默认选择第二项)。
```
7. 测试完毕后，选择如下
> &ensp;&ensp;&ensp;&ensp;语言选择默认**English**，点击右下角**Continue**；  
> &ensp;&ensp;&ensp;&ensp;**DATE&TIME** 设置为上海（可直接在地图上选择位置），左下角时间修改为当前北京时间；  
> &ensp;&ensp;&ensp;&ensp;**KEYBOARD** 键盘默认为美国键盘，无需修改；  
> &ensp;&ensp;&ensp;&ensp;**INSTALLATION SOURCE** 默认为光盘安装，无需修改；  
> &ensp;&ensp;&ensp;&ensp;**SOFTWARE SELECTION**，选择如何安装，装什么软件。工作中默认为最小安装，初学者选择**GNOME Desktop**(图形界面)；  
> &ensp;&ensp;&ensp;&ensp;**INSTALLATION DESTINATION**安装目标即为分区，点击选择**I will configure partitioning**（我将自己安装分区)，点击**Done**；  
> &ensp;&ensp;&ensp;&ensp; 弹出的界面默认为**LVM**逻辑卷，更改为**Standard Partition**标准分区，点击添加“+”。

* 选择**Mount Point**挂载点为 **/boot**，大小为1G；  
* 添加根 '**/**'，大小为100G；  
* 添加‘**/data**’，因为data不属于操作系统自带的文件夹，所以需要手写添加。创建data的目的是为了后续方便存放临时文件，大小为50G；  
* 添加 **/swap**，大小为4G，物理内存的两倍大小。**注**：swap的**Mount Point**挂载点为灰色，因为swap是模拟内存用的，不为文件夹，此**File System**文件系统为专有的swap。
> &ensp;&ensp;&ensp;&ensp;点击**Done**，选择**Accept changes**接受上列的更改。  
> &ensp;&ensp;&ensp;&ensp;**NETWORK & HOST NAME**网络，设置**Host name**主机名，**Ethernet(ens33)**网卡如果为**Dissonnected**，需要点击右边按钮打开网卡。显示后的IP地址可以从**windows**中ping通（从windows中打开cmd,输入ping *(*为IP地址)，出现来自 ** 的回复 **，即为连通。  
> &ensp;&ensp;&ensp;&ensp;点击 **Begin installation**，弹出的选项中需要设置 **ROOT PASSWORD**系统管理员账户，设置 **USER CREATION**普通用户。安装完毕后，设置 **LICENSING**许可，点击 **I accept the license agreement**。安装完毕。
8. 备份系统，两种方法
* 右击当前窗口任务栏，选择快照，拍摄快照。备份完成。
* 右击当前窗口任务栏，选择设置，点击选项，将右侧的工作目录文件夹直接复制一份至其他磁盘（复制前如文件中有临时文件，需先关闭当前虚拟机任务）。备份完成。  
9. 重启虚拟机。点击打开虚拟机，找到刚才存放VMX的文件夹，点击任务栏的**绿色小三角** ，登陆后设置初始化。设置语言、键盘、定位（建议关闭）、在线用户（没有可忽略）。  
10. 如何打开**Terminal**敲命令，执行操作的窗口，简称终端。点击**Applications--System Tools--Terminal**，完成。

* 注：`[wang@centos7 -]$ `，**wang**指用户名，**centos7**指主机最前部分名称，  - 指存放的文件夹位置，但是**CentOS**系统默认显示的‘ - ’为**wang@centos7**的**home**目录。只要为home，都会以‘ - ’显示，提示符‘$’为普通用户。
11. 查看当前网卡是否连接通，输入 `ip a`回车,如果ens33未显示IP地址，则未通。
12. 输入 `nmcli connection up ens33` , 即可在ens33下查看到IP地址。

13. 打开**Xshell**，点击左上角的+，输入名称（可直接设置为IP地址，方便查看），主机IP地址（刚才查询到的IP地址）
14. 点击**用户身份验证**，用户名为“**root**"，密码为之前**CentOS**设置的密码，点击确定，点击链接，选择**接受并保存**。
15. **root**链接的提示符‘#’为管理员意思。

## &ensp;&ensp;&ensp;&ensp;以上为安装及配置虚拟机及远程管理软件详细过程，仅供参考；如有错误之处，欢迎批评指正，谢谢！
