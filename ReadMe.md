# Mi Store（参考小米商城）

## 前言

新手上路，如有错误，请多多指教。



项目包含了6个页面：首页、商品列表页、商品详情页、购物车以及登录、注册页面。页面中的数据使用ajax下载json数据，最后创建在页面中。

实现了商品展示、商品详细信息展示、登录、注册以及用户购物车功能。

## 技术栈

- **前端：**`HTML`+`CSS`+`jQuery`

- **后端：**`PHP`

- **数据库：**`Mysql`

- **项目开发工具**`Gulp`+`scss`+`模块化开发`

## 注意

- 使用登录注册需在本地服务器加载，gulp启动的服务器无效。
- 进入目录，重新下载所有的依赖文件

## 说明

若需借鉴此项目，以下就是各个文件介绍及引用(前面后缀为.js的是入口文件，后面是引用的模块，括号里的是代码中使用的json数据)

- 首页：main.js		nav导航(nav.json)      slide中部轮播(slide.json)      data首页下方商品数据(data.json)
- 商品列表页：list.js		nav导航	 goodsList列表页(goodsList2.json)
- 商品详情页：desc.js		nav导航	 goodsDesc详细信息(goodsList.json)
- 购物车：cart.js		goodsCart购物车数据(goodsCarList.json购物车下方列表信息、goodsList2.json)
- 注册：main2.js		register(register.php)
- 登录：main3.js		login(login.php)

- 登录注册：login.css
- 首页：index.css
- 列表页：list.css
- 详情页：list.css、product_buy.css
- 购物车：base.css、cart.css

## 页面截图

**首页**
![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/01.png)
![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/02.png)

**商品列表页**

![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/03.png)

**商品详情页**

![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/04.png)

**购物车**

![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/05.png)

**登录**
![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/06.png)

**注册**

![图片加载失败](https://gitee.com/bullguo/iomg1/blob/master/showimg/07.png)



**作者** [BullGuo](https://github.com/BullGuo)
