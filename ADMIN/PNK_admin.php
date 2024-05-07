<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/PNK_admin.css">
<script src="https://kit.fontawesome.com/3918fe69ba.js" crossorigin="anonymous"></script>
<div  class="change_page_PN">
<form action="" method="POST">
   <input type="hidden" name="page" value="Phiếu nhập">
    <input type="submit" value="Phiếu nhập" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTPN">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_PNK_admin">
<div id="table_PNK">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" class="SLPN_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách phiếu nhập</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã phiếu nhập</td>
                <td>Mã thủ thư</td>
                <td>Mã nhà cung cấp</td>
                <td>Ngày Nhập</td>
                <td>Trạng thái</td>
                <td colspan="2">Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">

        </tbody>
    </table>
    </div>
</div>

<div id="chucnang_PNK">
    
    <form action="" method="POST" id="form_timkiem_PNK">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_PNK">
                <option value="MAPNK">MAPNK</option>
                <option value="MATT">MATT</option>
                <option value="MANCC">MANCC</option>
                <option value="NGAY_NHAP">Ngày nhập</option>
                <option value="TRANG_THAI">Trạng Thái</option>

            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_PNK" style="width: 54%; margin-left: 20px; " placeholder="Nhập phiếu cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_PNK">
    </form>

    
    <form action="" method="POST" id="form_them_PNK">
        <h2 style="text-align: center; ">Nhập Phiếu</h2>
        <input type="button" class="btn_themCTPN" value="Thêm chi tiết">
    </form>

    <form action="" method="POST" id="form_sapxep_PN">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_PN">
            <option value="MA_PN">MAPN</option>
            <option value="NGAY_NHAP">Ngày Nhập</option>
            <option value="MA_TT">MATT</option>
            <option value="MA_NCC">MANCC</option>
            <option value="TRANG_THAI">Trạng Thái</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ_PN" id="btn_sortAZ_PN"></input>
        <input type="button" value="giảm dần" name="btn_sortZA_PN" id="btn_sortZA_PN"></input>
    </form>
</div>
</div>

<?php
require("form_them_PNK.php");
?>
<script src="JS/PNK.js"></script>


