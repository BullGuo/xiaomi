<?php
    header("Content-type:text/html;charset=utf-8");

    //统一发返回格式
    $responseData = array("code" => 0, "message" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
	$create_time = $_POST['createtime'];
	
	if(!$username){
		$responseData['code'] = 1;
		$responseData['message'] = "用户名输入不能为空";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
	}
	if(!$password){
		$responseData['code'] = 2;
		$responseData['message'] = "密码输入不能为空";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
    }
    if(!$repassword){
		$responseData['code'] = 3;
		$responseData['message'] = "两次密码输入不一致";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
	}

    //  查询数据库
    $link = mysql_connect("localhost", "root", "123456");
    
    //2、判断是否连接成功
    if(!$link){
        $responseData['code'] = 4;
		$responseData['message'] = "服务器忙";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
    }

    //3、设置字符集
    mysql_set_charset("utf8");
    
	//4、选择数据库
	mysql_select_db("xiaomi");

	// 验证用户是否存在
	$sql1 = "SELECT * FROM users WHERE username='{$username}'";
	$res1 = mysql_query($sql1);
	$row = mysql_fetch_assoc($res1);
	if($row){
		$responseData['code'] = 5;
		$responseData['message'] = "用户已存在";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
	}

	// 密码md5加密
	$password = md5(md5($password)."xxx")."zzz";
	//5、准备sql语句
	$sql2 = "INSERT INTO users(username,password,createtime) VALUES('{$username}','{$password}','{$createtime}')";

	//6、发送sql语句 
    $res2 = mysql_query($sql2);

    if(!$res2){
		$responseData['code'] = 6;
		$responseData['message'] = "注册失败";
		//返回到前台页面你
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = "注册成功";
		//返回到前台页面你
		echo json_encode($responseData);
    }
    
    //关闭数据库
	mysql_close($link);
    
?>