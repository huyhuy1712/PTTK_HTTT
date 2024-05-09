<?php
require 'connect.php';
require 'session.php';
global $ss;
$ss = new Session();
$ss ->start();
function SignupUser($id, $sdt, $address, $fullname)
{
    if(empty($id) || empty($sdt) || empty($address) || empty($fullname)){
        echo json_encode(array("status" => 0, "message" => "empty_fields"));
        exit();
    }
    $db = new DatabaseUtil();
    $conn = $db->connect();

    // Lấy mã tài khoản lớn nhất từ cơ sở dữ liệu
    $query_max_id = "SELECT MAX(MA_TK) AS max_id FROM tai_khoan";
    $result_max_id = $db->executeQuery($query_max_id);
    $row = $result_max_id->fetch_assoc();
    $max_id = $row['max_id'];
    // Tăng mã tài khoản lớn nhất lên 1 và gán vào biến $id_taikhoan
    $id_taikhoan = $max_id + 1;

    // Lấy ngày hiện tại và cộng thêm 10 ngày
    $date = date('Y-m-d', strtotime('+365 days'));

    // Thực hiện truy vấn để thêm tài khoản mới vào cơ sở dữ liệu
    $query_taikhoan = "INSERT INTO tai_khoan(MA_TK, CCCD, SDT, Dia_Chi, Ho_Ten, Diem, NGAY_HET_HAN, LOAI, TINH_TRANG, DIEM_DA_TICH_LUY_TRONG_TUAN) VALUES ('$id_taikhoan','$id','$sdt', '$address', '$fullname', 0, '$date','Khách Hàng', 0, 10)";

    $query_check_exist_account = "SELECT * FROM tai_khoan WHERE CCCD='$id'";
    $result_check_exist_account = $db->executeQuery($query_check_exist_account);

    if ($result_check_exist_account->num_rows > 0) {
        echo json_encode(array("status" => 0, "message" => "exist-account_error"));
        exit();
    } else {
        $db->executeQuery($query_taikhoan);
        echo json_encode(array("status" => 1, "message" => "signup_success"));
        exit();
    }
}


function LoginUser($username, $password)
{
    if(empty($username) || empty($password)){
        echo json_encode(array("status" => 0, "message" => "empty_error"));
        exit();
    }
    $db = new DatabaseUtil();
    $conn = $db->connect();
    global $ss;
    $query = "SELECT * FROM tai_khoan WHERE CCCD='$username'";
    $result = $db->executeQuery($query);
    $user = $result->fetch_assoc();
    if ($result->num_rows == 0) {
        echo json_encode(array("status" => 0, "message" => "do-not-exist_error"));
        exit();
    } elseif ($password !== $user['SDT']) {
        echo json_encode(array("status" => 0, "message" => "password_error"));
        // Mật khẩu không đúng, trả về thông báo lỗi
        // header("Location: ../login.php?error=password_mismatch");
        exit();
    }elseif($user['TINH_TRANG'] == 0){
        echo json_encode(array("status" => 0, "message" => "active_error"));
        exit();
    }

    $active_user = 1;
    $username = @mysqli_real_escape_string($conn, $_POST['text_username_login']);
    $password = @mysqli_real_escape_string($conn, $_POST['text_password_login']);
    $query_check_exist_user = mysqli_query($conn, "SELECT * FROM tai_khoan WHERE CCCD = '$username'");
    if (mysqli_num_rows($query_check_exist_user)) {
        $query_check_login = mysqli_query($conn, "SELECT * FROM tai_khoan WHERE CCCD = '$username' AND SDT = '$password' AND TINH_TRANG = '$active_user'");
        if (mysqli_num_rows($query_check_login)) {
            $ss->set('username', $username);
            echo json_encode(array("status" => 1, "message" => "login_success"));
            exit();
        }
    }
}

if (isset($_POST['text_remember'])) {
    setcookie('remembered_username', $_POST['text_username_login'], time() + (86400 * 30), "/");
    setcookie('remembered_username', $_POST['text_password_login'], time() + (86400 * 30), "/");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['text_id']) && isset($_POST['text_phonenums']) && isset($_POST['text_address']) && isset($_POST['text_fullname'])) {
        SignupUser($_POST['text_id'], $_POST['text_phonenums'], $_POST['text_address'], $_POST['text_fullname']);
    }
    if (isset($_POST['text_username_login']) && isset($_POST['text_password_login'])) {
        LoginUser($_POST['text_username_login'], $_POST['text_password_login']);
    }
}