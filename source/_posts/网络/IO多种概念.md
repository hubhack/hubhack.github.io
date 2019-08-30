---
title: 理解IO

categories:
- 网络

tags:
- IO多路复用
---
# 重要概念

## 同步、异步
函数或方法被调用的时候，调用者是否得到**最终结果**的
- 直接得到最终结果的，就是同步调用
- 不直接得到最终结果的，就是异步调用

## 阻塞、非阻塞
函数或方法调用的时候，是否**立刻返回**
- 立即返回就是非阻塞调用
- 不立即返回就是阻塞调用

## 区别
同步、异步，与阻塞、非阻塞**不相关**
同步、异步强调的是，**是否得到（最终的）结果**
阻塞、非阻塞强调是时间，**是否等待**

同步与异步区别在于：调用者是否得到了想要的最终结果
同步就是一直要执行到返回最终结果
异步就是直接返回了，但是返回的不是最终结果。调用者不能通过这种调用得到结果，以后可以通过被调用者提供的某种方式（被调用着通知调用者、调用者反复查询、回调），来取回最终结果

阻塞与非阻塞的区别在于，调用者是否还能干其他事
阻塞，调用者就只能干等
非阻塞，调用者可以先去忙会别的，不用一直等

## 联系
同步阻塞，我啥事不干，就等你打饭打给我。打到饭是结果，而且我啥事不干一直等，同步加阻塞
同步非阻塞，我等着你打饭给我，但我可以玩会手机、看看电视。打饭是结果，但是我不一直等


异步阻塞，我要打饭，你说等叫号，并没有返回饭给我，我啥事不干，就干等着饭好了你叫我。例如，取了号什么不干就等叫自己的号
异步非阻塞，我要打饭，你给我号，你说等叫号，并没有返回饭给我，我在旁边看电视、玩手机，饭打好了叫我

# 操作系统知识
在386之前，CPU工作在**实模式**下，之后，开始支持**保护模式**，对内存进行了划分
X86 CPU有**4种**工作级别：
- Ring0级，可以执行特权指令，可以访问**所有级别**数据，可以访问IO设备等
- Ring3级，级别**最低**，只能访问本级别数据

**内核**代码运行在Ring0，**用户**代码运行在Ring3

现代操作系统采用虚拟存储器，理论上，对于32位系统来说，进程对虚拟内存地址的内存寻址空间为4G（2^32)
64位操作系统理论上最大内存寻址空间（2^64）
操作系统中，内核程序独立且运行在较高的特权级别上，它们驻留在被保护的内存空间上，拥有访问硬件设备的所有权限，这部分内存称为内核空间（内核态，最高地址1G）

普通应用程序运行在用户空间（用户态）

应用程序想访问某些硬件资源就需要通过操作系统提供的**系统调用**，系统调用可以使用特权指令运行在内核空间，此时进程陷入内核态运行。系统调用完成，进程将回到用户态执行用户空间代码
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618142656425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)

# 同步IO、异步IO、IO多路复用
## IO两个阶段
IO过程分两阶段：
1. 数据准备阶段
2. 内核空间复制回用户空间进程缓冲区阶段

发生IO的时候：
1. 内核从IO设备读、写数据（淘米，把米放饭锅里煮饭）
2. 进程从内核复制数据（盛饭，从内核这个饭锅里面把饭装到碗里来）

系统调用——read函数
## IO模型
### 同步IO
- 同步IO模型包括 阻塞IO、非阻塞IO、IO多路复用、信号驱动IO
#### 阻塞IO
- 进程等待（阻塞），直到读写完成。（全程等待）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618125038147.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618125055852.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
#### 非阻塞IO
进程调用read操作，如果IO设备没有准备好，立即返回ERROR，进程不阻塞。用户可以再次发起系统调用，如果内核已经准备好，就阻塞，然后复制数据到用户空间

- **第一阶段**数据没有准备好，就先忙别的，等会再来看看。检查数据是否准备好了的过程是**非阻塞的**
- **第二阶段**是**阻塞的**，即内核空间和用户空间之间复制数据是阻塞的

**例**：淘米、蒸饭我不等，我去玩会，盛饭过程我等着你装好饭，但是要等到盛好饭才算完事，这是同步的，结果就是盛好饭
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618125507742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618125519799.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
#### IO多路复用
所谓IO多路复用，就是**同时监控多个IO**，有一个准备好了，就不需要等了开始处理，提高了同时处理IO的能力

- `select`几乎所有操作系统平台都支持，`poll`是对的`select`的升级
- `epoll`，`Linux`系统内核2.5+开始支持，对`select`和`poll`的增强，在监视的基础上，增加**回调机制**。BSD、Mac平台有`kqueue`，Windows有`iocp`

**以`select`为例**
- 将关注的`IO操作`告诉`select函数`并调用，进程**阻塞**，内核“监视”`select`关注的文件描述符`fd`，被关注的任何一个fd对应的IO准备好了数据，`select`返回。再使用`read`将数据**复制**到**用户进程**

**select举例**
- 食堂供应很多菜（众多的IO），你需要吃某三菜一汤，大师傅（操作系统）说要现做，需要等，你只好等待大师傅叫。其中一样菜好了，大师傅叫你，说你点的菜有好的了，你得自己遍历找找看哪一样才好了，请服务员把做好的菜打给你
- `epoll`是有菜准备好了，大师傅喊你去几号窗口直接打菜，不用自己找菜了

一般情况下，`select`**最多能监听**`1024个fd`（可以修改，但不建议改），但是由于select采用轮询的方式，当管理的IO多了，**每次都要遍历全部fd，效率低下**
`epoll`没有管理的`fd`的上限，且是**回调机制，不需遍历，效率很高**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618125914993.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618130615746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
#### 信号驱动IO
进程在IO访问时，先通过`sigaction`系统调用，提交一个信号处理函数，立即返回。**进程不阻塞**
当内核准备好数据后，产生一个`SIGIO`信号并投递给信号处理函数。可以在此函数中调用`recvfrom`函数操作数据从内核空间复制到用户空间，这段过程进程阻塞
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019061814273937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
### 异步IO
- 进程**发起**异步IO请求，**立即返回**。内核完成IO的两个阶段，内核给进程发一个信号。

**举例**
- 来打饭，跟大师傅说饭好了叫你，饭菜准备好了，窗口服务员把饭盛好了打电话叫你。两阶段都是异步的。在整个过程中，进程都可以忙别的，等好了才过来。
- 今天不想出去到饭店吃饭了，点外卖，饭菜在饭店做好了（第一阶段），快递员从饭店送到你家门口（第二阶段）。

**Linux**的`aio`的系统调用，内核从`版本2.6`开始支持
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618131317375.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618131325740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190618142859539.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3B5dGhvbl9scXg=,size_16,color_FFFFFF,t_70)
- 前4个都是同步IO，因为核心操作recv函数调用时，进程阻塞直到拿到最终结果为止。
- 而异步IO进程全程不阻塞


