define(["jquery"], function($){
    function register(){
        $("#register-button").click(function(){
            $.ajax({
                type: "post",
                url: "php/register.php",
                data: {
                    username: $("#username").val(),
                    password: $(".item_account").eq(1).val(),
                    repassword: $(".item_account").eq(2).val(),
                    createtime: (new Date()).getTime()
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").find("em").attr("class", "icon_error")
                    }else{
                        $(".err_tip").find("em").attr("class", "icon_select icon_true");
                        $(".err_tip").show().find("span").css("color", "green");
                        setTimeout(function(){
                            location.assign("login.html");
                        }, 1000);
                    }
                    $(".err_tip").show().find("span").html(obj.message);
                },
                error: function(msg){
                    console.log(msg);
                }
            });
        });
    }

    return {
        register: register
    }
});