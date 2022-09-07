---
title: 高德地图采坑
date: 2018-11-20 11:03:55
titleTag: 原创
tags: 
  - 高德地图
  - js
  - 前端
  - 地图
  - 学习
categories:
  - 随笔
permalink: /pages/aa3906/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---


### 本次需求分析：
> 1. 从原来城市的数据，变为省市区的数据；
> 2. 地图需要根据缩放级别绘制icon；
> 3. 地图点击需要切换到当前点击区域的数据；
> 4. 实时投递弹窗和实时清运弹窗；
> 5. 有权限区域的绘制；

<!-- more -->


# 1. 权限区域绘制

> 目前项目使用行政区划浏览 绘制权限区域 具体用法如下：

    //加载DistrictExplorer，loadUI的路径参数为模块名中 'ui/' 之后的部分 
    AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
    //启动页面
    initPage(DistrictExplorer);
    });

    function initPage(DistrictExplorer) {
    //创建一个实例
    var districtExplorer = new DistrictExplorer({
        map: map //关联的地图实例
    });

    var adcode = 100000; //全国的区划编码

    districtExplorer.loadAreaNode(adcode, function(error, areaNode) {

        if (error) {
            console.error(error);
            return;
        }

        //绘制载入的区划节点
        renderAreaNode(districtExplorer, areaNode);
    });
    }

    function renderAreaNode(districtExplorer, areaNode) {

    //清除已有的绘制内容
    districtExplorer.clearFeaturePolygons();

    //just some colors
    var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];

    //绘制子级区划
    districtExplorer.renderSubFeatures(areaNode, function(feature, i) {

        var fillColor = colors[i % colors.length];
        var strokeColor = colors[colors.length - 1 - i % colors.length];

        return {
            cursor: 'default',
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.35, //填充透明度
        };
    });

    //绘制父级区划，仅用黑色描边
    districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: 'black', //线颜色
        fillColor: null,
        strokeWeight: 3, //线宽
    });

    //更新地图视野以适合区划面
    map.setFitView(districtExplorer.getAllFeaturePolygons());
    }

![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185610.313udrtl2560.webp)
新需求是要求到区一级，有权限的区域可能不是一个市的全部区域，行政区划浏览会把一个城市的所有区域绘制出来，或者把一个省的所有市绘制出来，所以，这种绘制区域的方案pass掉。。。。


![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185622.1elzsm6otl28.webp)

    我新的方案采用的是 高德的 “行政区查询” 
    AMap.plugin('AMap.DistrictSearch', function () {
        // 创建行政区查询对象
        var district = new AMap.DistrictSearch({
            // 返回行政区边界坐标等具体信息
            extensions: 'all',
            // 设置查询行政区级别为 区 
            level: 'district'
        })

        district.search('110110', function(status, result) {
            // 获取朝阳区的边界信息
            var bounds = result.districtList[0].boundaries
            var polygons = []
            if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.7,
                fillColor: '#CCF3FF',
                strokeColor: '#CC66CC'
            })
            polygons.push(polygon)
            }
            // 地图自适应
            map.setFitView()
        }
        })
    })

我们要做的只有，把有权限区域的区域编码拿到，就可以绘制权限区域了。


# 2. 地图点击需要切换到当前区域的数据


![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185650.4udsai8mgqg0.webp)
例如，当前点击的是 广东省深圳市南山区，我们没法判断到底是点击的是广东省，深圳市，还是南山区，所以区分不了点击的省市区；

而且，点击地图的时候只会返回城市级别的code，用code做请求的时候，来获取数据。

这里我利用了地图的“缩放级别”来做控制。利用map.getZoom()来获取地图的缩放级别，我分为三个档次：x<8,8<=x<=10,x>10,根据地图当前的级别，分别三个档次的点击代表省市区，这样我们可以获取到地图返回的中文省市区，拿中文省市区，去后台给到的有权限的三级区域列表做匹配，然后，拿到对应的code做请求，获取数据。

