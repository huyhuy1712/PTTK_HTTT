<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>

<div  class="change_page_thong_ke">
<form action="" method="POST">
   <input type="hidden" name="page" value="Kho">
    <input type="submit" value="thong_ke" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="thong_ke">
    <input type="submit" value="thống kê" id="btn2">
    </form>
</div>

<link rel="stylesheet" href="CSS/thong_ke.CSS">

<div id="form_thong_ke_admin">


<div class="items">
    <div class="title">Số phiếu mượn đã xuât trong tháng: </div>
    <?php $SL = 0;
    $thang_hien_tai = date('m');
foreach($connect->read('phieu_muon','TRANG_THAI = "1"') as $row){
    $dateComponents = explode("-", $row['NGAY_CAP']);
    $thang = $dateComponents[1];
   if($thang_hien_tai == $thang){
    $SL++;
   }
 }; 
?>
    <div id="phieu_muon">
    <?php echo $SL; ?> phiếu mượn đã được xuất trong tháng này
    </div>
</div>


<div class="items">

<?php $SL = 0;
    $thang_hien_tai = date('m');
foreach($connect->read('hoa_don','TRANG_THAI = "1"') as $row){
    $dateComponents = explode("-", $row['NGAY_TAO']);
    $thang = $dateComponents[1];
   if($thang_hien_tai == $thang){
    $SL++;
   }
 }; 
?>
    <div class="title">Số hóa đơn đã xuất trong tháng: </div>
    <div id="hoa_don"><?php echo $SL?> hóa đơn</div>
</div>
<div class="items">
    <div class="title">Doanh thu tháng này: </div>
    <?php
    $total = 0;
    $thang_hien_tai = date('m');
    foreach($connect->read('hoa_don','TRANG_THAI = "1"') as $row){
        $dateComponents = explode("-", $row['NGAY_TAO']);
        $thang = $dateComponents[1];
       if($thang_hien_tai == $thang){
        $total += $row['TONG_TIEN'];
       }
     };
    ?>
    <div  id="doanh_thu"><?php echo changePriceToString(strval($total)); ?></div>

</div>
<div class="items">
<div class="title">số tài khoản thư viện hiện có:</div> 
<?php $SL = 0;
foreach($connect->read('tai_khoan','TINH_TRANG = "1"') as $row){ $SL++; }; 
?>
<div  id="tai_khoan"><?php echo $SL ?> tài khoản đang hoạt động </div>

</div>

</div> 

<?php
// Hàm xử lí tiền
// 1000000 -> 1.000.000 đ
function changePriceToString($price) {
    $s = "";
    $temp = 0;
    $flag = 0;
    $amountDot = round(strlen($price) / 3);

    if (strlen($price) % 3 == 0) {
        $amountDot--;
    }
    for ($i = strlen($price) - 1; $i >= 0; $i--) {
        $temp++;
        if ($temp == 3 && $flag < $amountDot) {
            $s = $s . $price[$i] . ".";
            $flag++;
            $temp = 0;
        }
        else {
            $s = $s . $price[$i];
        }
    }
    return strrev($s) . "đ";
}
?>
<script src="JS/thong_ke.js"></script>

