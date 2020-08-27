//配置路径
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "cookie": "jquery.cookie",
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        "cookie": ["jquery"]   //设置依赖关系，让cookie在jquery加载后加载
    }
})

require(["nav", "goodsDesc"], function(nav, goodsDesc){
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.searchTab();
    nav.topNavTab();
    nav.leftNavTab();
    nav.allGoodsTab();

    goodsDesc.download();
    goodsDesc.banner();
    goodsDesc.cookieList();
});