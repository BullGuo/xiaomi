define(["jquery", "cookie"], function($){
    //数据下载
    function download(){
        var product_id = valueName(location.search, "product_id");
        $.ajax({
            type: "get",
            url: "data/goodsList.json",
            success: function(result){
                var goodsMsg = result.find(item => item.product_id == product_id);
                var node = $(`<!-- 导航 -->
                <div id = 'J_proHeader' data-name="${goodsMsg.name}">
                    <div class = 'xm-product-box'>
                        <div id = 'J_headNav' class = 'nav-bar'>
                            <div class = 'container J_navSwitch'>
                                <h2 class = 'J_proName'>${goodsMsg.name}</h2>
                                <div class = 'con'>
                                    <div class = 'left'>
                                        <span class = 'separator'>|</span>
                                        <a href="#">${goodsMsg.title}</a>
                                    </div>
                                    <div class = 'right'>
                                        <a href="#">概述</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">参数</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">F码通道</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">用户评价</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 商品详情数据展示 -->
                <div class = 'xm-buyBox' id = 'J_buyBox'>
                    <div class = 'box clearfix'>
                        <!-- 商品数据 -->
                        <div class = 'pro-choose-main container clearfix'>
                            <div class = 'pro-view span10'>
                                <!-- img-con fix 设置图片浮动 -->
                                <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                                    <div class = 'ui-wrapper' style="max-width: 100%;">
                                        <!-- 图片 -->
                                        <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                            <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>
   
                                            </div>
                                        </div>
                                        <!-- 显示第几张图片的下标 -->
                                        <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                            <div class = 'ui-pager ui-default-pager'>
                                                
                                            </div>
                                            <div class = 'ui-controls-direction'>
                                                <a class="ui-prev" href="">上一张</a>
                                                <a class="ui-next" href="">下一张</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = 'pro-info span10'>
                                <!-- 标题 -->
                                <h1 class = 'pro-title J_proName'>
                                    <span class = 'img'></span>
                                    <span class = 'name'>${goodsMsg.name}</span>
                                </h1>
                                <!-- 提示 -->
								<p class = 'sale-desc' id = 'J_desc'>
                                    ${goodsMsg.product_desc_ext}
                                </p>
                                <div class = 'loading J_load hide'>
                                    <div class = 'loader'></div>
                                </div>
                                <!-- 主体 -->
                                <div class = 'J_main'>
                                    <!-- 经营主题 -->
                                    <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                    <!-- 价格 -->
                                    <div class = 'pro-price J_proPrice'>
                                        <span class = 'price'>
											${goodsMsg.price_max}元
                                            <del>${goodsMsg.market_price_max}元</del>
                                        </span>
                                        <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                    </div>
                                    <!-- 常态秒杀倒计时 -->
                                    <div class = 'pro-time J_proSeckill'>
                                        <div class="pro-time-head">
                                            <em class="seckill-icon"></em> 
                                            <i>秒杀</i>
                                            <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                       </div>
                                        <div class = 'pro-time-con'>
                                            <span class = 'pro-time-price'>
                                                ￥
                                                <em class = 'J_seckillPrice'>${goodsMsg.price_min}</em>
                                                <del>
                                                    ￥
                                                    <em class = 'J_seckillPriceDel'>${goodsMsg.market_price_min}</em>
                                                </del>
                                            </span>
                                        </div>
                                    </div>
                                        <!-- 已经选择产品 -->
                                        <div class = 'pro-list' id = 'J_proList'>
                                            <ul>
                                                <li>${goodsMsg.name} ${goodsMsg.value}  
                                                    <del>${goodsMsg.market_price_min}元</del>  
                                                    <span>  ${goodsMsg.price_min} 元 </span> 
                                                </li>
                                                <li class="totlePrice" data-name="seckill">   
                                                    秒杀价   ：${goodsMsg.price_min}元  
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 购买按钮 -->
                                        <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                            <li>  
                                                <a href="#" class="btn btn-primary btn-biglarge J_login" id = "${goodsMsg.product_id}">加入购物车</a>  
                                            </li>   
                                            <li>  
                                                <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                    <i class="iconfont default"></i>查看购物车 
                                                </a>  
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
                node.appendTo("#app");

                //图片加载
                var oImg = goodsMsg.images;
                if(oImg.length == 1){
                    $(`<img class = 'slider done' 
                    src="${oImg[0]}" 
                    style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" 
                    alt=""/>`).appendTo(node.find("#J_img #J_sliderView"));
                    //隐藏上一张下一张按钮
                    node.find($(".ui-controls-direction")).hide();
                }else{
                    for(var i = 0; i < oImg.length; i++){
                        $(`<img class = 'slider done' 
                        src="${oImg[i]}" 
                        style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: ${i == 0 ? "blcok" : "none"};" 
                        alt=""/>`).appendTo(node.find("#J_img #J_sliderView"));
                        //图片下方切换按钮
                        $(`<div class = 'ui-pager-item'>
                                <a href="#" data-slide-index = "0" class = 'ui-pager-link ${i == 0 ? "active" : ""}'>1</a>
                        </div>`).appendTo(node.find(".ui-controls .ui-pager"));
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }

    //获取域名后缀id
    function valueName(str, name){
        //?name1=value1&name2=value2&name3=value3
        var start = str.indexOf(name + "=");
        if(start == -1){
            return null;
        }
        var end = str.indexOf("&", start);
        if(end == -1){
            end = str.length;
        }
        name = str.substring(start, end);
        return name.split("=")[1];
    }

    //详情页banner效果
    function banner(){
        var iNow = 0;
        //点击下方小按钮切换
        $("#app").on("click", "#J_img .ui-controls .ui-pager a", function(){
            iNow = $(this).parent().index();
            tab();
            return false;
        });

        //点击侧方切换
        $("#app").on("click", "#J_img .ui-controls .ui-controls-direction a", function(){
            
            if(this.className == "ui-prev"){
                iNow--;
                if(iNow == -1){
                    iNow = $("#app #J_img #J_sliderView img").size() - 1;
                }
            }else{
                iNow++;
            }
            tab();
            return false;
        });

        //轮播
        var timer = setInterval(function(){
            iNow++;
            tab();
        },3000);

        //鼠标移入停止轮播
        $("#app").on("mouseenter", "#J_img", function(){
            clearInterval(timer);
        });
        $("#app").on("mouseleave", "#J_img", function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },3000);
        });

        function tab(){
            if($("#app #J_img #J_sliderView img").size() == 1){
                clearInterval(timer);
            }else{
                if(iNow == $("#app #J_img #J_sliderView img").size()){
                    iNow = 0;
                }
                $("#app #J_img .ui-controls .ui-pager a").removeClass("active").eq(iNow).addClass("active");
                $("#app #J_img #J_sliderView img").hide().eq(iNow).show();
            }
        }
    }

    //加入购物车操作
    function cookieList(){
        $("#app").on("click", ".xm-buyBox .J_main .btn-wrap a", function(){
            var id = this.id;
            var same = false;   //默认存在cookie，且没有该商品信息
            var cookieArr = JSON.parse($.cookie("goods"));
            if(!cookieArr){ //为空时新建一条cookie
                $.cookie("goods", JSON.stringify([{id: id, num: 1}]),{
                    expires: 7
                });
            }else{
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){  //cookie中存在刚商品信息，数量加1
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    cookieArr.push({id: id, num: 1});
                }
                $.cookie("goods", JSON.stringify(cookieArr),{
                    expires: 7
                });
            }
            alert($.cookie("goods"));
            return false;
        });
    }

    return {
        //数据下载
        download: download,
        //详情页banner效果
        banner: banner,
        //加入购物车操作
        cookieList: cookieList
    }
});