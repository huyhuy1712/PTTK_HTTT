<?php
$db = new DatabaseUtil();
$conn = $db->connect();
$user = $session->get('username');

<<<<<<< HEAD
if ($conn === false) {
    die("Lỗi kết nối đến cơ sở dữ liệu: " . $db->getConn()->connect_error);
}

// Truy vấn dữ liệu từ bảng phieu_muon và chi_tiet_phieu_muon với việc gom nhóm
$query = "SELECT pm.MA_PM, pm.CCCD, pm.MA_TT, pm.NGAY_CAP, pm.NGAY_TRA, pm.GHI_CHU, pm.TRANG_THAI, 
                 GROUP_CONCAT(ctp.MA_SP) AS MA_SP,
                 GROUP_CONCAT(ctp.SL) AS SL,
                 GROUP_CONCAT(ctp.GHI_CHU_TRUOC_MUON) AS GHI_CHU_TRUOC_MUON,
                 GROUP_CONCAT(ctp.GHI_CHU_SAU_MUON) AS GHI_CHU_SAU_MUON
          FROM phieu_muon pm
          INNER JOIN chi_tiet_phieu_muon ctp ON pm.MA_PM = ctp.MA_PM
          WHERE pm.CCCD = '$user'
          GROUP BY pm.MA_PM, pm.NGAY_CAP";

$result = $db->executeQuery($query);

echo "<div class='body'>";
while ($row = mysqli_fetch_assoc($result)) {
    $ma_pm = $row['MA_PM'];
    $cccd = $row['CCCD'];
    $ma_tt = $row['MA_TT'];
    $ngay_cap = $row['NGAY_CAP'];
    $ngay_tra = $row['NGAY_TRA'];
    $ghi_chu = $row['GHI_CHU'];
    $trang_thai = $row['TRANG_THAI'];
    $ma_sp_array = explode(",", $row['MA_SP']);
    $sl_array = explode(",", $row['SL']);
    $ghi_chu_truoc_muon_array = explode(",", $row['GHI_CHU_TRUOC_MUON']);
    $ghi_chu_sau_muon_array = explode(",", $row['GHI_CHU_SAU_MUON']);

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
=======
$query_cccd = "SELECT MA_TK FROM tai_khoan WHERE CCCD = '$user'";
$result_cccd = $db->executeQuery($query_cccd);

if ($result_cccd->num_rows > 0) {
    $row_cccd = $result_cccd->fetch_assoc();
    $id_taikhoan = $row_cccd['MA_TK'];

    // Truy vấn dữ liệu từ bảng phieu_muon và chi_tiet_phieu_muon với việc gom nhóm
    $query = "SELECT pm.MA_PM, pm.MA_TK, pm.MA_TT, pm.NGAY_CAP, pm.NGAY_TRA, pm.GHI_CHU, pm.TRANG_THAI, 
                     GROUP_CONCAT(ctp.MA_SP) AS MA_SP,
                     GROUP_CONCAT(ctp.SL) AS SL,
                     GROUP_CONCAT(ctp.GHI_CHU_TRUOC_MUON) AS GHI_CHU_TRUOC_MUON,
                     GROUP_CONCAT(ctp.GHI_CHU_SAU_MUON) AS GHI_CHU_SAU_MUON
              FROM phieu_muon pm
              INNER JOIN chi_tiet_phieu_muon ctp ON pm.MA_PM = ctp.MA_PM
              WHERE pm.MA_TK = '$id_taikhoan'
              GROUP BY pm.MA_PM, pm.NGAY_CAP";

    $result = $db->executeQuery($query);

    echo "<div class='body'>";
    while ($row = mysqli_fetch_assoc($result)) {
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
>>>>>>> main
$db->close();
?>
