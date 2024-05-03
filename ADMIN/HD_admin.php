<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/HD_admin.css">
<div  class="change_page_PN">
<form action="" method="POST">
   <input type="hidden" name="page" value="Bán hàng">
    <input type="submit" value="Hóa đơn" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTHD">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_HD_admin">
<div id="table_HD">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLHD_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách hóa đơn</h2>
    </div>
    <div id="scroll-container">
        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>Mã hóa đơn</td>
                    <td>Mã tài khoản</td>
                    <td>Mã thủ thư</td>
                    <td>Ngày Tạo</td>
                    <td>Tổng tiền</td>
                    <td colspan="2">Thao tác</td>
                </tr>
            </thead>
            <tbody id="data">
              
            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_HD">
    
    <form action="" method="POST" id="form_timkiem_HD">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_HD">
                <option value="MAHD">MAHD</option>
                <option value="MATK">MATK</option>
                <option value="MATT">MATT</option>
                <option value="NGAY_TAO">Ngày tạo</option>
                <option value="Tổng tiền">Tổng tiền</option>
            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_HD" style="width: 54%; margin-left: 20px;" placeholder="Nhập hóa đơn cần tìm">
            <input type="submit" value="Tìm" id="btn_timkiem_HD">
    </form>


    <form action="" method="POST" id="form_them_HD">
        <h2 style="text-align: center; ">Tạo hóa đơn</h2>
    
        <div style="margin-bottom: 10px; display: flex;">
      <label for="">Mã tài khoản: </label>
        <input type="text" readonly id="ten_TK_thanhtoan" style="width: 100px; margin-left: 10px;">
        <button id="btn_chon_TK" style="width: 40px; font-size: 18px; margin-left: 10px; height: 25px;">...</button>
      </div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themHD" name="btn_themHD" value="Thêm chi tiết">
    </form>
</div>
<?php require('form_them_HD.php'); ?>

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



<script src="JS/HD.js"></script>
