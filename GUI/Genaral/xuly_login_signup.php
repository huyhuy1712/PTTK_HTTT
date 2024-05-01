<?php
require 'connect.php';
require 'session.php';
global $ss;
$ss = new Session();
$ss ->start();
function SignupUser($id, $sdt, $address, $fullname)
{
    $db = new DatabaseUtil();
    $conn = $db->connect();
    $query = "SELECT * FROM tai_khoan WHERE CCCD='$id'";
    $result = $db->executeQuery($query);
    $query_taikhoan = "INSERT INTO tai_khoan(CCCD, SDT, Dia_Chi, Ho_Ten, Diem) VALUES ('$id','$sdt', '$address', '$fullname', 0)";
    if ($result->num_rows > 0) {
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
    $db = new DatabaseUtil();
    $conn = $db->connect();
    global $ss;
    $query = "SELECT * FROM tai_khoan WHERE CCCD='$username'";
    // code moi
    $username = @mysqli_real_escape_string($conn, $_POST['text_username_login']);
    $password = @mysqli_real_escape_string($conn, $_POST['text_password_login']);
    $query_check_exist_user = mysqli_query($conn, "SELECT * FROM tai_khoan WHERE CCCD = '$username'");
    if (mysqli_num_rows($query_check_exist_user)) {
        $query_check_login = mysqli_query($conn, "SELECT * FROM tai_khoan WHERE CCCD = '$username' AND SDT = '$password'");
        if (mysqli_num_rows($query_check_login)) {
            $ss->set('username', $username);
            echo json_encode(array("status" => 1, "message" => "login_success"));
            exit();
        }
    }
    // code moi
    $result = $db->executeQuery($query);
    $user = $result->fetch_assoc();
    if ($result->num_rows == 0) {
        echo json_encode(array("status" => 0, "message" => "do-not-exist_error"));
        // Tài khoản không tồn tại, trả về thông báo lỗi
        // header("Location: ../login.php?error=username_not_found");
        exit();
    } elseif ($password !== $user['MatKhau']) {
        echo json_encode(array("status" => 0, "message" => "password_error"));
        // Mật khẩu không đúng, trả về thông báo lỗi
        // header("Location: ../login.php?error=password_mismatch");
        exit();
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


if ($ss->exist('username')) { // Sử dụng session thông qua session manager
    $username = $ss->get('username');
    echo json_encode(array("status_log" => 1, "message" => "logged_in", "username" => $username));
} else {
    echo json_encode(array("status_log" => 0, "message" => "not_logged_in", "username" => ""));
}