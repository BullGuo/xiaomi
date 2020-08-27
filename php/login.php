<?php
    header("Content-type:text/html;charset=utf-8");

    //统一发返回格式
    $responseData = array("code" => 0, "message" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];
	
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

    //  查询数据库
    $link = mysql_connect("localhost", "root", "123456");
    
    //2、判断是否连接成功
    if(!$link){
        $responseData['code'] = 3;
		$responseData['message'] = "数据库连接失败";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
    }

    //3、设置字符集
    mysql_set_charset("utf8");
    
	//4、选择数据库
	mysql_select_db("xiaomi");

	// 密码md5加密
	$password = md5(md5($password)."xxx")."zzz";

	// 验证用户是否存在
	$sql1 = "SELECT * FROM users WHERE username='{$username}'";
	
	$res1 = mysql_query($sql1);
	// 得到一条结果
	$row1 = mysql_fetch_assoc($res1);
	if(!$row1){
		$responseData['code'] = 4;
		$responseData['message'] = "用户不存在";
		//返回到前台页面
		echo json_encode($responseData);
		exit;
	}else{		// 账号存在，查询账号密码，验证密码是否正确
		if($row1['password'] !== $password){
			$responseData['code'] = 5;
			$responseData['message'] = "登录失败,密码错误";
			//返回到前台页面你
			echo json_encode($responseData);
			exit;
		}else{
			$responseData['message'] = "登录成功";
			//返回到前台页面你
			echo json_encode($responseData);
		}
	}
    
    //关闭数据库
	mysql_close($link);
    
?>