<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>

<!-- sửa từng chi tiết hóa đơn -->
<?php
$sql = "UPDATE `chi_tiet_phieu_muon` 
SET MA_SP = '{$_POST['MASP_new']}', GHI_CHU_TRUOC_MUON = '{$_POST['ghichu_trc']}', GHI_CHU_SAU_MUON = '{$_POST['ghichu_sau']}'
WHERE MA_PM = '{$_POST['MAPM']}' AND MA_SP = '{$_POST['MASP_old']}' ";

    $connect->query($sql);
?>

<!-- xóa từng chi tiết hóa đơn -->
<?php
$sql = "DELETE FROM `chi_tiet_phieu_muon` WHERE MA_PM = '{$_POST['MAPM_xoa']}' AND MA_SP = '{$_POST['MASP_xoa']}'";
    $connect->query($sql);
?>