//配置路径
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "nav": "nav",
        "goodsList": "goodsList"
    }
})

require(["nav", "goodsList"], function(nav, goodsList){
    nav.topNavDownload();
    nav.searchTab();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.allGoodsTab();

    goodsList.download();
    goodsList.banner();
});