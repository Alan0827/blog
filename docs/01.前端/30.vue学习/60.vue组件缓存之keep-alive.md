---
title: vue组件缓存之keep-alive
date: 2019-11-09 21:27:36
tags: 
  - vue
  - js
categories:
  - 随笔
toc: true
permalink: /pages/9b8cd8/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---

# keep-alive

* keep-alive组件是vue的内置组件，被其包裹的组件会缓存下来，不活动的组件不会销毁，减少了很大的性能开销，它自身并不会渲染dom元素，也不会出现在父组件链中。

<!-- more -->

--------------------------------------------------
## 属性：
* include - 需要缓存的匹配的组件的name
* exclude - 不需要缓存的匹配的组件的name
* max - 做多可以缓存的组件实例num（2.5.0新增的）

--------------------------------------------------

## 用法：

>只需要把需要缓存的组件放在keep-alive中，或者include需要缓存的组件的name。
>注意：这里的name指的是vue组件中export default中的name，还有路由表里定义的name，两个name必须一样，才能准确的缓存到

```
<transition name="fade-transform" mode="out-in">
	<keep-alive :include="cachedViews">
		<router-view />
	</keep-alive>
</transition>

//include=cachedViews  这个是自己维护的需要缓存的组件name list   放在vuex的store中
<script>
export default {
	data(){
		return{}
	}
	computed: {
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		},
	},
}
</script>
```

--------------------------------------------------

### 路由
```
{
  path: '/my-project',
  component: Layout,
  redirect: '/my-project/project-list',
  name: 'Myproject',
  meta: { title: 'title', icon: 'icon' },
  children: [
    {
      path: 'project-list',
      name: 'ProjectList',   //说的就是这里的name
      component: () => import('@/views/my-project/project-list/index'),
      meta: { title: 'title' }
    },
	]
}
```

--------------------------------------------------
### project-list中index组件
```
<template>
	<div class="project-list">....</div>
</template>
<script>
export default {
	name:'ProjectList',   //这里的name
	data(){
		return{}
	}
}
</script>
```
> 【上述的两个name必须一致】(切记 name 命名时候尽量保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)

--------------------------------------------------
## 缓存不适合的场景

>有些场景是不太适合做缓存的，例如，详情页面，详情页面都是一个，/detail/1,/detial/2,都是共用一个组件，虽然路由不同，意味着他们的name是
>是一样的，就如前面提到的，keep-alive的 include 只能根据组件名来进行缓存，所以这样就出问题了。

* 解决方案，可以不用include，强制缓存所有组件，当然也是有弊端的，不能动态的删除缓存，只能设置一个最大缓存实例；
* 也可以使用浏览器的缓存方案替代，自己进行缓存（还在实践中）

--------------------------------------------------

## activated 和 deactivated 钩子 （2.2.0以上）

当你需要在不同的缓存组件切换显示的时候，需要做数据刷新的时候，你会发现 created,mounted 不起作用了，当然的，既然缓存了。这个时候，我们需要请求的时候就必须放在 activated 和 deactivated 生命周期中。
* 注：这两个钩子一定是要在使用了keep-alive之后才会有效果的，否则不存在。

使用了keep-alive，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。

事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中， activated 中的不管是否需要缓存多会执行。

--------------------------------------------------
>最后需要注意的是：
>keep-alive 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，keep-alive 要求同时只有一个子元素被渲染。

组件缓存的一些要点都在这里了，自己开发过程中确实经历了这些东西，这里记录下来，希望后来人不会入坑


有好的见解，欢迎留言，留下联系方式，大家互相沟通！

不喜勿喷，谢谢！
