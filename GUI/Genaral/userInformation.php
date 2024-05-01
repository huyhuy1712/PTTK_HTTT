<?php
include 'Connect.php';
include 'session.php';
session_start();
$db = new DatabaseUtil();
$conn = $db -> connect();
$ss = new Session();

if ($ss ->exist('username')){
    $username = $ss ->get('username');

    $sql_exist = "SELECT * FROM taikhoan WHERE tenDanhNhap = '$username'";
    $result_exist = mysqli_query($conn, $sql_exist);

    if(mysqli_num_rows($result_exist) > 0){
        $sql_reveal = "SELECT * FROM khachhang WHERE idKhachHang = '$username'";
        $result_reveal = mysqli_query($conn, $sql_reveal);
        while ($row = mysqli_fetch_assoc($result_reveal)) {
            $name = $row['ten']; // Đổi 'name' thành cột chứa tên của người dùng trong cơ sở dữ liệu
            $email = $row['email']; // Đổi 'email' thành cột chứa email của người dùng trong cơ sở dữ liệu

            // Hiển thị thông tin của người dùng
            echo "<p>Tên: $name</p>";
            echo "<p>Email: $email</p>";
        }
    }else{
        echo "Không tìm thấy thông tin người dùng.";
    }
} 
$db -> close();
?>