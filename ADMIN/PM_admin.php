<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/PM_admin.css">
<script src="https://kit.fontawesome.com/3918fe69ba.js" crossorigin="anonymous"></script>
<div  class="change_page_PM">
<form action="" method="POST">
   <input type="hidden" name="page" value="Phiếu mượn">
    <input type="submit" value="Phiếu mượn" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTPM">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_PM_admin">
<div id="table_PM">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" class="SLPM_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách phiếu mượn</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã phiếu mượn</td>
                <td>Mã tài khoản</td>
                <td>Mã thủ thư</td>
                <td>Ngày cấp</td>
                <td>Ngày trả</td>
                <td>Ghi chú</td>
                <td>Tiến độ</td>

                <td colspan="3">Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">

        </tbody>
    </table>
    </div>
</div>

<div id="chucnang_PM">
    
    <form action="" method="POST" id="form_timkiem_PM">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_PM">
                <option value="MAPM">MAPM</option>
                <option value="MATK">MATK</option>
                <option value="MATT">MATT</option>
                <option value="NGAY_CAP">Ngày cấp</option>
                <option value="NGAY_TRA">Ngày trả</option>
                <option value="TIEn_DO">Tiến độ</option>

            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_PM" style="width: 54%; margin-left: 20px; " placeholder="Nhập phiếu cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_PM">
    </form>


    <form action="" method="POST" id="form_them_PM">
        <h2 style="text-align: center; ">Tạo phiếu mượn</h2>
    
        <div style="margin-bottom: 10px; display: flex;">
      <label for="">Mã tài khoản: </label>
        <input type="text" readonly id="ten_TK_thanhtoan" style="width: 100px; margin-left: 10px;">
        <button id="btn_chon_TK" style="width: 40px; font-size: 18px; margin-left: 10px; height: 25px;">...</button>
      </div>
      <div style="margin-bottom: 10px; display: flex;">
      <label for="">Ngày trả: </label>
        <input type="date"  id="ngaytr_PM" style="margin-left: 10px;">
      </div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themPM" name="btn_themPM" value="Thêm chi tiết">
    </form>


    <form action="" method="POST" id="form_sapxep_PM">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_PM">
            <option value="MA_PM">MAPM</option>
            <option value="MA_TK">MATK</option>
            <option value="MA_TT">MATT</option>
            <option value="NGAY_CAP">Ngày Cấp</option>
            <option value="NGAY_TRA">Ngày Trả</option>
            <option value="TIEN_DO">Tiến Độ</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ_PM" id="btn_sortAZ_PM"></input>
        <input type="button" value="giảm dần" name="btn_sortZA_PM" id="btn_sortZA_PM"></input>
    </form>
</div>
</div>


<div id="container_chonTK">
    <div id="form_chon_TK">
    <h2>Chọn tài khoản cần thêm</h2>
    <div id="search_TK">
        <input id="txt_search_TK" type="text" placeholder="Nhập mã tài khoản cần tìm">
        <button id="btn_search_tk" >Tìm</button>
    </div>

    <div id="scroll_chon_tk">
    <table>
        <thead>
            <tr>
                <td>Mã Tài khoản</td>
                <td>Họ Tên</td>
                <td>CCCD</td>
                <td>Điểm</td>
            </tr>
        </thead>
            <tbody>
                <?php
                foreach($connect->read('tai_khoan') as $row){
                ?>
                <tr>
                    <td id="MA_TK_TIM"><?php echo $row['MA_TK']?></td>
                    <td><?php echo $row['HO_TEN']?></td>
                    <td><?php echo $row['CCCD']?></td>
                    <td><?php echo $row['DIEM']?></td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
    
</div>
</div>

<div id="container_sua_PM">
    <form action="" method="POST" id="form_sua_PM">
        <h2 style="text-align: center; ">Sửa phiếu mượn</h2>

<div> 
        <label for="">Ngày trả: </label>
        <input type="date" id="NGAY_TRA">
        <input type="hidden" id="NGAY_TRA_old">

    </div>

<div> 
        <label for="">Ghi chú: </label>
        <textarea name="" id="ghi_chu_sua"></textarea> 
</div>

<div style="display: flex; margin-bottom: 20px;" id="form_tiendo"> 
        <label for="">Tiến độ: </label>
        <input type="hidden" id="TRANG_THAI_hidden">

        <select name="" id="tien_do_sua" style="margin-left: 10px; border: none;">
            <option value="0">Chưa hoàn tất</option>
            <option value="1">Hoàn tất</option>
        </select>
</div>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MAPM" value="" id="MAPM_sua"> 
        <input type="hidden" name="MASP_old" value="" id="MASP_old"> 


        <input type="button" class="btn_suaPM" name="btn_suaPM" value="sửa" onclick="update()">
    </form>
</div>


<?php
require("form_them_CTPM.php");
?>
<script src="JS/PM.js"></script>





