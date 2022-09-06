---
title: 如何在Javascript和Sass间共用变量
date: 2017-11-09 21:03:19
tags: 
  - sass
  - js
  - webpack
categories: 
  - 前端学习
permalink: /pages/6d750e/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---

随着大型单页应用程序的兴起，Javascript和CSS变得越来越交织在一起。通常情况下，在两者之间复制值。但是

保留两个相同值的方法，会导致有时更新只会有一个更新。使用wepack和css module有一种更好的办法；

第一步，安装依赖：
```
	npm install sass-loader node-sass webpack --save-dev
```

接下来配置webpack，以便我们可以从js访问sass代码：
```
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

下面是最有趣的部分，在sass中导出定义的变量，css module有个实用的工具 :export。工作原理和es6 export关键字基本相同

。你的sass代码就会导出包含变量名称的对象，可以在js中使用，这些值都作为字符串导出。

```
// styles/animation.scss
$animation-length: 250;
$animation-length-ms: $animation-length + 0ms;

:export {
  animationMillis: $animation-length-ms;
}

.component-enter {
  ...

  transition: all $animation-length-ms ease-in;
}
```

现在，在Javascript中，我们只需要从样式表中导入样式
```
// js/animation.js
import styles from '../styles/animation.scss'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const millis = parseInt(styles.animationMillis)

...

<CSSTransitionGroup
  transitionName="component"
  transitionEnterTimeout={millis}
  transitionLeaveTimeout={millis}
/>

...
```