点击地图之后的具体方法，如下： 

    geocoder.getAddress(e.lnglat, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            // console.log(JSON.stringify(result))
            // console.log(map.getZoom())
            //当前的名称
            var currentName = ''
            //权限列表是否包含当前name
            var isContain = true;
            //各级名称
            var provinceName = result.regeocode.addressComponent.province
            var cityName = result.regeocode.addressComponent.city
            var districtName = result.regeocode.addressComponent.district

            //没区的时候直接取cityCode
            var noDistrictCityCode = result.regeocode.addressComponent.adcode
            if (map.getZoom() < 8) { //此处去拿省的回收机数量 传给MachineNumWindow
                // 拿省的名称去匹配 
                selectName = currentName = provinceName
                let list = provinceList.filter(x => x.cityName.includes(currentName))[0]
                if (list) {
                    isContain = true
                    currentAdcode = list.cityCode
                } else {
                    isContain = false
                }

            } else if (map.getZoom() >= 8 && map.getZoom() <= 10) {
                //北京、上海等地可能没有cityName
                selectName = currentName = cityName ? cityName : provinceName
                // console.log(currentName)
                let list = cityList.filter(x => x.cityName.includes(currentName))[0]
                // console.log(list)
                if (list) {
                    isContain = true
                    currentName = provinceName + cityName
                    currentAdcode = list.cityCode
                } else {
                    isContain = false
                }

            } else {
                currentName = districtName
                if (districtName == '') {
                    currentName = provinceName + cityName;
                    currentAdcode = noDistrictCityCode * 1000000;
                    isContain = true;
                } else {
                    let list = districtList.filter(x => x.cityName.includes(currentName))[0]
                    // console.log(list)
                    if (list) {
                        isContain = true
                        currentName = provinceName + cityName + districtName
                        currentAdcode = list.cityCode
                    } else {
                        isContain = false;
                    }
                }
                selectName = cityName ? cityName + districtName : provinceName + districtName
            }
            // console.log(isContain)
            //如果没有匹配到return
            if (!isContain) {
                map.clearInfoWindow();
                return false;
            }

            //拿到当前的名称去请求当前区域中心经纬度
            geocoder.getLocation(currentName, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // result中对应详细地理坐标信息
                    // console.log(JSON.stringify(result))
                    let location = result.geocodes[0].location;
                    currentLnglat = [location.lng, location.lat]
                }
            })

            // console.log(currentLnglat)

            //打开名称数量信息窗体
            openNumWindow(clickLnglat, {
                name: currentName,
                // num: currentNum
            })


        }

    });

我们是需要弹出当前点击的区域名称，然后点击当前的信息窗体，请求数据。。。。

# 3. 根据地图缩放级别展示不同的icon  回收机

