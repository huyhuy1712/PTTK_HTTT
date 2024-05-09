<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/HD_admin.CSS">
<div  class="change_page_CTHD">
<form action="" method="POST">
   <input type="hidden" name="page" value="Bán hàng">
    <input type="submit" value="Hoá đơn" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTHD">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_CTHD_admin">
<div id="table_CTHD">
<div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;"  id="SLCTHD_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 200px; ">Danh sách chi tiết hóa đơn</h2>
    </div>
    <div id="scroll-container1">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã hóa đơn</td>
                <td>Mã sản phẩm</td>
                <td>Số lượng</td>
                <td>Đơn Giá</td>
                <td>Thành tiền</td>
                <td colspan="2">Thao tác</td>
            </tr>
        </thead>
        <tbody id="data">
        </tbody>
    </table>
    </div>
</div>

<div id="chucnang_CTHD">


    <form action="" method="POST" id="form_timkiem_CTHD">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CTHD">
                <option value="MAHD">MAHD</option>
                <option value="MASP">MASP</option>
                <option value="SL">Số lượng</option>
                <option value="dongia">Đơn giá</option>
                <option value="thanhtien">Thành tiền</option>
            </select>
            <input type="text" id="txt_timkiem_CTHD" style="width: 54%; margin-left: 20px;" placeholder="Nhập CTHD cần tìm">
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" value="Tìm" id="btn_timkiem_CTHD">
    </form>


    <div id="container_suaHD">
    <form action="" method="POST" id="form_sua_HD">
        <h2 style="text-align: center; ">Sửa hóa đơn</h2>
        <div style="display: flex; margin-bottom: 10px;">
            <label for="">Mã sản phẩm: </label> 
        <select name="" id="MASP_sua" style="margin-left: 10px; border-radius: 10px;">
            <?php 
            foreach($connect->read('san_pham') as $row){
            ?>
            <option value="<?php echo $row['MA_SP']?>"> <?php echo $row['MA_SP']?> </option>
            <?php } ?>
        </select>
            </div>

        <div>
            <label for="">Số lượng: </label> 
            <input type="number" id="SL_HD_sua"> 
        </div>

<div> 
        <label for="">Đơn Giá: </label>
        <input type="number"  id="dongia_sua"> 
</div>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MAHD" value="" id="MAHD_sua"> 
        <input type="hidden" name="MASP_old" value="" id="MASP_old"> 
        <input type="hidden" name="SL_old" value="" id="SL_old"> 
        <input type="hidden" name="dongia_old" value="" id="dongia_old"> 

        <input type="submit" class="btn_suaHD" name="btn_suaHD" value="sửa" onclick="update()">
    </form>
</div>



<form action="" method="POST" id="form_sapxep_CTHD">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_CTHD">
            <option value="MA_HD">MAHD</option>
            <option value="MA_SP">MASP</option>
            <option value="SL">SL</option>
            <option value="DON_GIA">đơn giá</option>
            <option value="THANH_TIEN">Thành tiền</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" value="tăng dần" name="btn_sortAZ_CTHD" id="btn_sortAZ_CTHD"></input>
        <input type="button" value="giảm dần" name="btn_sortZA_CTHD" id="btn_sortZA_CTHD"></input>
    </form>

</div>


<script src="JS/CTHD.js"></script>

