//配置路径
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "cookie": "jquery.cookie",
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim: {
        "cookie": ["jquery"]   //设置依赖关系，让cookie在jquery加载后加载
    }
})

require(["nav", "slide", "data"], function(nav, slide, data){
    //导航栏
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    //中部数据
    slide.download();
    slide.slideTab();

    //主页数据加载
    data.download();
    data.tabMenu();
})