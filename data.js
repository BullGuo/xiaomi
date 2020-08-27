define(["jquery"], function($){
    //下载主页数据
    function download(){
       $.ajax({
            type: "get",
            url: "data/data.json",
            success: function(result){
                //第一组数据
                var dataArr = result[0];
                var node = $(`<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
                        </a>
                    </div>
                    <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
                        <div class = 'box-hd'>
                            <h2 class = 'title'>${dataArr.title}</h2>
                            <div class = "more">
                                <a href="#" class = 'more-link'>
                                    查看全部
                                    <i class = 'iconfont iconfont-arrow-right-big'></i>
                                </a>
                            </div>
                        </div>
                        <div class = 'hox-bd clearfix'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item brick-item-l'>
                                            <a href="#">
                                                <img src="${dataArr.img}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <ul class = 'brick-list clearfix'></ul>
                                </div>
                            </div>
                        </div>
                    </div>`);
                node.appendTo(".page-main .container");
                for(var i = 0; i < dataArr.childs.length; i++){
                    $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                            <a href="#">
                                <div class = 'figure figure-img'>
                                    <img width="160" height="160" src="${dataArr.childs[i].img}" alt=""/>
                                </div>
                                <h3 class = 'title'>
                                    ${dataArr.childs[i].title}
                                </h3>
                                <p class = 'desc'>${dataArr.childs[i].desc}</p>
                                <p class = 'price'>
                                    <span class = 'num'>${dataArr.childs[i].price}</span>
                                    元
                                    <span>起</span>
                                    ${dataArr.childs[i].del == 0 ? "" : "<del>dataArr.childs[i].del</del>"}
                                </p>
                            </a>
                        </li>`).appendTo(node.find(".hox-bd .span16 ul"));
                }

                //第一组之后的数据
                for(var j = 1; j < result.length; j++){
                    var node2 = $(`<div class = 'home-banner-box'>
                                <a href="#">
                                    <img src="${result[j].topImg}" alt=""/>
                                </a>
                            </div>
                            <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                                <div class = 'box-hd clearfix'>
                                    <h2 class = 'title'>${result[j].title}</h2>
                                    <div class = 'more'>
                                        <ul class = 'tab-list'>
                                            <li class = 'tab-active'>
                                                热门
                                            </li>
                                            <li>
                                                ${result[j].subTitle}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class = 'box-bd'>
                                    <div class = 'row'>
                                        <div class = 'span4'>
                                            <ul class = 'brick-promo-list clearfix'>
                                                <li class = 'brick-item  brick-item-m'>
                                                    <a href="#">
                                                        <img src="${result[j].leftChilds[0]}" alt=""/>
                                                    </a>
                                                </li>
                                                <li class = 'brick-item  brick-item-m'>
                                                    <a href="#">
                                                        <img src="${result[j].leftChilds[1]}" alt=""/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class = 'span16'>
                                            <ul class = "brick-list clearfix"></ul>
                                            <ul class = "brick-list clearfix hide"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
                    node2.appendTo(".page-main .container");
                    for(var k = 0; k < result[j].hotChilds.length; k++){
                        if(k < result[j].hotChilds.length - 1){
                            $(`<div>
                                    <li class = 'brick-item brick-item-m brick-item-m-2'>
                                        <a href="#">
                                            <div class = 'figure figure-img'>
                                                <img width="160" height="160" src="${result[j].hotChilds[k].img}" alt=""/>
                                            </div>
                                            <h3 class = 'title'>${result[j].hotChilds[k].title}</h3>
                                            <p class = 'desc'>${result[j].hotChilds[k].desc}</p>
                                            <p class = 'price'>
                                                <span class = 'num'>${result[j].hotChilds[k].price}</span>元
                                                ${result[j].hotChilds[k].del == 0 ? "" : "<del><span class = 'num'>result[j].hotChilds[k].del</span>元</del>"}
                                            </p>
                                        </a>
                                    </li>
                            </div>`).appendTo(node2.find(".box-bd .span16 ul").eq(0));
                        }else{
                            $(`<div>
                                <li class = 'brick-item brick-item-s'>
                                    <a href="#">
                                        <div class = 'figure figure-img'>
                                            <img width="80" height="80" src="${result[j].hotChilds[k].img}" alt=""/>
                                        </div>
                                        <h3 class = 'title'>${result[j].hotChilds[k].title}</h3>
                                        <p class = 'desc'>${result[j].hotChilds[k].desc}</p>
                                        <p class = 'price'>
                                            <span class = 'num'>${result[j].hotChilds[k].price}</span>元
                                            <span>起</span>
                                        </p>
                                    </a>
                                </li>
                            </div>`).appendTo(node2.find(".box-bd .span16 ul").eq(0));
                        }
                        
                    }
                    for(var l = 0; l < result[j].childs.length; l++){
                        if(l < result[j].childs.length - 1){
                            $(`<div>
                                    <li class = 'brick-item brick-item-m brick-item-m-2'>
                                        <a href="#">
                                            <div class = 'figure figure-img'>
                                                <img width="160" height="160" src="${result[j].childs[l].img}" alt=""/>
                                            </div>
                                            <h3 class = 'title'>${result[j].childs[l].title}</h3>
                                            <p class = 'desc'>${result[j].childs[l].desc}</p>
                                            <p class = 'price'>
                                                <span class = 'num'>${result[j].childs[l].price}</span>元
                                                ${result[j].childs[l].del == 0 ? "" : "<del><span class = 'num'>result[j].hotChilds[k].del</span>元</del>"}
                                            </p>
                                        </a>
                                    </li>
                            </div>`).appendTo(node2.find(".box-bd .span16 ul").eq(1));
                        }else{
                            $(`<div>
                                    <li class = 'brick-item brick-item-s'>
                                        <a href="#">
                                            <div class = 'figure figure-img'>
                                                <img width="80" height="80" src="${result[j].childs[l].img}" alt=""/>
                                            </div>
                                            <h3 class = 'title'>${result[j].childs[l].title}</h3>
                                            <p class = 'desc'>${result[j].childs[l].desc}</p>
                                            <p class = 'price'>
                                                <span class = 'num'>${result[j].childs[l].price}</span>元
                                                <span>起</span>
                                            </p>
                                        </a>
                                    </li>
                            </div>`).appendTo(node2.find(".box-bd .span16 ul").eq(1));
                        }
                    }
                    $(`<li class = 'brick-item brick-item-s'>
                            <a href="#">
                                <div class = 'figure figure-more'>
                                    <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                </div>
                                <div class = 'more'>
                                    浏览更多
                                    <small>${result[j].subTitle}</small>
                                </div>
                            </a>
                    </li>`).appendTo(node2.find(".span16 .brick-list"));
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }

    //鼠标移入移出效果
    function tabMenu(){
        $(".page-main .container").on("mouseenter", "ul.tab-list li", function(){
            $(this).addClass("tab-active").siblings().removeClass();
            $(this).closest(".home-brick-box").find(".box-bd .span16 ul").addClass("hide").eq($(this).index()).removeClass("hide");
        });
    }

    return {
        download: download,
        tabMenu: tabMenu
    }
})