<?php include './Genaral/general.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
   <link rel="stylesheet" href="./CSS/MainCSS/font&sizing.css">
   <link rel="stylesheet" href="./CSS/Login-SignupCSS/Login.css">
   <script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
   <div>
      <form class="login-form" id="login-form" action="./Genaral/xuly_login_signup.php" , method="POST">
         <h1>Đăng nhập</h1>
         <div class="form-input">
            <label for="">Tài Khoản:</label>
            <input placeholder="Căn cước công dân" type="text" id="text_username_login" name="text_username_login" onchange="checking()">
            <div id="empty-username-error-massage" style="display: none; color: red;" ">Tài khoản không được để trống</div>
         </div>
         <div class=" form-input">
               <label for="">Mật khẩu:</label>
               <input placeholder="Số điện thoại" type="password" id="text_password_login" name="text_password_login" onchange="checking()">
               <div id="empty-password-error-massage" style="display: none; color: red;" ">Mật khẩu không được để trống</div>
         </div>
         <div class=" remember-fogot">
                  <label for="">
                     <input class="rememberme" type="checkbox" name="text_remember">
                     Lưu mật khẩu
                  </label>
                  <a class="fogot-password" href="">Quên mật khẩu</a>
               </div>
               <div class="just-a-line"></div>
               <button class="login-button" type="submit" name="login-button">ĐĂNG NHẬP</button>
               <label class="registor" for="">Chưa có tài khoản? <a href="Signup.php">đăng ký</a></label>
      </form>
   </div>

   <script src="https://kit.fontawesome.com/dc0a01535c.js" crossorigin="anonymous"></script>
</body>

</html>

<script>
   $("#login-form").on("submit", function(event) {
      event.preventDefault();
      $.ajax({
         type: "POST",
         url: './Genaral/xuly_login_signup.php',
         data: $(this).serializeArray(),
         success: function(response) {
            console.log("response: ", response);
            // Kiểm tra phản hồi từ máy chủ
            var responseObject = JSON.parse(response);
            // Kiểm tra phản hồi từ máy chủ
            if (responseObject.status === 1 && responseObject.message === 'login_success') {
               alert("Đăng nhập thành công");
               window.location.href = "./Main.php";
            }else if (responseObject.status === 0 && responseObject.message === 'password_error') {
               alert("Tên đăng nhập hoặc mật khẩu hông đúng");
            } else if(responseObject.status === 0 && responseObject.message === 'do-not-exist_error') {
               alert("Tài khoản không tồn tại");
            } else if (responseObject.status === 0 && responseObject.message === 'active_error') {
               alert("Tài khoản chưa được kích hoạt");
            }
         }
      });
   });
</script>


<script>
   function checking(){
      let username = document.getElementsByName('text_username_login')[0];
      let password = document.getElementsByName('text_password_login')[0];

      if (username.value === "") {
         document.getElementById('empty-username-error-massage').style.display = "block";
      } else {
         document.getElementById('empty-username-error-massage').style.display = "none";
      }

      if (password.value === "") {
         document.getElementById('empty-password-error-massage').style.display = "block";
      } else {
         document.getElementById('empty-password-error-massage').style.display = "none";
      }
   }
</script>