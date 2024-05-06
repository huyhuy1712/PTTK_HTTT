<?php
$db = new DatabaseUtil();
$conn = $db->connect();
$user = $session->get('username');

// Tiến hành truy vấn để lấy thông tin cần thiết cho cả hai công việc
$query_cccd = "SELECT MA_TK FROM tai_khoan WHERE CCCD = '$user'";
$result_cccd = $db->executeQuery($query_cccd);
$query_diem = "SELECT DIEM FROM tai_khoan WHERE MA_TK = '$user'";
$result_diem = $db->executeQuery($query_diem);
$diem_hien_tai = 0;

// Kiểm tra xem kết quả truy vấn $result_diem có dòng dữ liệu hay không
if ($result_diem && $result_diem->num_rows > 0) {
    $row_diem = $result_diem->fetch_assoc();
    $diem_hien_tai = $row_diem['DIEM'];
}

if ($result_cccd->num_rows > 0) {
    $row_cccd = $result_cccd->fetch_assoc();
    $id_taikhoan = $row_cccd['MA_TK'];

    // Truy vấn dữ liệu từ bảng phieu_muon và chi_tiet_phieu_muon với việc gom nhóm
    $query_callcard = "SELECT pm.MA_PM, pm.MA_TK, pm.MA_TT, pm.NGAY_CAP, pm.NGAY_TRA, pm.GHI_CHU, pm.TRANG_THAI, 
                     GROUP_CONCAT(ctp.MA_SP) AS MA_SP,
                     GROUP_CONCAT(ctp.SL) AS SL,
                     GROUP_CONCAT(ctp.GHI_CHU_TRUOC_MUON) AS GHI_CHU_TRUOC_MUON,
                     GROUP_CONCAT(ctp.GHI_CHU_SAU_MUON) AS GHI_CHU_SAU_MUON
              FROM phieu_muon pm
              INNER JOIN chi_tiet_phieu_muon ctp ON pm.MA_PM = ctp.MA_PM
              WHERE pm.MA_TK = '$id_taikhoan'
              GROUP BY pm.MA_PM, pm.NGAY_CAP";

    $result_callcard = $db->executeQuery($query_callcard);

    echo "<div class='body'>";
    while ($row = mysqli_fetch_assoc($result_callcard)) {
        $ma_pm = $row['MA_PM'];
        $cccd = $row['MA_TK'];
        $ma_tt = $row['MA_TT'];
        $ngay_cap = $row['NGAY_CAP'];
        $ngay_tra = $row['NGAY_TRA'];
        $ghi_chu = $row['GHI_CHU'];
        $trang_thai = $row['TRANG_THAI'];
        $ma_sp_array = explode(",", $row['MA_SP']);
        $sl_array = explode(",", $row['SL']);
        $ghi_chu_truoc_muon_array = explode(",", $row['GHI_CHU_TRUOC_MUON']);
        $ghi_chu_sau_muon_array = explode(",", $row['GHI_CHU_SAU_MUON']);

        // Tăng điểm mới sau mỗi vòng lặp
        $diem_hien_tai++;

        echo "<div class='Call-Cart_infor'>";
        echo "<p class='title'>Phiếu mượn: $ma_pm</p>";
        echo "<div class='header-body'>";
        echo "<p class='username'>Tài khoản: $cccd</p>";
        echo "<p class='librarian'>Thủ thư: $ma_tt</p>";
        echo "</div>";
        echo "<div class='date-time'>";
        echo "<p class='start-date'>Ngày mượn: $ngay_cap</p>";
        echo "<p class='return-day'>Ngày trả: $ngay_tra</p>";
        echo "</div>";
        echo "<div class='moreInformation-Wrapper'>";
        echo "<table class='cart-Call-detail_table'>";
        echo "<tr>";
        echo "<th class='scope'>Sản phẩm</th>";
        echo "<th class='scope'>Số lượng</th>";
        echo "<th class='scope'>Tình trạng trước khi mượn</th>";
        echo "<th class='scope'>Tình trạng sau khi mượn</th>";
        echo "</tr>";

        // Lặp qua từng sản phẩm trong chi tiết phiếu mượn
        for ($i = 0; $i < count($ma_sp_array); $i++) {
            echo "<tr>";
            echo "<td>{$ma_sp_array[$i]}</td>";
            echo "<td>{$sl_array[$i]}</td>";
            echo "<td>{$ghi_chu_truoc_muon_array[$i]}</td>";
            echo "<td>{$ghi_chu_sau_muon_array[$i]}</td>";
            echo "</tr>";
        }

        echo "</table>";
        echo "</div>";
        echo "<div class='header-bottom'>";
        echo "<p class='note'>Ghi chú: $ghi_chu</p>";
        echo "<p class='status'>Trạng thái: $trang_thai</p>";
        echo "</div>";
        echo "</div>";
    }
    echo "</div>";
}

if ($result_cccd->num_rows > 0) {
    $row_cccd = $result_cccd->fetch_assoc();
    $id_taikhoan = $row_cccd['MA_TK'];

    // Truy vấn dữ liệu từ bảng hoa_don và chi_tiet_hoa_don với việc gom nhóm
    $query_bill = "SELECT hd.MA_HD, hd.MA_TK, hd.MA_TT, hd.NGAY_TAO, hd.TONG_TIEN,
                     GROUP_CONCAT(cthd.MA_SP) AS MA_SP,
                     GROUP_CONCAT(cthd.SL) AS SL,
                     GROUP_CONCAT(cthd.DON_GIA) AS DON_GIA,
                     GROUP_CONCAT(cthd.THANH_TIEN) AS THANH_TIEN
              FROM hoa_don hd
              INNER JOIN chi_tiet_hoa_don cthd ON hd.MA_HD = cthd.MA_HD
              WHERE hd.MA_TK = '$id_taikhoan'
              GROUP BY hd.MA_HD, hd.NGAY_TAO";

    $result_bill = $db->executeQuery($query_bill);

    echo "<div class='body'>";
    while ($row = mysqli_fetch_assoc($result_bill)) {
        $ma_hd = $row['MA_HD'];
        $ma_tk = $row['MA_TK'];
        $ma_tt = $row['MA_TT'];
        $ngay_tao = $row['NGAY_TAO'];
        $tong_tien = $row['TONG_TIEN'];
        $ma_sp_array = explode(",", $row['MA_SP']);
        $sl_array = explode(",", $row['SL']);
        $don_gia_array = explode(",", $row['DON_GIA']);
        $thanh_tien_array = explode(",", $row['THANH_TIEN']);

        // Tăng điểm sau mỗi vòng lặp
        $diem_hien_tai += 5;

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

$query_update_diem = "UPDATE tai_khoan SET DIEM = '$diem_hien_tai' WHERE MA_TK = '$id_taikhoan'";
$result_update_diem = $db->executeQuery($query_update_diem);
$db->close();
?>
