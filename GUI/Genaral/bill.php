<?php
$db = new DatabaseUtil();
$conn = $db->connect();
$user = $session->get('username');

$query_cccd = "SELECT MA_TK FROM tai_khoan WHERE CCCD = '$user'";
$result_cccd = $db->executeQuery($query_cccd);

if ($result_cccd->num_rows > 0){
    $row_cccd = $result_cccd->fetch_assoc();
    $id_taikhoan = $row_cccd['MA_TK'];
    
    // Truy vấn dữ liệu từ bảng hoa_don và chi_tiet_hoa_don với việc gom nhóm
    $query = "SELECT hd.MA_HD, hd.MA_TK, hd.MA_TT, hd.NGAY_TAO, hd.TONG_TIEN,
                     GROUP_CONCAT(cthd.MA_SP) AS MA_SP,
                     GROUP_CONCAT(cthd.SL) AS SL,
                     GROUP_CONCAT(cthd.DON_GIA) AS DON_GIA,
                     GROUP_CONCAT(cthd.THANH_TIEN) AS THANH_TIEN
              FROM hoa_don hd
              INNER JOIN chi_tiet_hoa_don cthd ON hd.MA_HD = cthd.MA_HD
              WHERE hd.MA_TK = '$id_taikhoan'
              GROUP BY hd.MA_HD, hd.NGAY_TAO";
    
    $result = $db->executeQuery($query);

    echo "<div class='body'>";
    while ($row = mysqli_fetch_assoc($result)) {
        $ma_hd = $row['MA_HD'];
        $ma_tk = $row['MA_TK'];
        $ma_tt = $row['MA_TT'];
        $ngay_tao = $row['NGAY_TAO'];
        $tong_tien = $row['TONG_TIEN'];
        $ma_sp_array = explode(",", $row['MA_SP']);
        $sl_array = explode(",", $row['SL']);
        $don_gia_array = explode(",", $row['DON_GIA']);
        $thanh_tien_array = explode(",", $row['THANH_TIEN']);


        // Hiển thị thông tin hoá đơn
        echo "<div class='bill-information'>";
        echo "<div class='header-title'>";
        echo "<p class='title'>Hoá đơn: $ma_hd</p>";
        echo "<p class='date'>Ngày: $ngay_tao</p>";
        echo "</div>";
        echo "<div class='header-body'>";
        echo "<p class='username'>Tài khoản: $ma_tk</p>";
        echo "<p class='librarian'>Thủ thư: $ma_tt</p>";
        echo "</div>";
        echo "<div class='moreInformation-Wrapper'>";
        echo "<div class='bill_detail'>";
        echo "<table class='bill-detail_table'>";
        echo "<thead>";
        echo "<tr>";
        echo "<th class='scope'>Sản phẩm</th>";
        echo "<th class='scope'>Số lượng</th>";
        echo "<th class='scope'>Giá</th>";
        echo "<th class='scope'>Thành tiền</th>";
        echo "</tr>";
        echo "</thead>";
        echo "<tbody>";
        
        // Lặp qua từng sản phẩm trong chi tiết hoá đơn
        for ($i = 0; $i < count($ma_sp_array); $i++) {
            echo "<tr>";
            echo "<td>{$ma_sp_array[$i]}</td>";
            echo "<td>{$sl_array[$i]}</td>";
            echo "<td>{$don_gia_array[$i]}</td>";
            echo "<td>{$thanh_tien_array[$i]}</td>";
            echo "</tr>";
        }
        
        echo "</tbody>";
        echo "</table>";
        echo "</div>";
        echo "</div>";
        echo "<p class='total'>Thành tiền: $tong_tien</p>";
        echo "</div>";
    }

    echo "</div>";
}
$db->close();
?>
