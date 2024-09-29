---
title: 如何运用hexo搭建自己的Github Pages
date: 2016-02-08 20:45:27
titleTag: 原创
tags: 
  - 其他
categories:
  - 随笔
permalink: /pages/8595eb/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---



# 1.安装Node.js

Node.js是一个基于Chrome V8引擎的JavaScript运行环境。Node.js使用了一个事件驱动、非阻塞式I/O的模型，使其轻量又高效。Node.js的包管理器npm，是全球最大的开源库生态系统。
访问Node.js的官方网站：[https://nodejs.org/en/](https://nodejs.org/en/)

<!-- more -->

这部分自行安装

<!-- > This is a blockquote. -->
<!-- This is an [example link](http://example.com/). -->

<!-- ![node](./hexo/nodejs.png) -->

### 验证是否安装成功

>1) 运行命令行，输入”node -v”命令。如果出现以下提示，说明”node”命令可以正常使用。
>2) 运行命令行，输入”npm -v ”命令。如果出现以下提示，说明”npm”命令可以正常使用。


<!-- ![node](./hexo/微信图片_20180208111010.png) -->


# 2.安装git

Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

#### 1)访问Git的官方网站：[http://git-scm.com/downloads](http://git-scm.com/downloads) (下载安装包安装教程自行度娘)

![node](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/20180208110557.49kv9sm1t620.webp)


#### 2)npm包管理器安装
> 运行命令 **npm i -g git**  全局安装git


安装完成后，git version 验证git版本信息即可，如下：
![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208111003.1n2u75u5nfuo.webp)


# 3.安装Hexo

### 打开命令行，在命令行中输入以下命令: 

 ``运行命令 npm i -g hexo-cli 全局安装hexo,安装完成后运行 hexo -v 如下``

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208135149.1yzuh3ill5pc.webp)


 # 4.本地搭建hexo博客

 1）打开命令行，输入以下命令，用于创建Hexo博客目录。

``$ hexo init hexoProject``

2）在命令行中，进入到刚创建的目录中。

``$ cd hexoProject``

3）在命令行中，执行以下命令，开始初始化Hexo博客程序。

``$ npm i``

4）初始化完毕后，可以在命令行中输入以下命令，启动本地Hexo博客程序。

``$ hexo server``

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208140549.693engdaguo0.webp)

5)打开浏览器，访问 http://localhost:4000 就可以访问本地的Hexo博客程序了。

# 5.发布博客到GitHub

1）访问GitHub的官方网站：[https://github.com](https://github.com) ,并且已经有GitHub账号，登录进去

2）登录后，点击页面右上角的”+”号。在弹出的菜单中，选择【New repository】选项。

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208141343.4qx88ogs4kk0.webp)


>Create a new repository 页面的话工程名必须是 **你的用户名.github.io** ,也就是如下图所示，前面箭头指的，初始化README勾选上，然后点击创建即可完成

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208145147.1mfi3qv98k5c.webp)

> 然后点击 Setting 往下拉，看到 **GitHub Pages** ，选择master branch，save之后上方就会出现你本项目的GitHub Pages的地址了

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208145325.677yj1t88640.webp)

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208145601.4rtpzrjcngu0.webp)


 ## 配置Hexo程序

 1）进入Hexo的安装目录，打开_config.yml配置文件。

 ```
 # Site
title: 网站名称
subtitle: 网站简介
description:
author: 作者
language:
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: 网站域名
root: /
permalink: :category/:title.html
permalink_defaults:

...

# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: GitHub新建工程的地址（例如https://github.com/XXX/XXX.github.io.git）
  branch: master
 ```

>特别注意 **deploy** 配置，后续发布到GitHub全靠此配置

2）在项目中安装Hexo的Git插件（如果不安装这个插件，会导致Hexo博客内容无法发布）。

  运行命令 ``npm i hexo-deployer-git --save``

## 发布Hexo到GitHub

1)在Hexo的安装目录中，鼠标右键选择”Git Bash Here”选项。

2)在Git命令行中，输入以下命令。

```
//生成本地的目录结构
hexo generate 

// 将hexo本地目录上传至GitCafe
hexo deploy
```
 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208144517.j08ql05r2z4.webp)


hexo deploy 之后就可以直接访问之前的GitHub pages的地址了  

 ![](https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/hexo/微信图片_20180208145601.4rtpzrjcngu0.webp)


>*更多详细内容，可以访问Hexo的官网查看*




