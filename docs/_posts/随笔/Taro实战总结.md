---
title: Taro实战总结
date: 2019-08-28 11:03:19
tags: 
  - react
  - Taro
  - 小程序
categories:
  - 随笔
permalink: /pages/4846b9/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---

好久没有总结一下了。。。。蛋疼，有时候想写，不知道该写什么。最近工作闲暇之余，撸了一下京东凹凸实验室的Taro；
感觉学习越多，越感觉自己是个菜鸟了，呵呵；听说Taro有一段时间了，一直没有机会过一遍，这次抽时间搞了一回；

<!-- more -->

### Taro简介
根据官网所说，**Taro是一套遵循 React 语法规范的 多端开发 解决方案。** 目的就是**一套代码，多端通用**。
Taro主要是通过遵循react的语法规范，它采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，同时支持使用 JSX 语法，让代码具有更丰富的表现力，使用 Taro 进行开发可以获得和 React 一致的开发体验。
是不是很爽，react框架不陌生吧，虽然我只是做了两个小项目而已，不得感叹react的强大，react不懂的自行去学习一下，[https://zh-hans.reactjs.org/](https://zh-hans.reactjs.org/)

### 环境搭建
首先，你需要使用 npm 或者 yarn 全局安装@tarojs/cli，或者直接使用npx:
	```
		# 使用 npm 安装 CLI
		npm install -g @tarojs/cli
		# OR 使用 yarn 安装 CLI
		yarn global add @tarojs/cli
		# OR 安装了 cnpm，使用 cnpm 安装 CLI
		cnpm install -g @tarojs/cli
	```
注：个人不建议用cnpm，后续会有包丢失的情况。

#### 使用
```
	taro init myApp
	//依赖初始化的时候已经装好了，后续需要什么自己 再安装就是了。
```
Taro各端的开发，部署命令
```
	//打包
	"build:weapp": "taro build --type weapp",
	"build:swan": "taro build --type swan",
	"build:alipay": "taro build --type alipay",
	"build:tt": "taro build --type tt",
	"build:h5": "taro build --type h5",
	"build:rn": "taro build --type rn",
	"build:qq": "taro build --type qq",
	"build:quickapp": "taro build --type quickapp",
	//开发
	"dev:weapp": "npm run build:weapp -- --watch",
	"dev:swan": "npm run build:swan -- --watch",
	"dev:alipay": "npm run build:alipay -- --watch",
	"dev:tt": "npm run build:tt -- --watch",
	"dev:h5": "npm run build:h5 -- --watch",
	"dev:rn": "npm run build:rn -- --watch",
	"dev:qq": "npm run build:qq -- --watch",
	"dev:quickapp": "npm run build:quickapp -- --watch"
```
#### 注意事项
开发注意事项的话，就不细说了，每个框架都有自己的使用规范，谁让你要用呢？自己遵守罗。。。
自己可以到官网上面看 [https://nervjs.github.io/taro/docs/before-dev-remind.html](https://nervjs.github.io/taro/docs/before-dev-remind.html)

Taro 主要是立足微信小程序开发的，所以，大多数的组件库，api和微信原生小程序用法相同；
但是小程序原生框架不是特别友好，Taro做了很多的优化。

### 目录结构
我的开发主要是用在h5和微信小程序端，别的端不做兼容考虑处理。
```
	├── config                 配置目录
	|   ├── dev.js             开发时配置
	|   ├── index.js           默认配置
	|   └── prod.js            打包时配置
	├── src                    源码目录
	|   ├── components         公共组件目录
	|   ├── pages              页面文件目录
	|   |   ├── index          index 页面目录
	|   |   |   ├── banner     页面 index 私有组件
	|   |   |   ├── index.js   index 页面逻辑
	|   |   |   └── index.scss  index 页面样式
	|   ├── utils              公共方法库
	|   ├── app.scss            项目总通用样式
	|   └── app.js             项目入口文件
	└── package.json
	└── project.config.json    微信小程序配置文件
```
大致的目录结构如上，我们要在pages目录下面新建页面开发就行。

入口文件app.js，app.scss可以写全局样式。
```
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

	config = {
		pages: [
			'pages/index/index',
			'pages/upload/upload',
			'pages/edit/edit',
			'pages/login/login',
		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#0090F7',
			navigationBarTitleText: '岁月不弃',
			navigationBarTextStyle: 'white'
		}
	}

	componentDidMount () {}

	componentDidShow () {}

	componentDidHide () {}

	componentDidCatchError () {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render () {
		return (
			<Index />
		)
	}
}

Taro.render(<App />, document.getElementById('app'))
```
注：我的项目用的是taro-ui作为ui框架，自行安装即可。。。
但是，taro-ui安装的时候会出现很多问题，有时候半天安装没有反应，或者就直接失败，出现这种情况的话，可以把node_modules目录先干掉，然后重新安装，就好了。
	
project.config.json 文件为微信小程序配置文件
```
	{
		"miniprogramRoot": "dist/",
		"projectname": "taro-app",
		"description": "a app",
		"appid": "",
		"setting": {
			"urlCheck": true,
			"es6": false,
			"postcss": false,
			"minified": false
		},
		"compileType": "miniprogram",
		"simulatorType": "wechat",
		"simulatorPluginLibVersion": {},
		"condition": {}
	}
```
	
路由配置：
	Taro路由不需要自己再配置，我们只需要在入口文件app.js的 config 配置中指定好 pages，然后就可以在代码中通过 Taro 提供的 API 来跳转到目的页面
	Taro的路由跳转api
```	
	// 跳转到目的页面，打开新页面
	Taro.navigateTo({
		url: '/pages/page/path/name'
	})
	
	// 跳转到目的页面，在当前页面打开
	Taro.redirectTo({
		url: '/pages/page/path/name'
	})
	
	Taro.navigateBack({
		delta:1   //向前返回级数
	})
```
		
以上就是Taro的一些基本知识，接下来，我开始做自己的项目；
--------------------------------------------------
### 我的项目
主要是一个图片为主的项目，包括几个模块：
* 首页
* 图片描述编辑，删除页
* 登录页面
* 上传图片页面

首页代码
```
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { AtIcon } from 'taro-ui'
import { query } from '../../api/my-api'
import msgList from "../../utils/message";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '岁月不弃'
  }
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      canLoad: false,
      total:0,
    }
  }

  componentWillMount() { }

  // onPageScroll (e) {
  //   this.pageScrollFn(e.scrollTop)
  // }

  // 小程序页面触底时执行
  onReachBottom() {
    this.getList()
  }

  pageScrollFn() {
    //真实内容的高度
    var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    //视窗的高度
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    //隐藏的高度
    var scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
    if (pageHeight - viewportHeight - scrollHeight < 10 && this.state.canLoad) {//如果满足触发条件，执行
      this.getList()
    }
  }
  componentDidMount() {
    this.getList()
    if (process.env.TARO_ENV === 'h5') {
      window.addEventListener('scroll', this.pageScrollFn())
    }

  }

  componentWillUnmount() {
    if (process.env.TARO_ENV === 'h5') {
      window.removeEventListener('scroll', () => { })
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  //获取列表
  getList() {
    Taro.showLoading({
      title: '加载中。。。'
    })
    let {total,pageNum} = this.state
    if (this.state.pageNum <= parseInt(total / 10) + 1) {
      this.setState({
        canLoad:true,
      })
    } else {
      this.setState({
        canLoad:false
      })
      Taro.hideLoading();
      return false;
    }

    query({ pageNum: pageNum }).then(response => {
      let res = response.data
      let { list } = this.state
      list = [...list, ...res.data.list]
      total = res.data.total;
      Taro.hideLoading();
      this.setState({
        list: list,
        pageNum: pageNum+1,
        total:total
      })

    })
  }

  random() {
    let l = msgList.length;
    let num = Math.floor(Math.random() * l);
    return msgList[num];
  }
  //渲染消息
  getMsg(subItem) {
    if (subItem.description !== "undefined" && subItem.description != "" && subItem.description != null) {
      return subItem.description;
    } else {
      return this.random();
    }
  }
  //预览图片
  preview(list, index) {
    let imgs = [];
    list.map(x => imgs.push(x.imgUrl));
    Taro.previewImage({
      urls: imgs,
      current: imgs[index]
    })
  }
  goTop() {
    if (process.env.TARO_ENV === 'h5') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
    if (process.env.TARO_ENV === 'weapp') {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }

  }
  //编辑信息
  editMessage(id) {
    Taro.navigateTo({
      url: '/pages/edit/edit?imgId=' + id
    })
  }

  goUpload() {
    Taro.navigateTo({
      url: '/pages/upload/upload'
    })
  }



  render() {
    const { list } = this.state;
    const mainContent = list.map((x, i) => {
      return (
        <View className='list-item' taroKey={String(i)}>
          <View className='date'>{x.date}</View>
          {
            x.imgList.map((y, j) => {
              return (
                <View className='img-item' taroKey={String(i)}>
                  <Image className='img' mode='widthFix' src={y.imgUrl} onClick={this.preview.bind(this, x.imgList, j)} />
                  <Text className='des' onClick={this.editMessage.bind(this, y.imgId)}>{this.getMsg(y)}</Text>
                </View>
              )
            })
          }
        </View>
      )
    })
    return (
      <View
        className='home'
      >
        <View className='btns'>
          <AtIcon onClick={this.goUpload.bind(this)} value='image' size='30' color='#08aaea'></AtIcon>
          <AtIcon onClick={this.goTop.bind(this)} value='chevron-up' size='30' color='#08aaea'></AtIcon>
        </View>
        {mainContent}
        {
          !this.state.canLoad &&
          <View className='noMore'>没有更多了。。。</View>
        }
        {
          this.state.canLoad &&
          <View className='noMore'>加载中。。。</View>
        }
      </View >
    )
  }
}

```
这里涉及到一个滚动加载，需要区分h5和weapp环境来做滚动加载，因为在weapp中没有办法绑定滚动时间监听，用weapp的钩子onReachBottom（）
触底之后我们再做接口请求。注意react事件监听绑定到this。

编辑页面代码
```
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './edit.scss'
import { AtButton, AtTextarea } from 'taro-ui'
import { editMessage, deleteImg } from '../../api/my-api'

export default class Edit extends Component {
  config = {
    navigationBarTitleText: '编辑'
  }
  constructor(props) {
    super(props)
    this.state = {
      imgId: ''
    }
  }

  componentWillMount() {
    let id = this.$router.params.imgId
    this.setState({
      imgId: id,
      message: ''
    })
  }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  submit() {
    Taro.showLoading({
      title: '保存中。。。'
    })
    editMessage({
      message: this.state.message,
      imgId: this.state.imgId
    }).then((res) => {
      if (res.data.code == 0) {
        Taro.showToast({
          title: '更新成功！'
        })
        Taro.redirectTo({
          url: '/pages/index/index'
        })
      }
    })
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  goBack() {
    Taro.navigateBack({
      delta: 1
    })
  }

  delImg() {
    Taro.showModal({
      title: '删除图片',
      content: '是否确认删除？',
    })
      .then(res => {
        if (res.confirm) {
          deleteImg({
            imgId:this.state.imgId
          }).then(response=>{
            if(response.data.code==0){
              Taro.showToast({
                title:'删除成功！'
              })
              setTimeout(()=>{
                Taro.redirectTo({
                  url: '/pages/index/index'
                })
              },2000)
            }
          })
        }
      })

  }

  render() {
    return (
      <View className='edit'>
        <View className='title'>请输入</View>
        <AtTextarea
          value={this.state.message}
          maxLength={200}
          placeholder='描述信息...'
          height='300px'
          onChange={this.handleChange.bind(this)}
        >
        </AtTextarea>
        <View className='btns'>
          <AtButton onClick={this.goBack.bind(this)}>取消</AtButton>
          <AtButton onClick={this.delImg.bind(this)}>删除</AtButton>
          <AtButton onClick={this.submit.bind(this)} type='primary'>确定</AtButton>
        </View>
      </View>
    )
  }
}
```
编辑页面主要是编辑图片描述性的文字，以及删除当前的图片，没有过多注意事项。每个页面可以单独配置config。

登录页面
```
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './login.scss'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { login } from '../../api/my-api'

import md5 from 'md5'


export default class Upload extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userPwd: ''
    }
  }

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleChangeName(v) {
    this.setState({
      userName: v
    })
  }
  handleChangePwd(v) {
    this.setState({
      userPwd: v
    })
  }
  onSubmit() { 
    if(!this.state.userName || !this.state.userPwd){
      Taro.showToast({
        title:'请输入正确的用户名和密码~',
        icon:'none'
      })
      return false;
    } 
    Taro.showLoading({
      title:'登录中',
    })
    login({
      userName: this.state.userName.trim(),
      userPwd: md5(this.state.userPwd.trim())
    }).then(res=>{
      // console.log(res)
      if(res.data.code==0){
        Taro.hideLoading()
        Taro.setStorageSync('photo-token',res.data.token)
        Taro.navigateBack({
          delta:1
        })
      }
    })
  }
  onCancel() { 
    Taro.navigateBack({
      delta:1
    })
  }

  render() {
    return (
      <View className='login'>
        <View className='title'>请登录</View>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
        >
          <AtInput
            name='value'
            title='用户名'
            type='text'
            placeholder='请输入用户名'
            value={this.state.userName}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            name='value'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={this.state.userPwd}
            onChange={this.handleChangePwd.bind(this)}
          />
          <View className='btns'>
            <AtButton onClick={this.onCancel.bind(this)}>取消</AtButton>
            <AtButton onClick={this.onSubmit.bind(this)} type='primary'>确定</AtButton>
          </View>
        </AtForm>
      </View>
    )
  }
}
```

上传图片页面
```
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker } from '@tarojs/components'
import './upload.scss'
import {  AtInput, AtButton, AtIcon } from 'taro-ui'
import { parseTime } from "../../utils";

let inputList = []

export default class Upload extends Component {
  config = {
    navigationBarTitleText: '图片上传'
  }
  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.state = {
      files: [],
      isShow: true,
      desList: [],
      date: '',
      urls: []
    }
  }

  componentWillMount() {
    this.setState({
      date: parseTime(new Date())
    })
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  delFile(index) {
    let { files, urls } = this.state;
    files.splice(index, 1)
    urls.splice(index, 1)

    this.setState({
      files: files,
      urls: urls
    })
  }
  addFile() {
    Taro.chooseImage({
      count: 4,
      imageId: 'file',
      success: (v) => {
        console.log(v)
        this.setState({
          files: v.tempFiles
        })
      }
    })
  }
  uploadChange(v) {
    let files = v.target.files;
    if (files.length > 4) {
      Taro.showToast({
        title: '不能超过4张图片。。。',
        icon: 'none'
      })
      this.setState({
        files: []
      })
      return false;
    }

    let list = this.state.files
    let urls = this.state.urls

    for (let i = 0; i < files.length; i++) {
      list.push(files[i]);
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        urls.push(reader.result)
        this.setState({
          files: list,
          urls: urls,
          isShow: list.length < 4,
        })
      }
    }

    //初始化 图片描述变量
    list.map(() => inputList.push(''))
  }
  //图片点击预览
  onImageClick(index) {
    let imgs = [];
    this.state.files.map(x => imgs.push(x.path));
    Taro.previewImage({
      urls: imgs,
      current: imgs[index]
    })
  }

  //输入框变化
  handleChange(i, v) {
    inputList[i] = v
    this.setState({
      desList: inputList
    })

    return v
  }

  //取消回退
  onCancel() {
    Taro.navigateBack({
      delta: 1
    })
  }
  //提交
  onSubmit() {
    if (this.state.files.length < 0) {
      return false
    }
    let list = [];
    this.state.files.map((x, i) => {
      list.push({
        file: x,
        discription: this.state.desList[i],
        createDate: this.state.date
      });
    });
    Taro.showLoading({
      title: '上传中...'
    })
    console.log(list)
    // return
    list.map(x => {
      this.uploadFile(x);
    });
  }
  uploadFile(params) {
    Taro.uploadFile({
      url: '',
      filePath: params.file.path,
      name: 'file',
      header: { 'token': Taro.getStorageSync('photo-token') },
      formData: {
        'discription': params.discription,
        'createDate': params.createDate
      },
      success(res) {
        // console.log(res)
        const data = JSON.parse(res.data)
        //do something
        if (data.code == 100 || data.code == 101) {
          Taro.hideLoading();
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        }
        if (data.code == 0) {
          Taro.showToast({
            title: "上传成功！",
          });
          setTimeout(() => {
            Taro.navigateTo({
              url: '/pages/index/index'
            })
          }, 2000);
        }
      }
    })
  }

  //日期选择
  onDateChange = e => {
    let arr = e.detail.value.split('-')
    //格式化一下
    if (arr[1].length == 1) {
      arr[1] = '0' + arr[1]
    }
    if (arr[2].length == 1) {
      arr[2] = '0' + arr[2]
    }
    this.setState({
      date: arr.join('-')
    })
  }

  goHome() {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
  goLogin() {
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }

  render() {
    return (
      <View className='upload'>
        <View className='pic-title'>图片上传（最多四张）</View>
        <View className='pic-content'>
          {
            this.state.files.map((x, i) => {
              return (
                <View className='custom-img' taroKey={x}>
                  <Image className='preview-img' onClick={this.onImageClick.bind(this, i)} src={x.path}></Image>
                  <AtIcon onClick={this.delFile.bind(this, i)} value='subtract-circle' size='10' color='#08aaea'></AtIcon>
                </View>
              )
            })
          }
          {
            this.state.isShow &&
            <View className='add-icon' onClick={this.addFile.bind(this)}>
              <AtIcon value='add' size='30' color='#08aaea'></AtIcon>
            </View>
          }
        </View>
        {/* <AtImagePicker
          count={4}
          length={4}
          multiple
          showAddBtn={this.state.isShow}
          files={this.state.files}
          onChange={this.onChange.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
        /> */}
        <View className='pic-des'>图片描述（顺序填写，可不填）</View>
        {
          this.state.files.map((x, i) => {
            return (
              <AtInput
                title={'图片' + (i + 1)}
                type='text'
                placeholder='请输入描述'
                value={this.state.desList[i]}
                onChange={this.handleChange.bind(this, i)}
                taroKey={i}
              >
              </AtInput>
            )
          })
        }
        <View className='date-des'>
          <Picker mode='date' value='YYYY-MM-DD' onChange={this.onDateChange}>
            <View className='picker'>
              时间（可选）:{this.state.date}
            </View>
          </Picker>
        </View>
        <View className='btns'>
          <AtButton onClick={this.onCancel.bind(this)}>取消</AtButton>
          <AtButton onClick={this.onSubmit.bind(this)} type='primary'>确定</AtButton>
        </View>
        <View className='flow-btns'>
          <AtIcon onClick={this.goHome.bind(this)} value='home' size='30' color='#08aaea'></AtIcon>
          <AtIcon onClick={this.goLogin.bind(this)} value='user' size='30' color='#08aaea'></AtIcon>
        </View>
      </View>
    )
  }
}
```
上传图片页面用到了Taro.chooseImage()这个api获取图片的路径实现预览，提交图片的时候用到Taro.uploadFile(),
具体配置见[https://nervjs.github.io/taro/docs/apis/multimedia/images/chooseImage.html](https://nervjs.github.io/taro/docs/apis/multimedia/images/chooseImage.html)

接口api单独放到一个文件夹api下面的my-api.js
```
import request  from '../utils/request';

//查询接口
export function query(data){
  return request({
    url:'/query',
    method:'post',
    data
  })
}

//修改浏留言接口
export function editMessage(data){
  return request({
    url:'/editMessage',
    method:'post',
    data
  })
}
//删除图片
export function deleteImg(data){
  return request({
    url:'/deleteImg',
    method:'post',
    data
  })
}
//登录
export function login(data){
  return request({
    url:'/login',
    method:'post',
    data
  })
}


```

接口请求单独封装request.js 文件 ，用Taro.request()方法,注意一点，返回的数据是整个请求返回的东西，并不是后台的data。
```
import Taro from '@tarojs/taro'

let baseUrl = '';
if(process.env.NODE_ENV === 'development'){
  baseUrl = ''
  // baseUrl = 'http://127.0.0.1:9000'
}else{
  baseUrl = ''
}

const service = (params)=>{
  let {url,method,data} = params
  let contentType = 'application/json;charset=UTF-8'
  const option = {
    url: baseUrl + url,
    data: data,
    method: method.toUpperCase(),
    header: { 'content-type': contentType || params.contentType, 'token': Taro.getStorageSync('photo-token') },
    success(res) {
      if (res.statusCode === 200) {
        if(res.data.code==100 || res.data.code==101){
          Taro.showToast({
            title:res.data.msg || 'error',
            icon:'none'
          })
          setTimeout(()=>{
            Taro.navigateTo({
              url:'/pages/login/login'
            })
          },2000)
          return false;
        }else if(res.data.code=='-1'){
          Taro.showToast({
            title:res.data.msg || 'error',
            icon:'none'
          })
          return false;
        }
        return res.data
      }else{
        Taro.showToast({
          title:res.statusCode,
          icon:'none'
        })
        return false;
      }
    },
    error(e) {
      console.log('api', '请求接口出现问题', e)
    }
  }
  return Taro.request(option)
} 

export default service
```

通过 process.env.NODE_ENV 这个环境变量判断环境，加载对应环境的api；
公共方法封装在utils文件夹的index.js中


### 服务端
服务端这里不细说了，我采用的是express开发的，pm2 进程管理；数据库用的是mysql，没有太复杂的操作数据库代码。
	
### 总结
本项目只是对Taro的一次探索性的开发，用到的也只是部分api，和ui组件；很多东西没哟涉及，例如，redux状态管理等。
总的来说，开发体验还是不错的，可以用react开发小程序就很爽，哈哈哈。。。

具体成品效果，h5端可以访问[http://mp.ufade.com](http://mp.ufade.com);小程序可以搜索**岁月不弃**可以查看到。


有好的见解，欢迎留言，留下联系方式，大家互相沟通！

不喜勿喷，谢谢！


