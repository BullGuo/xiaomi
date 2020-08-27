define(["jquery", "cookie"], function($){
    //加载已经加入购物车的商品
    function loadCarData(){
        $("#J_cartListBody .J_cartGoods").html("");
        new Promise(function(resolve, reject){  // 异步操作
            $.ajax({    //下载第一个数据
                type: "get",
                url: "data/goodsCarList.json",
                success: function(result){
                    resolve(result.data);   // 下载成功把result.data传给下一个then方法的形参
                },
                error: function(msg){
                    reject(msg);
                }
            });
        }).then(function(arr){  //这里的arr即是上方调用resolve(result.data)中的result.data
            return new Promise(function(resolve, reject){//后面仍需调用then,所以return new Promise
                $.ajax({
                    type: "get",
                    url: "data/goodsList2.json",
                    success: function(result){
                        var newArr = arr.concat(result);
                        resolve(newArr);
                    },
                    error: function(msg){
                        reject(msg);
                    }
                });
            })
        }).then(function(arr1){
            var newArr = [];
            var cookieArr = JSON.parse($.cookie("goods"));
            if(!cookieArr){
                alert("购物车中没有数据");
            }else{
                for(var i = 0; i < arr1.length; i++){
                    for(var j = 0; j < cookieArr.length; j++){
                        if(cookieArr[j].id == arr1[i].goodsid || cookieArr[j].id == arr1[i].product_id){
                            arr1[i].id = arr1[i].goodsid ? arr1[i].goodsid : arr1[i].product_id
                            arr1[i].num = cookieArr[j].num;
                            newArr.push(arr1[i]);    
                        }
                    }
                }   
                for(var i = 0; i < newArr.length; i++){
                    $(`<div class="item-row clearfix" id = ${newArr[i].id}> 
                            <div class="col col-check">  
                                <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                            </div> 
                            <div class="col col-img">  
                                <a href="//item.mi.com/${newArr[i].id}" target="_blank"> 
                                    <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                                </a>  
                            </div> 
                            <div class="col col-name">  
                                <div class="tags">   
                                </div>     
                                <div class="tags">  
                                </div>   
                                <h3 class="name">  
                                    <a href="//item.mi.com/${newArr[i].id}" target="_blank"> 
                                        ${newArr[i].name}
                                    </a>  
                                </h3>        
                            </div> 
                            <div class="col col-price"> 
                                ${newArr[i].price}元 
                                <p class="pre-info">  </p> 
                            </div> 
                            <div class="col col-num">  
                                <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                    <a href="javascript:void(0)" class="J_minus">
                                        <i class="iconfont"></i>
                                    </a> 
                                    <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                    <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                                </div>  
                            </div> 
                            <div class="col col-total"> 
                                ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                                <p class="pre-info">  </p> 
                            </div> 
                            <div class="col col-action"> 
                                <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                            </div> 
                        </div>`).appendTo("#J_cartListBody .J_cartGoods");
                }
                isCheckAll();
            }
        });
    }

    //下载底部"买购物车中商品的人还买了"
    function download(){
        $.ajax({
            type: "get",
            url: "data/goodsCarList.json",
            success: function(result){
                var arr = result.data;
                for(var i = 0; i < arr.length; i++){
                    $(`<li class="J_xm-recommend-list span4">    
                            <dl> 
                                <dt> 
                                    <a href="#"> 
                                        <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="${arr[i].name}"> 
                                    </a> 
                                </dt> 
                                <dd class="xm-recommend-name"> 
                                    <a href="#"> 
                                        ${arr[i].name} 
                                    </a> 
                                </dd> 
                                <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                                <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                                    <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id="${arr[i].goodsid}">加入购物车</a>
                                </dd> 
                                <dd class="xm-recommend-notice">

                                </dd> 
                            </dl>  
                        </li>`).appendTo(".page-main .cart-recommend ul");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }

    function cartHover(){
        //鼠标划入时显示加入购物车
        $(".page-main .cart-recommend ul.row").on("mouseenter", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "block");
        });
        $(".page-main .cart-recommend ul.row").on("mouseleave", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "none");
        });

        //点击加入购物车
        $(".page-main .cart-recommend ul.row").on("click", ".xm-recommend-tips a", function(){
            var id = this.id;
            var same = false;
            var cookieArr = JSON.parse($.cookie("goods"));
            if(!cookieArr){
                $.cookie("goods", JSON.stringify([{id: id, num: 1}]), {
                    expires: 7
                });
            }else{
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    cookieArr.push({id: id, num: 1});
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                });
            }
            loadCarData();
            return false;
        });
    }

    //全选按钮 和 单选按钮的点击实现
    function checkFunc(){
        //全选按钮
        $("#J_cartBox #J_selectAll").click(function(){
            var obtn = $("#J_cartListBody .J_cartGoods .item-row .col-check i");
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(obtn).removeClass("icon-checkbox-selected");
            }else{
                $(this).add(obtn).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        });
        //单选按钮
        $("#J_cartListBody .J_cartGoods").on("click", ".item-row .col-check i", function(){
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        });
    }

    //判断是否都被选中
    function isCheckAll(){
        var sumPrice = 0;   //选中商品的合计价格
        var sumCheck = 0;   //选中商品的总个数
        var sumAll = 0;     //购物车中所有的商品总数
        var isAll = true;   //默认全选
        var node =  $(".list-body").find(".item-row");
        // var node = $("#J_cartListBody .J_cartGoods").find(".item-row");
        node.each(function(index, item){// index是下标 item是遍历到的节点
            if(!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                isAll = false;
            }else{
                sumCheck += parseInt($(item).find(".col-num input").val());
                sumPrice += parseFloat($(item).find(".col-total").html().trim());
            }
            sumAll += parseInt($(item).find(".col-num input").val());
        });
        
        $("#J_cartTotalNum").html(sumAll);  //购物车中所有的商品总数
        $("#J_selTotalNum").html(sumCheck);  //选择的商品总个数
        $("#J_cartTotalPrice").html(sumPrice);  //选择的商品总价

        if(isAll){
            $("#J_cartBox #J_selectAll").addClass("icon-checkbox-selected");
        }else{
            $("#J_cartBox #J_selectAll").removeClass("icon-checkbox-selected");
        }
    }

    //给页面上商品数量增加减少和删除添加
    function changeCars(){
        //删除操作
        $("#J_cartListBody .J_cartGoods").on("click", ".col-action a", function(){
            var id = $(this).closest(".item-row").remove().attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    cookieArr.splice(i, 1);
                    break;
                }
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            });
            isCheckAll();
            return false;
        });

        //商品加减操作
        $("#J_cartListBody .J_cartGoods").on("click", ".J_minus,.J_plus", function(){
            //单价
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
            var id = $(this).closest(".item-row").attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    if(this.className == "J_minus"){    //减少
                        cookieArr[i].num == 1 ? alert("再减就没有啦!") : cookieArr[i].num--;
                    }else{  //增加
                        cookieArr[i].num++;
                    }
                    $(this).siblings("input").val(cookieArr[i].num);
                    $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1));
                    break;
                }
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            });
            isCheckAll();
        });
    }

    return {
        download: download,
        cartHover: cartHover,
        //加载已经加入购物车的商品
        loadCarData: loadCarData,
        //全选按钮 和 单选按钮的点击实现
        checkFunc: checkFunc,
        //给页面上商品数量增加减少和删除添加
        changeCars: changeCars
    }
});