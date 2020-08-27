//配置路径      购物车
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "cookie": "jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim: {
        "cookie": ["jquery"]   //设置依赖关系，让cookie在jquery加载后加载
    }
})

require(["goodsCart"], function(goodsCart){
    goodsCart.download();
    goodsCart.cartHover();
    goodsCart.loadCarData();
    goodsCart.checkFunc();
    goodsCart.changeCars();
});