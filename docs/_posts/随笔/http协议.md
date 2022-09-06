---
title: http协议详解
date: 2020-12-20 21:19:11
tags: 
  - http
  - js
categories:
  - 随笔
permalink: /pages/4c1e50/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---

# 1. http概述
### 1.1 发展史以及概念
超文本传输协议（英语：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议[1]

<!-- more -->

![http](http1.jpg)

### 1.2 计算机网络体系结构分层
不同的硬件、操作系统之间的通信，所有的一切都需要一种规则，这种规则被称为 协议protocol， 而TCP/IP是互联网相关协议的各类协议族的总称
![](http2.jpg)

### 1.3 TCP/IP 通信传输流
利用 TCP/IP 协议族进行网络通信时，会通过分层顺序与对方进行通信。发送端从应用层往下走，接收端则从链路层往上走， 如下图
![](http3.jpg)
![](http4.jpg)

![](http5.jpg)
![](http6.jpg)
![](http7.jpg)
![](http8.jpg)


# 2. HTTP 协议报文结构
### 2.1 概念
1.HTTP 报文：
用于 HTTP 协议交互的信息被称为 HTTP 报文。请求端（客户端）的 HTTP 报文叫做请求报文；响应端（服务器端）的叫做响应报文。HTTP 报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文本。

2.HTTP 报文结构
HTTP 报文大致可分为报文首部和报文主体两部分。两者由最初出现的空行（CR+LF）来划分。通常，并不一定有报文主体。如图：

![](http9.jpg)

### 2.2 响应报文结构
![](http10.jpg)
![](http11.jpg)
![](http12.jpg)

# 3. HTTP 报文首部
### 3.1 首部字段结构
![](http13.jpg)
### 3.2 首部字段类型
![](http14.jpg)

### 3.3通用首部字段（HTTP/1.1）
![](http15.jpg)

### 3.4请求首部字段（HTTP/1.1）
![](http16.jpg)

### 3.5 响应首部字段（HTTP/1.1）
![](http17.jpg)

### 3.6 实体首部字段（HTTP/1.1）
![](http18.jpg)

### 3.7 其他首部字段
![](http19.jpg)

# 4. 响应状态码
### 4.1状态码类别
![](http20.jpg)


# 其他
![](http21.png)
![](http22.png)
![](http23.png)
![](http24.png)
![](http25.png)
![](http26.png)

### cookie
![](http27.png)
![](http28.png)
cookie格式如下：
Set-Cookie: "name=value;domain=.domain.com;path=/;expires=Sat, 11 Jun 2016 11:29:42 GMT;HttpOnly;secure"其中name=value是必选项，其它都是可选项。name:一个唯一确定的cookie名称。通常来讲cookie的名称是不区分大小写的。
value:存储在cookie中的字符串值。最好为cookie的name和value进行url编码
domain:cookie对于哪个域是有效的。所有向该域发送的请求中都会包含这个cookie信息。这个值可以包含子域(如：
yq.aliyun.com)，也可以不包含它(如：.aliyun.com，则对于aliyun.com的所有子域都有效).
path: 表示这个cookie影响到的路径，浏览器跟会根据这项配置，像指定域中匹配的路径发送cookie。
expires:失效时间，表示cookie何时应该被删除的时间戳(也就是，何时应该停止向服务器发送这个cookie)。如果不设置这个时间戳，浏览器会在页面关闭时即将删除所有cookie；
不过也可以自己设置删除时间。这个值是GMT时间格式，如果客户端和服务器端时间不一致，使用expires就会存在偏差。
max-age: 与expires作用相同，用来告诉浏览器此cookie多久过期（单位是秒），而不是一个固定的时间点。正常情况下，max-age的优先级高于expires。
HttpOnly: 告知浏览器不允许通过脚本document.cookie去更改这个值，同样这个值在document.cookie中也不可见。但在http请求张仍然会携带这个cookie。
注意这个值虽然在脚本中不可获取，但仍然在浏览器安装目录中以文件形式存在。这项设置通常在服务器端设置。
secure: 安全标志，指定后，只有在使用SSL链接时候才能发送到服务器，如果是http链接则不会传递该信息。
就算设置了secure 属性也并不代表他人不能看到你机器本地保存的 cookie 信息，所以不要把重要信息放cookie就对了服务器端设置

### DNS

DNS（Domain Name System）服务是和 HTTP协议一样位于应用层的协议，它提供域名到 IP 地址之间的解析服务

![](http29.png)

### HTTPS
超文本传输安全协议（英语：HyperText Transfer Protocol Secure，缩写：HTTPS；常称为HTTP over TLS、HTTP over SSL或HTTP Secure）是一种通过计算机网络进行安全通信的传输协议。HTTPS经由HTTP进行通信，但利用SSL/TLS来加密数据包。HTTPS开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。

### TCP

![](http30.png)
![](http31.png)
TCP(Transmission Control Protocol 传输控制协议)是一种面向连接(连接导向)的、可靠的、 基于IP的传输层协议。

![](http32.png)

### TCP/UDP
TCP/IP 中有两个具有代表性的传输层协议，分别是 TCP 和 UDP
![](http33.png)

UDP 为应用程序提供了一种无需建立连接就可以发送封装的 IP 数据包的方法,音频和多媒体应用，UDP是最好的选择
![](http34.png)
![](http35.png)

### WebSocket 
![](http36.png)


### QUIC协议
QUIC（Quick UDP Internet Connection）是谷歌制定的一种基于UDP的低时延的互联网传输层协议。在2016年11月国际互联网工程任务组(IETF)召开了第一次QUIC工作组会议，受到了业界的广泛关注。这也意味着QUIC开始了它的标准化过程，成为新一代传输层协议



QUIC（Quick UDP Internet Connections）协议,是一种全新的基于UDP的web开发协议; 
TCP + TLS + HTTP2 = UDP + QUIC + HTTP2’s API

从公式可看出：QUIC协议虽然是基于UDP，但它不但具有TCP的可靠性、拥塞控制、流量控制等，且在TCP协议的基础上做了一些改进，比如避免了队首阻塞；另外，QUIC协议具有TLS的安全传输特性，实现了TLS的保密功能，同时又使用更少的RTT建立安全的会话。



QUIC协议的主要目的:

是为了整合TCP协议的可靠性和UDP协议的速度和效率。

QUIC很好地解决了当今传输层和应用层面临的各种需求，包括处理更多的连接，安全性，和低延迟
![](http37.png)
![](http38.png)
虽然目前 QUIC 协议已经运行在一些较大的网站上，但离大范围普及还有较长的一段距离，期待 QUIC 协议规范能够成为终稿，并在除了谷歌浏览器之外的其他浏览器和应用服务器中也能够实现。

---

赞赞赞，本文资料收集和整理是我的同事，非常感谢，我贴出来希望可以帮助大家一起学习，进步。































