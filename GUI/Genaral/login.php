<?php
if (isset($_SESSION['username'])) {
   $username = $_SESSION['username'];
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
                  logElement.innerHTML = '<p>Hi,$username</p><a href=\"./Genaral/userInformation.php\">Thông tin</a><a href=\"./Genaral/logout.php\">Đăng xuất</a>';
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
