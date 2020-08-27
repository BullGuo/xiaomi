define(["jquery"], function($){
    //下载中部滚动数据
    function download(){
        $.ajax({
            type: "get",
            url: "data/slide.json",
            success: function(result){
                var slideArr = result.data.list.list;
                for(var i = 0; i < slideArr.length; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                                <div class = 'thumb'>
                                    <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                </div>
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}元</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            erroe: function(msg){
                console.log(msg);
            }
        });
    }

    //实现左右滚动
    function slideTab(){
        var iNow = 0;   //记录当前组数，4个一组
        var count = Math.floor(26 / 4);
        var oSpans = $(".swiper-controls span");

        var timer = setInterval(function(){
            iNow++;
            if(iNow > count){
                clearInterval(timer);
                return;
            }
            tab();
        },2000);

        oSpans.click(function(){
            clearInterval(timer);
            if($(this).index() == 0){
                iNow--;
                iNow = Math.max(0, iNow);
            }else{
                iNow++;
                iNow = Math.min(iNow, count);
            }
            tab();
        });

        $("#J_flashSaleList, .swiper-controls").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                if(iNow > count){
                    clearInterval(timer);
                    return;
                }
                tab();
            },4000);
        });

        function tab(){
            iNow == 0 ? oSpans.eq(0).addClass("swiper-button-disabled") : oSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? oSpans.eq(1).addClass("swiper-button-disabled") : oSpans.eq(1).removeClass("swiper-button-disabled");

            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            }); 
        }
    }

    return {
        download: download,
        slideTab: slideTab
    }
});