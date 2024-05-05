<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>

<!-- sửa từng chi tiết hóa đơn -->
<?php
$sql = "UPDATE `chi_tiet_pheu_muon` 
SET MA_SP = '{$_POST['MASP_new']}', SL = '{$_POST['SL_new']}', DON_GIA = '{$_POST['dongia_new']}', THANH_TIEN = '{$_POST['thanhtien_new']}'
WHERE MA_HD = '{$_POST['MAHD']}' AND MA_SP = '{$_POST['MASP_old']}' ";

    $connect->query($sql);
?>

<!-- xóa từng chi tiết hóa đơn -->
<?php
$sql = "DELETE FROM `chi_tiet_pheu_muon` WHERE MA_PM = '{$_POST['MAPM_xoa']}' AND MA_SP = '{$_POST['MASP_xoa']}'";
    $connect->query($sql);
?>