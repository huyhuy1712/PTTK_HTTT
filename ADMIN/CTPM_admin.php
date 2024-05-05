<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/PM_admin.CSS">

<div  class="change_page_CTPM">
<form action="" method="POST">
   <input type="hidden" name="page" value="Phiếu mượn">
    <input type="submit" value="Phiếu mượn" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="CTPM">
    <input type="submit" value="chi tiết" id="btn2">
    </form>
</div>

<div id="form_CTPM_admin">
    
<div id="table_CTPM">
<div style="display: flex;">
    <div id="SLCTPM_HT" style="margin-top: 20px; margin-left: 20px; font-size: 25px;">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 200px; ">Danh sách chi tiết phiếu mượn</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã phiếu mượn</td>
                <td>Mã sản phẩm</td>
                <td>Ghi chú trước khi mượn</td>
                <td>Ghi chú sau khi mượn</td>
                <td colspan="2">Thao tác</td>
            </tr>
        </thead>
        <tbody id="data">

        </tbody>
    </table>
        </div>
 
</div>

<div id="chucnang_CTPM">

    <form action="" method="POST" id="form_timkiem_CTPM">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_CTPM">
                <option value="MAPM">MAPM</option>
                <option value="MASP">MASP</option>
                <option value="ghichu_trc">ghi chú trước</option>
                <option value="ghichu_sau">ghi chú sau</option>
            </select>
            <input type="text" id="txt_timkiem_CTPM" style="width: 54%; margin-left: 20px;" placeholder="Nhập CTPM cần tìm">
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="submit" value="Tìm" id="btn_timkiem_CTPM">
    </form>


<div id="container_suaCTPM">
    <form action="" method="POST" id="form_sua_CTPM">
        <h2 style="text-align: center; ">Sửa phiếu mượn</h2>
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
        <label for="">Ghi chú trước khi mượn: </label>
        <textarea name="" id="ghi_chu_Trc"></textarea> 
</div>

<div> 
        <label for="">Ghi chú sau khi mượn: </label>
        <textarea name="" id="ghi_chu_Sau"></textarea> 
</div>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MACTPM" value="" id="MACTPM_sua"> 
        <input type="hidden" name="MASP_old" value="" id="MASP_old"> 


        <input type="submit" class="btn_suaCTPM" name="btn_suaCTPM" value="sửa" onclick="update()">
    </form>
    
</div>

</div>
</div>


<script src="JS/CTPM.js"></script>

