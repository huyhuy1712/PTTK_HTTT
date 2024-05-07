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
      <form class="login-form" id="login-form" method="POST">
         <h1>Đăng nhập</h1>
         <div class="form-input">
            <label for="">Tài Khoản:</label>
            <input placeholder="Căn cước công dân" type="text" id="text_username_login" name="text_username_login">
            <div id="empty-username-error-massage" style="display: none; color: red;">Tài khoản phải có đủ 12 số</div>
         </div>
         <div class="form-input">
               <label for="">Mật khẩu:</label>
               <input placeholder="Số điện thoại" type="password" id="text_password_login" name="text_password_login"> 
            <span id="togglePassword" onclick="togglePasswordVisibility()" style="position: absolute; right: 10px; top: 35px;">
            <i id="eyeIcon" class="fa fa-eye"></i> </span>
               <div id="empty-password-error-massage" style="display: none; color: red;">Mật khẩu phải có đủ 10 số</div>
         </div>

               <div class="just-a-line"></div>
               <button class="login-button">ĐĂNG NHẬP</button>
               <label class="registor" for="">Chưa có tài khoản? <a href="Signup.php">đăng ký</a></label>
      </form>
   </div>

   <script src="https://kit.fontawesome.com/dc0a01535c.js" crossorigin="anonymous"></script>
</body>

</html>


<script>


 //chức năng hiện thị mật khẩu
 function togglePasswordVisibility() {
    var passwordField = document.getElementById("text_password_login");
    var eyeIcon = document.getElementById("eyeIcon");
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
}

function checking(){

   let username = document.getElementsByName('text_username_login')[0];
   let password = document.getElementsByName('text_password_login')[0];

      if (username.value === "" || !isValidString_username(username.value)) {
         document.getElementById('empty-username-error-massage').style.display = "block";
         return false;
      } else {
         document.getElementById('empty-username-error-massage').style.display = "none";
      }

      if (password.value === "" || !isValidString_pass(password.value)) {
         document.getElementById('empty-password-error-massage').style.display = "block";
         return false;
      } else {
         document.getElementById('empty-password-error-massage').style.display = "none";
      }
         return true;
   }


   function isValidString_username(input) {
    // Kiểm tra độ dài chuỗi
    if (input.length !== 12) {
        return false;
    }

    // Kiểm tra ký tự đặc biệt
    var regex = /^[a-zA-Z0-9]+$/; // Chỉ chấp nhận chữ cái và số
    if (!regex.test(input)) {
        return false;
    }

    return true;
}

function isValidString_pass(input) {
    // Kiểm tra độ dài chuỗi
    if (input.length !== 10) {
        return false;
    }

    // Kiểm tra ký tự đặc biệt
    var regex = /^[a-zA-Z0-9]+$/; // Chỉ chấp nhận chữ cái và số
    if (!regex.test(input)) {
        return false;
    }

    return true;
}

document.querySelector('.login-button').addEventListener('click', function(event){
   event.preventDefault();
   if(checking()){
      var operation = "Read";
      var tableName = "tai_khoan";
      var condition = "";
      $.ajax({
         url: '../AJAX_PHP/CRUD.php',
         type: 'POST',
         dataType: 'json',
         data: {
            operation: operation,
            tableName: tableName,
            condition: condition
         },
         success: function(response){
            var check = false;
            let username = document.getElementsByName('text_username_login')[0].value;
            let password = document.getElementsByName('text_password_login')[0].value;

            for(var i = 0; i < response.length; i++){
               if(response[i].CCCD === username && response[i].SDT === password){
                  if(response[i].TINH_TRANG == 0){
                     check = true;
                     alert("Tài khoản chưa được kích hoạt !!");
                  }
                  else{
                     check = true;
                     localStorage.setItem('page','Sản phẩm');
   
                     if(response[i].LOAI == "Khách Hàng"){
                        localStorage.setItem('account_curr',response[i].MA_TK);
                        window.location.href = "Main.php"; 
                     }
                     else{
                        localStorage.setItem('account_curr_NV',response[i].MA_TK);
                        window.location.href = "../ADMIN/index_admin.php";
                     }
                  }
               }
            }

            if(!check){
               alert('Tài khoản không tồn tại !!');
            }
         },
         error: function(xhr, status, error) {
            console.log(error);
         }
      });
   }
});


</script>