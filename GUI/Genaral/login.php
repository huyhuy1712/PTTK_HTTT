<?php
if (isset($_SESSION['username'])) {
   $username = $_SESSION['username'];
<<<<<<< HEAD
=======
   
   // Kết nối đến cơ sở dữ liệu
   $db = new DatabaseUtil();
   $conn = $db->connect();

   // Truy vấn để lấy thông tin tài khoản từ CCCD
   $query = "SELECT * FROM tai_khoan WHERE CCCD='$username'";
   $result = $db->executeQuery($query);

   if ($result->num_rows > 0) {
       // Lấy thông tin tài khoản
       $row = $result->fetch_assoc();
       $diem = $row['DIEM']; // Lấy giá trị điểm từ cơ sở dữ liệu

       // Hiển thị điểm trong HTML
       echo "<script>
               document.addEventListener('DOMContentLoaded', function() {
                   document.querySelector('.point').textContent = 'Điểm: $diem';
               });
             </script>";
   }
}

if (isset($_SESSION['username'])) {
   $username = $_SESSION['username'];
>>>>>>> main
   echo "<script>
            document.querySelector('.user').addEventListener('click', () => {
               const userSelection = document.querySelector('.user-selection');
               const logElement = document.querySelector('.log');
               const unlogElement = document.querySelector('.unlog');
               if (userSelection.style.display === 'block') {
                  userSelection.style.display = 'none';
               } else {
                  unlogElement.style.display = 'none';
                  userSelection.style.display = 'block';
                  logElement.style.display = 'block';
<<<<<<< HEAD
                  logElement.innerHTML = '<p>Hi,$username</p><a href=\"./Genaral/userInformation.php\">Thông tin</a><a href=\"./Genaral/logout.php\">Đăng xuất</a>';
=======
                  logElement.innerHTML = '<p>Hi,$username</p><a href=\"./Genaral/logout.php\">Đăng xuất</a>';
>>>>>>> main
               }
            });
         </script>";
} else {
   echo "<script>
            document.querySelector('.user').addEventListener('click', () => {
               const userSelection = document.querySelector('.user-selection');
               const unlogElement = document.querySelector('.unlog');
               if (userSelection.style.display === 'block') {
                  userSelection.style.display = 'none';
               } else {
                  userSelection.style.display = 'block';
                  unlogElement.style.display = 'block';
               }
            });
         </script>";
}
?>
