<?php
session_start();
// $userID = $_SESSION['ID_ACCOUNT'];
$userID = 5;
require '../Model/Database.php';
$connect = new MyConnection('localhost', 'root', '', 'ql_thu_vien');
$connect->connectDB();


$users = $connect->read("tai_khoan", "MA_TK = ". $userID);
reset($users);
$user = current($users);



$data = array(
    'tai_khoan' => $user ,
);

echo json_encode($data);
