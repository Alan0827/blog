---
title: js事件模型
date: 2017-07-26 15:35:11
tags: 
  - js
categories:
  - 随笔
permalink: /pages/3136d8/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---

#### 事件模型以及周边

* 事件捕获

* 事件冒泡

* 事件触发

* 移动端事件模拟

* 事件委托


<!-- more -->

#### 事件捕获&事件冒泡

    <div class="out">
        <p class="inner"></p>
    </div>

>给inner,out均绑定点击事件.点击inner,如果out先执行,inner后执行.则是事件捕获.若inner先执行.out后执行则是事件冒泡.(这两种模型来自于早期浏览器之争)

W3C模型

>先事件捕获,到达目标后再进行冒泡

示例演示

    out.addEventListener('click', (e) => {
        console.log('out clicked! ')
    }, true)
    inner.addEventListener('click', (e) => {
        console.log('inner clicked! ')
    }, false)
    document.addEventListener('click', (e) => {
        console.log('document clicked! ')
    }, true)

点击inner后,执行顺序:document clicked => out clicked => inner clicked

    out.addEventListener('click', (e) => {
        console.log('out clicked! ')
    }, true)
    inner.addEventListener('click', (e) => {
        console.log('inner clicked! ')
    }, false)
    document.addEventListener('click', (e) => {
        console.log('document clicked! ')
    }, false)

点击inner后,执行顺序: out clicked => inner clicked => document clicked


#### 事件模型

1.DOM0级事件(默认发生在冒泡阶段.只能绑定一个事件)

事件绑定

    ele.onclick = function (){
        //
    }

事件解除绑定
    
    ele.onclick = null;

2.DOM2级事件(默认发生在冒泡阶段,由第三个参数决定,可绑定多个事件)

事件绑定

    ele.addEventListener(eventType, handler, useCapture)//eventType不带on,如click
    //IE下用attachEvent
    ele.attachEvent(eventType, handler);

事件解除绑定

    ele.removeEventListener(eventType, handler, useCapture)
    //IE下使用detachEvent
    ele.detachEvent(eventType, handler);

#### 事件对象

DOM事件模型中的事件对象常用属性:

* type用于获取事件类型

* target获取事件目标

* stopPropagation()阻止事件冒泡

* preventDefault()阻止事件默认行为


IE事件模型中的事件对象常用属性:

* srcElement获取事件目标

* cancelBubble阻止事件冒泡

* returnValue阻止事件默认行为


兼容处理

    var eventUtil = {
        addEvent: function(ele, event, func, bool) {
            bool = bool || false;
            if (ele.addEventListener) {
                ele.addEventListener(event, func, bool)
            } else {
                ele.attachEvent('on' + event, func, bool);
            }
        },
        removeEvent: function(ele, event, func, bool) {
            bool = bool || false;
            if (ele.removeEventListener) {
                ele.removeEventListener(event, func, bool);
            } else {
                ele.detachEvent('on' + event, func, bool);
            }
        },
        getEvent: function(event) {
            return event || window.event;
        },
        getTarget: function(event) {
            return event.target || event.srcElement;
        },
        preventDefault:function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }else {
                event.returnValue = false;//IE
            }
        },
        stopPropagation:function  (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;//IE
            }
        }
    };

#### 移动端事件

Touch事件

    touchstart:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
    touchmove:当手指在屏幕上滑动时连续的触发。在这个事件发生期间，调用preventDefault()可阻止滚动


touchend:当手指从屏幕上移开时触发。
touchcancel:当系统停止跟踪触摸时触发。关于此事件的确切触发事件，文档中没有明确说明。
以上事件的event对象上面都存在如下属性：
touches:表示当前跟踪的触摸操作的Touch对象的数组。
targetTouches:特定于事件目标的Touch对象的数组。
changeTouches:表示自上次触摸以来发生了什么改变的Touch对象的数组。

每个Touch对象包含下列属性：
identifier：表示触摸的唯一ID。

clientX:触摸目标在视口中的X坐标。
clientY:触摸目标在视口中的Y坐标。
pageX：触摸目标在页面中的x坐标。
pageY：触摸目标在页面中的y坐标。
screenX:触摸目标在屏幕中的x坐标。
screenY:触摸目标在屏幕中的y坐标。
target:触摸的DOM节点坐标

触发过程

    touchstart =>touchmove =>touchend =>click(延迟300~200ms)

    Tap事件封装原理:利用touchstart =>touchmove =>touchen模拟click

    HTMLElement.prototype.tap = function (handler,interval) {
        that = this
        this.isMove = false,
        this.startTime = 0,
        this.addEventListener('touchstart',function(e){
                startTime = Date.now();
            }),
        this.addEventListener('touchmove',function(e){
                isMove = true;
            }),
        this.addEventListener('touchend',function(e){
                if(!this.isMove && (Date.now()-startTime) < interval){
                    handler();
                }
                this.isMove = false;
                this.startTime = 0;
            })
    };

事件委托

把本应绑定在自身的事件绑定到其他元素上来触发即事件委托

    //HTML
    <ul id="ul">
        <li>a</li>
        <li>b</li>
    </ul>

    //JS
        var oUl = document.getElementById("ul");
        oUl.onmouseover = function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if((/l\i/i).test(target.nodeName)){
            target.style.background = "red";
            }
        }
        oUl.onmouseout = function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if((/l\i/i).test(target.nodeName)){
                target.style.background = "";
            }
        }
    //JS



感谢源著作者   https://segmentfault.com/a/1190000008774838