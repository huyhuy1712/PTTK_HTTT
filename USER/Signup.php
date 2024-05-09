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
            <input placeholder="ID" type="text" name="text_id" id="text_id" oninput="checkId()">
            <div id="empty-error-id" style="display: none; color: red;" ">CCCD không được để trống</div>
            <div id="require-error-cccd" style="display: none; color: red;" ">Căn cước công dân phải 12 số</div>
         </div>
         <div class=" form-input">
            <label for="">Số điện thoại:</label>
            <input placeholder="Phone Numbers" type="text" name="text_phonenums" id="text_phonenums" oninput="checkPhone()">
            <div id="empty-error-phone" style="display: none; color: red;">Số điện thoại không được để trống</div>
            <div id="dismatch_phoneNumber" style="display: none; color: red;">Số điện thoại phải 10 số và bắt đầu bằng 0</div>
         </div>
         <div class="form-input">
            <label for="">Địa chỉ:</label>
            <input placeholder="Address" type="text" name="text_address" id="text_address" oninput="checkAddress()">
            <div id="empty-error-address" style="display: none; color: red;">Địa chỉ không được để trống</div>
         </div>
         <div class="form-input">
            <label for="">Nhập họ tên:</label>
            <input placeholder="Fullname" type="text" name="text_fullname" id="text_fullname" oninput="checkName()">
            <div id="empty-error-name" style="display: none; color: red;">Họ tên không được để trống</div>
         </div>
         <div class="just-a-line">
         </div>
         <button type="submit" class="signup-button" name="signup-button">ĐĂNG KÝ</button>
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
            } else if(responseObject.status === 0 && responseObject.message === 'empty_fields'){
               alert("Vui lòng điền đủ thông tin");
            }
         }
      });
   });
</script>

<script>
   function checkId() {
      let id = document.getElementById('text_id');
      var regexID = /^\d{12}$/;
      if (id.value === "") {
         document.getElementById('empty-error-id').style.display = 'block';
         document.getElementById('require-error-cccd').style.display = 'none';
      } else if (!regexID.test(id.value)) {
         document.getElementById('empty-error-id').style.display = 'none';
         document.getElementById('require-error-cccd').style.display = 'block';
      } else {
         document.getElementById('empty-error-id').style.display = 'none';
         document.getElementById('require-error-cccd').style.display = 'none';
      }
   }

   function checkPhone() {
      let sdt = document.getElementById('text_phonenums');
      var regexPhone_Number = /^0\d{9}$/;
      if (sdt.value === "") {
         document.getElementById('empty-error-phone').style.display = 'block';
         document.getElementById('dismatch_phoneNumber').style.display = 'none';
      } else if (!regexPhone_Number.test(sdt.value)) {
         document.getElementById('dismatch_phoneNumber').style.display = 'block';
         document.getElementById('empty-error-phone').style.display = 'none';
      } else {
         document.getElementById('dismatch_phoneNumber').style.display = 'none';
         document.getElementById('empty-error-phone').style.display = 'none';
      }
   }

   function checkAddress() {
      let address = document.getElementById('text_address');
      if (address.value === "") {
         document.getElementById('empty-error-address').style.display = 'block';
      } else {
         document.getElementById('empty-error-address').style.display = 'none';
      }
   }

   function checkName() {
      let fullname = document.getElementById('text_fullname');
      if (fullname.value === "") {
         document.getElementById('empty-error-name').style.display = 'block';
      } else {
         document.getElementById('empty-error-name').style.display = 'none';
      }
   }
</script>

</html>