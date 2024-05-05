<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
   <link rel="stylesheet" href="./CSS/MainCSS/font&sizing.css">
   <link rel="stylesheet" href="./CSS/Login-SignupCSS/Signup.css">
   <script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
   <form class="signup-form" id="signup-form" action="./Signup.php" method="POST">
      <h1>Đăng ký</h1>
         <div class="form-input">
            <label for="">Căn cước công dân:</label>
            <input placeholder="ID" type="text" name="text_id" id="text_id" onchange="checking()">
            <div id="empty-error-id" style="display: none; color: red;" ">CCCD không được để trống</div>
            <div id="require-error-cccd" style="display: none; color: red;" ">Căn cước công dân phải 10 số</div>
         </div>
         <div class=" form-input">
            <label for="">Số điện thoại:</label>
            <input placeholder="Phone Numbers" type="text" name="text_phonenums" id="text_phonenums" onchange="checking()">
            <div id="empty-error-phone" style="display: none; color: red;">Số điện thoại không được để trống</div>
            <div id="dismatch_phoneNumber" style="display: none; color: red;">Số điện thoại phải 10 số và bắt đầu bằng 09</div>
         </div>
         <div class="form-input">
            <label for="">Địa chỉ:</label>
            <input placeholder="Address" type="text" name="text_address" id="text_address" onchange="checking()">
            <div id="empty-error-address" style="display: none; color: red;">Địa chỉ không được để trống</div>
         </div>
         <div class="form-input">
            <label for="">Nhập họ tên:</label>
            <input placeholder="Fullname" type="text" name="text_fullname" id="text_fullname" onchange="checking()">
            <div id="empty-error-name" style="display: none; color: red;">Họ tên không được để trống</div>
         </div>
         <div class="reNameThis">
            <input class="abc" type="checkbox" name="policy_acception">
            <label>Chấp nhận <a href="">điều khoản.</a></label>
         </div>
         <div id="error-message-checkbox" style="display: none; color: red;">Chưa đồng ý với các điều khoản</div>
         <div class="just-a-line">
         </div>   
         <button type="submit" class="signup-button" name="signup-button">ĐĂNG KÝ</button>


         <!-- <div class="signup-with-wrapper">
            <a href="" class="signup-with Google">
               <img src="logo/google.svg" alt="">
               Google
            </a>
            <a href="" class="signup-with Facebook">
               <img src="logo/facebook.svg" alt="">
               Facebook
            </a>
         </div> -->
   </form>
</body>

<script>
   $("#signup-form").on("submit", function(event) {
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
            if (responseObject.status === 1 && responseObject.message === 'signup_success') {
               alert("Đăng ký thành công");
               window.location.href = "./Login.php";
            } else if (responseObject.status === 0 && responseObject.message === 'exist-account_error') {
               alert("Căn cước công dân đã được đăng ký");
               document.getElementsByName('text_id')[0].focus();
            }
         }
      });
   });
</script>

<script>
   function checking() {
      let id = document.getElementById('text_id');
      let sdt = document.getElementById('text_phonenums');
      let address = document.getElementById('text_address');
      let fullname = document.getElementById('text_fullname');

      var regexID = /^\d{12}$/;
      var regexPhone_Number = /^09\d{8}$/;

      if (id.value === "") {
         document.getElementById('empty-error-id').style.display = 'block';
         document.getElementById('require-error-cccd').style.display = 'none';
      } else if (!regexID.test(id.value)){
         document.getElementById('empty-error-id').style.display = 'none';
         document.getElementById('require-error-cccd').style.display = 'block';
      }else{
         document.getElementById('empty-error-id').style.display = 'none';
         document.getElementById('require-error-cccd').style.display = 'none';
      }

      if (sdt.value === "") {
         document.getElementById('empty-error-phone').style.display = 'block';
         document.getElementById('dismatch_phoneNumber').style.display = 'none';
      } else if (!regexPhone_Number.test(sdt.value)) {
         document.getElementById('dismatch_phoneNumber').style.display = 'block';
         document.getElementById('empty-error-phone').style.display = 'none';
      }else{
         document.getElementById('dismatch_phoneNumber').style.display = 'none';
         document.getElementById('empty-error-phone').style.display = 'none';
      }

      if (address.value === "") {
         document.getElementById('empty-error-address').style.display = 'block';
      } else {
         document.getElementById('empty-error-address').style.display = 'none';
      }

      if (fullname.value === "") {
         document.getElementById('empty-error-name').style.display = 'block';
      } else {
         document.getElementById('empty-error-name').style.display = 'none';
      }
   }
</script>

</html>