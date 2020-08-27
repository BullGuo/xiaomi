define(["jquery"], function($){
    //商品列表页数据下载与加载
    function download(){
        $.ajax({
            type: "get",
            url: "data/goodsList2.json",
            success: function(result){
                //第一个大图数据加载
                $(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${result[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">
                                                ${result[0].name}
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${result[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            <del data-v-a2d6c756>${result[0].del}元</del>
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="#">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`).appendTo(".page-main .app-body");

                //大图后的数据加载
                for(var i = 1; i < result.length; i++){
                    if(i % 2 != 0){
                        //每两个创建一行
                        var node = $(`<div data-v-61428f58 class = 'section'>
                                <div data-v-61428f58 class = 'components-list-box'>
                                    <div data-v-4a0c734d class = 'channel-line' style = 'background-color: rgb(245, 245, 245); height: 14px;'></div>
                                </div>
                            </div>
                            <div data-v-61428f58 class = 'section'>
                                <div data-v-61428f58 class = 'components-list-box'>
                                    <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                                        <div data-v-45ef62b1 class = 'row'>
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>`);
                        node.appendTo(".page-main .app-body");
                    }
                    $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                        <div data-v-45ef62b1 class = 'figure'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                                <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
                            </a>
                        </div>
                        <h3 data-v-45ef62b1 class = 'title'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">${result[i].name}</a>
                        </h3>
                        <p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
                        <p data-v-45ef62b1 class = 'price'>
                            <strong data-v-45ef62b1>${result[i].price}</strong>元
                            <span data-v-45ef62b1>起</span>
                            <del data-v-45ef62b1>${result[i].del}元</del>
                        </p>
                    </div>`).appendTo(node.find(".row"));
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }

    //商品列表页banner图
    function banner(){
        var iNow = 0;
        var oBtn = $(".gallery-box .swiper-container .swiper-pagination a");

        var timer = setInterval(function(){
            iNow++;
            tab();
        }, 3000);

        //鼠标悬停时停止轮播
        $(".gallery-box .gallery-one .swiper-container").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 3000);
        });

        //鼠标点击左右按钮上下切换
        $(".gallery-box .gallery-one .swiper-container div").click(function(){
            if($(this).index() == 2){
                iNow--;
                if(iNow < 0){
                    $(".gallery-box .swiper-container .swiper-wrapper").css("left", -5120);
                    iNow = 1;
                }
                tab();
            }
            if($(this).index() == 3){
                iNow++;
                tab();
            }
        });

        //鼠标点击下方切换按钮
        oBtn.click(function(){
            iNow = $(this).index();
            tab();
            return false;
        });

        function tab(){
            if(iNow == 1){
                oBtn.eq(iNow).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
            }else{
                oBtn.eq(0).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
            }
            $(".gallery-box .swiper-container .swiper-wrapper").animate({
                left: -2560 * iNow
            }, 1000, function(){
                if(iNow == 2){
                    $(".gallery-box .swiper-container .swiper-wrapper").css("left", 0);
                    iNow = 0;
                }
            });
        }
    }

    return {
        //商品列表页数据下载与加载
        download: download,
        //商品列表页banner图
        banner: banner
    }
});