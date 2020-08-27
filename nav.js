define(["jquery"], function($){
    //下载轮播图
    function download(){
        $.ajax({
            type: "get",
            url: "data/nav.json",
            success: function(result){
                var bannerArr = result.banner;
                for(var i = 0; i < bannerArr.length; i++){
                    $(`<a href="${bannerArr[i].url}" style="cursor: pointer;">
                    <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/>
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    if(i == 0){
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
        leftNavDownload();
        topNavDownload();
    }

    //轮播图效果实现
    function banner(){
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;

        //设置定时器，让图片自动轮播
        var timer = setInterval(function(){
            iNow++;
            tab();
        },2500);

        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide a");
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination a");
            }
            if(iNow == 5){
                iNow = 0;
            }
            if(iNow == -1){
                iNow = 4;
            }
            //图片显示
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 1000);
            //对应的小圆圈指定当前是哪张图片显示
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //鼠标移入移出停止轮播
        $("#J_homeSwiper, .swiper-button-prev, .swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },3500);
        });

        //点击小圆圈切换图片
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function(){
            iNow = $(this).index();
            tab();
            return false; //停止a链接默认行为
        });

        //点击侧边上下切换图片
        $(".home-hero-container .swiper-button-next, .home-hero-container .swiper-button-prev").click(function(){
            if($(this).attr("class") == "swiper-button-prev"){
                iNow--;
            }else{
                iNow++;  
            }
            tab();
        });
    }

    //侧边栏数据下载与加载
    function leftNavDownload(){
        $.ajax({
            type: "get",
            url: "data/nav.json",
            success: function(result){
                var sideArr = result.sideNav;
                for(var i = 0; i < sideArr.length; i++){
                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix"></div>
                    </li>`);
                    node.appendTo("#J_categoryList");

                    var childArr = sideArr[i].child;
                    //确定列数，向上取整
                    var col = Math.ceil(childArr.length / 6);
                    node.find("div.children").addClass("children-col-" + col);

                    for(var j = 0; j < childArr.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }

    //侧边栏添加移入移出效果
    function leftNavTab(){
        $("#J_categoryList").on("mouseenter", ".category-item", function(){
            $(this).addClass("category-item-active");
        });
        $("#J_categoryList").on("mouseleave", ".category-item", function(){
            $(this).removeClass("category-item-active");
        });
    }

    //顶部导航栏数据下载预加载
    function topNavDownload(){
        $.ajax({
            type: "get",
            url: "data/nav.json",
            success: function(result){
                var topNavArr = result.topNav;
                topNavArr.push({title: "服务"}, {title: "社区"});
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                        <span class="text">${topNavArr[i].title}</span>
                    </a> 
                    </li>`).appendTo(".site-header .header-nav .nav-list");

                    if(i < topNavArr.length - 2){
                        var node = $(`<ul class = 'children-list clearfix' style = "display: none"></ul>`)
                        node.appendTo("#J_navMenu .container");
                        var childsArr = topNavArr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }

    //顶部导航栏鼠标移入移出
    function topNavTab(){
        $(".site-header .header-nav .nav-list").on("mouseenter", "li.nav-item", function(){
            var index = $(this).index() - 1;
            $(this).addClass("nav-item-active");
            if(index < 7){
                $("#J_navMenu").addClass("slide-down").css("display", "block").removeClass("slide-up");
                $("#J_navMenu ul").eq(index).css("display", "block").siblings().css("display", "none");
            }else{
                $("#J_navMenu").addClass("slide-up").css("display", "block").removeClass("slide-down");
            }
        });

        $(".site-header .header-nav .nav-list").on("mouseleave", "li.nav-item", function(){
            $(this).removeClass("nav-item-active");
        });

        $("#J_navMenu, .site-header").mouseleave(function(){
            $("#J_navMenu").addClass("slide-up").css("display", "block").removeClass("slide-down");
        });
    }

    //顶部搜索框
    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        });
    }

    //商品列表页侧边栏划入划出
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter", "#J_navCategory", function(){
            $(this).find("div.site-category").css("display", "block");
            $("#J_navMenu").addClass("slide-up").css("display", "block").removeClass("slide-down");
        });
        $(".header-nav .nav-list").on("mouseleave", "#J_navCategory", function(){
            $(this).find("div.site-category").css("display", "none");
        });
    }

    return {
        //下载轮播图
        download: download,
        //轮播图效果实现
        banner: banner,
        //侧边栏添加移入移出效果
        leftNavTab: leftNavTab,
        //顶部导航栏鼠标移入移出
        topNavTab: topNavTab,
        //顶部搜索框
        searchTab: searchTab,
        //顶部导航栏数据下载预加载
        topNavDownload: topNavDownload,
        //侧边栏栏数据下载预加载
        leftNavDownload: leftNavDownload,
        //商品列表页侧边栏划入划出
        allGoodsTab: allGoodsTab
    }
});