![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185628.1hpuku52bagw.webphttps://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185628.1hpuku52bagw.webp)
这个之前做城市数据墙的时候，可能回收机的数量不是特别大，只是显示一个城市的回收机，而且也不用变换图标，所以性能上面没有发现问题，后来，我沿用之前添加marker的方法，由于我的地图是需要显示大量的点，而且会做切换，上了生产环境之后发现严重的性能问题，pass掉了，测试，预发布。。。。。没有生产那么多的数据，并没有发现。。。。。悲催

![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185631.214jss41enk0.webp)
后来，经过团队的讨论，选了高德地图海量点的方案，此方案“据高德说”，10万+ 以下都可以hold住，牛鼻。。。。。。

    //海量点的style  图标提前定义写死，后面更换时直接修改数据里的style
    var massStyle = [{
            url: './images/point.png',
            anchor: new AMap.Pixel(3, 6),
            size: new AMap.Size(6, 6)
        },
        {
            url: './images/city_full.png',
            anchor: new AMap.Pixel(27, 57),
            size: new AMap.Size(54, 57)
        },
        {
            url: './images/city_unfull.png',
            anchor: new AMap.Pixel(27, 57),
            size: new AMap.Size(54, 57)
        },
        {
            url: './images/district_full.png',
            anchor: new AMap.Pixel(27, 61),
            size: new AMap.Size(54, 61)
        },
        {
            url: './images/district_unfull.png',
            anchor: new AMap.Pixel(27, 61),
            size: new AMap.Size(54, 61)
        },
    ]
    var massMarks = [] //海量点
    //海量点  需要提前创建实例，避免每次权限变动多次实例化，造成性能问题,创建实例时先放空数据进去，按照官网不放数据setData不行
    massMarks = new AMap.MassMarks([], {
        zIndex: 111,
        cursor: 'pointer',
        style: massStyle
    });



    /**
    * 绘制回收机
    * @date 2018-12-04
    * @param {*} data 中心地图原始回收机列表
    * @returns
    */
    function getMapFun(data) {
        // console.log(data)
        if (!data || data.length == 0) { //此处要判断data  如不的话，试试，神坑。。。地图样式加载不出来
            return false;
        }
        machineList = []
        data.map(x => {
            machineList.push({
                lnglat: [x.longitude, x.latitude],
                siteCode: x.siteCode,
                isFull: x.isFull,
                style: 0
            })
        })

        massMarks.clear()
        massMarks.setData(machineList)
        massMarks.setMap(map);

        //渲染回收机
        renderMap(machineList)

    }


    /**
    * 渲染中心地图数据回收机，不同缩放级别替换图标
    * @date 2018-12-04
    * @param {*} data  处理过后的回收机列表
    * @returns
    */
    function renderMap(data) {
        // console.log(data)
        //监听地图缩放前后级别，如果在同一区间内就不做渲染了,节约性能
        if (startZoom <= 9 && startZoom >= 3 && endZoom <= 9 && endZoom >= 3) {
            return false;
        }
        if (startZoom > 9 && startZoom <= 14 && endZoom > 9 && endZoom <= 14) {
            return false;
        }
        if (startZoom >= 15 && endZoom >= 15) {
            return false;
        }
        // console.log(map.getZoom())
        //不同级别的data中style要换，图标动态更换，重新渲染style
        if (map.getZoom() <= 9) {
            massMarks.setStyle(massStyle[0])
        }
        if (map.getZoom() > 9 && map.getZoom() <= 14) {
            data.map(x => {
                x.isFull == 1 ? x.style = 1 : x.style = 2
            })
            massMarks.setStyle(massStyle)
        }
        if (map.getZoom() >= 15) {
            data.map(x => {
                x.isFull == 1 ? x.style = 3 : x.style = 4
            })
            massMarks.setStyle(massStyle)
        }
    }

![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185636.6ubvqfz4qc40.webp)
![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185642.4mqvh7b3i3a0.webp)
![avatar](https://cdn.staticaly.com/gh/Alan0827/image-house@master/gaode/微信图片_20181219185646.45d1c6em2k20.webp)
详细的方法都在上面了，图标的话根据级别不同，共有5种。


至此，高德地图项目的坑都被我踩了好多了。。。过程其实蛮曲折的，记录下来的话，好像没有什么东西似的，不过平时多记录以下踩坑的话，会后相信遇到类似的问题，会好很多，希望大家一样。。。。。


哦，好像还有个实时弹窗的问题

# 4. 实时投递弹窗和实时清运弹窗



实时弹窗利用的就是new Amap.Marker()方法，绘制的marker，为什么用这个呢？不用信息窗体，信息窗体在地图中只能同时存在一个，这个就操蛋了。。。。。所以，这里实时弹窗放弃信息窗体，因为其他地方我已经用过信息窗体。

直接上代码吧  显示3s，然后去掉，这里有个判断就是不在可视区域内的话，放在右上角，一个dom操作，在可视区域的话，需要显示在当前的实时的点上面，大概就这样。

    /**
    * 绘制实时投机信息窗体
    * @date 2018-12-04
    * @param {*} data
    */
    function renderToudiWindow(data) {
        // console.dir(data)
        let lng = data.longitude;
        let lat = data.latitude;
        var bound = map.getBounds(); //地图可视区域
        //判断该点是否在可视范围内（针对东经，北纬）
        if (lng < bound.northeast.lng && lng > bound.southwest.lng && lat < bound.northeast.lat && lat > bound.southwest.lat) {
            recoveryMarker = new AMap.Marker({
                position: [lng, lat],
                content: createToudiWindow(data),
                offset: new AMap.Pixel(14, -26)
            });
            map.add(recoveryMarker)
            setTimeout(function () {
                map.remove(recoveryMarker)
                recoveryMarker = null
            }, 3000)
        } else {
            $(".module4 .nowWindow").append(createToudiWindow(data))
            setTimeout(function () {
                $(".module4 .nowWindow").children().first().remove();
            }, 3000)
        }
    }



    /**
    * 实时投递信息窗体
    * @date 2018-12-04
    * @param {*} data
    * @returns
    */
    function createToudiWindow(data) {
        let info = `<div class="toudi-window">
                        <div class="qingyun-content">
                            <div class="title">回收机实时投递</div>
                            <div class="time">
                                <span>${data.cityName}</span>
                            </div>
                            ${data.list.map(x=>
                                `<div class="num">
                                    <span>${x.typeName}：</span>
                                    <span>
                                        <b>${x.type=='0'?Number(x.value):x.value}</b>
                                        ${x.valueCompany}
                                    </span>
                                </div>`
                            ).join('')}
                            <div class="weight">
                                <span>${data.nickName}</span>
                                <span>
                                    ${data.time}
                                </span>
                            </div>
                        </div>
                    </div>`
        return info
    }






