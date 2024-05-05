<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/TK_admin.css">
<script src="https://kit.fontawesome.com/3918fe69ba.js" crossorigin="anonymous"></script>


<div id="form_TK_admin">
<div id="table_TK">
<div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLTK_HT" >Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách tài khoản</h2>
    </div>
    <div id="scroll-container">
<button id="tao_moi_diem">Tạo mới điểm</button>
        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>MATK</td>
                    <td>CCCD(Tên TK)</td>
                    <td>SDT (Mật khẩu)</td>
                    <td>Họ Tên</td>
                    <td>Địa chỉ</td>
                    <td>Ngày hết hạn</td>
                    <td>Điểm</td>
                    <td>Tình Trạng</td>
                    <td colspan="2">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
            </tbody>
            <input type="hidden" id="MA_TK_btn_temp">
        </table>
    </div>
</div>

<div id="chucnang_TK">


    <form action="" method="POST" id="form_timkiem_TK">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_TK">
                <option value="MATK">MATK</option>
                <option value="CCCD">CCCD</option>
                <option value="MATKHAU">Mật Khẩu</option>
                <option value="TEN">Tên chủ TK </option>
                <option value="DC">Địa chỉ</option>
                <option value="NHH">Ngày hết hạn</option>
                <option value="DIEM">Điểm</option>
                <option value="TINH_TRANG">Tình trạng</option>

            </select>
            <input type="text" id="txt_timkiem_TK" style="width: 50%; margin-left: 20px;" placeholder="Nhập tài khoản cần tìm">
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" value="Tìm" id="btn_timkiem_TK">
    </form>

    <form action="" method="POST" id="form_them_TK">
        <h2 style="text-align: center; ">Thêm Tài Khoản</h2>

        <div>
            <label for="">CCCD: </label> 
            <input type="number" name="TenTK" id="CCCD_add"> <span style="color: red; ">(*)</span>
        </div>
        <div style="margin-bottom: 10px; position: relative;">
            <label for="">Mật Khẩu: </label> 
            <input type="password" name="MATKHAU" id="MATKHAU_add"> 
            <span id="togglePassword" onclick="togglePasswordVisibility()" style="position: absolute; right: 60px; top: 3px;">
            <i id="eyeIcon" class="fa fa-eye"></i> </span>
            <span style="color: red; ">(*)</span>
    </div>
    <div>
            <label for="">Tên: </label> 
            <input type="text" name="TenTK" id="TenTK_add"> <span style="color: red; ">(*)</span>
        </div>
        <div>
            <label for="">Địa chỉ: </label> 
            <input type="text" name="TenTK" id="DIACHI_TK_add"> <span style="color: red; ">(*)</span>
        </div>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themTK" name="btn_themTK" value="Thêm" onclick="add()">
    </form>

</div>
</div>

<script src="JS/TK.js"></script>
