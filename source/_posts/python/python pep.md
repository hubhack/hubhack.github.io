---
title: python pep
categories: 
- python
tags:
- python
---

### PEP

PEP是每一个Python程序员必须知道的。 PEP是Python Enhancement Proposals的缩写（Python增强提案）。一个PEP是一份为Python社区提供各种增强 功能的技术规格，也是提交新特性，以便让社区指出问题，精确化技术文档的提案。
每一个Python版本的新特性或变化都是将PEP提案通过社区决策层讨论、投票决议，通过后才有我们看到的功能变 化。
Guido van Rossum被戏称为"仁慈的独裁者"(benevolent dictator for life，BDFL)。他会亲自签署并确认每一份 PEP。但在2018年7月，由于PEP 572（Assignment Expressions）这个提案，他已经卸任BDFL。没有继任者，没 有管理原则，PEP路在何方？ 注：PEP 572影响到了几乎所有的Python用户，但相当多的人不认可 PEP 0  https://www.python.org/dev/peps/ PEP规范列表，PEP文档索引 PEP 1 -- PEP Purpose and Guidelines PEP协议指南
PEP 8 由Python之父等编写的Python 编码风格指导。被Python社区广泛采纳，标准库也按照这个规范编写。 https://www.python.org/dev/peps/pep-0008/ http://www.magedu.com/70951.html https://yq.aliyun.com/articles/626638 PEP 20 Python之禅
import this
Beautiful is better than ugly. # 优美胜于丑陋（Python以编写优美的代码为目标）
Explicit is better than implicit. # 明了胜于晦涩（优美的代码应当是明了的，命名规范，风格相似）
Simple is better than complex. # 简洁胜于复杂（优美的代码应当是简洁的，不要有复杂的内部实现）
Complex is better than complicated. # 复杂胜于凌乱（如果复杂不可避免，那代码间也不能有难懂的关系，要保持接口简洁）
Flat is better than nested. # 扁平胜于嵌套（优美的代码应当是扁平的，不能有太多的嵌套）
Sparse is better than dense. # 留白胜于紧凑（优美的代码有适当的空白，不要奢望一行代码解决问题）
  PEP 257 文档字符串的规范 https://www.python.org/dev/peps/pep-0257/ https://my.oschina.net/LuCastiel/blog/1552148
  PEP8016
Python社区治理方案，这是Python之父卸任BDFL之后，社区从几种方案中投票胜出的方案。 PEP 8016 治理方案采用指导委员会模式，其特点是引导治理的迭代，该方案由 Nathaniel J. Smith 和 Donald Stuﬀt 提出。 PEP 8016 中提出了不信任投票，也就是弹劾机制，可将任期内的当权者赶下台；它严格限定了在委员会里，只允 许少于 50% 的成员是企业（5 人委员会里最多有 2 个）；并且关注到核心开发者的选举/淘汰、如何更新治理提案 等问题。
而且，PEP 8016 中也提出了新的 PEP 流程，目前的 PEP 流程是提案人确定 PEP 的选题方向，提案人负责收集与 整合来自整个社区的反馈。然后，相关领域的专家们汇总全部讨论，并开启为期 14 天的审查，之后进行社区投 票。如果一个 PEP 很有争议，任何专家成员都可发起动议来拒绝通过它，这需要超过 2/3 的票数。
Readability counts. # 可读性很重要（优美的代码是可读的）

Special cases aren't special enough to break the rules. Although practicality beats purity. # 即便假借特例的实用性之名，也不可违背这些规则（这些规则至高无上）

Errors should never pass silently. Unless explicitly silenced. # 不要包容所有错误，除非你确定需要这样做（精准地捕获异常，不写except:pass风格的代码）

In the face of ambiguity, refuse the temptation to guess. # 当存在多种可能，不要尝试去猜测

There should be one-- and preferably only one --obvious way to do it. # 而是尽量找一种，最好是唯一一种明显的解决方案（如果不确定，就用穷举法）

Although that way may not be obvious at first unless you're Dutch. # 虽然这并不容易，因为你不是 Python 之父（这里的Dutch是指Guido）

Now is better than never. Although never is often better than *right* now. # 做也许好过不做，但不假思索就动手还不如不做（动手之前要细思量）

If the implementation is hard to explain, it's a bad idea. If the implementation is easy to explain, it may be a good idea. # 如果你无法向人描述你的方案，那肯定不是一个好方案；反之亦然（方案测评标准）

Namespaces are one honking great idea -- let's do more of those! # 命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）
PEP 8016 的 PEP 流程：指导委员会在必要时可直接地批准/否决 PEP，但最好是设置流程来避免这样做决策，例 如，将决策权委派给团队或者 BDFL 代表。 2019年2月4日，为期2周的投票后，Python社区选出来了指导委员会的5名成员。
5 人分别是： Barry Warsaw：自1995年起成为核心开发者之一，荣获 2014 年的弗兰克·威利森纪念奖。目前供职于 LinkedIn（已被微软收购，也即供职于微软），业余爱好是音乐和太极。 Brett Cannon：自2003年起成为核心开发者之一，荣获 2016 年的弗兰克·威利森纪念奖。曾担任 Python 软 件基金会的执行副主席。目前供职于微软，负责 VSCode 的 Python 插件项目。 Carol Willing：Python 核心开发者，Jupyter 核心开发者及 Jupyter 的指导委员会成员。自由职业，兴趣在于 科研及教育项目。 Guido van Rossum：Python 的创始人，被称为“Python 之父”，长期领导 Python 社区的发展，直到此次的 退位风波。目前供职于 Dropbox。 Nick Coghlan：自2005年起成为核心开发者之一。目前供职于 Tritium