<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>



<!-- sửa từng chi tiết -->
<?php
$sql = "UPDATE `chi_tiet_phieu_nhap` 
        SET DON_GIA = '{$_POST['DONGIA_update']}', SL = '{$_POST['SO_LUONG_update']}', THANH_TIEN = '{$_POST['THANHTIEN_update']}', MA_SP = '{$_POST['MASP_update']}'
        WHERE MA_PN = '{$_POST['MAPN_update']}' AND MA_SP = '{$_POST['MASP_old']}' ";
    $connect->query($sql);
    ?>


    <!-- xóa từng chi tiết -->
<?php
    $sql = "DELETE FROM `chi_tiet_phieu_nhap` WHERE MA_PN = '{$_POST['MAPN']}' AND MA_SP = '{$_POST['MASP']}'";
        $connect->query($sql);
    ?> 