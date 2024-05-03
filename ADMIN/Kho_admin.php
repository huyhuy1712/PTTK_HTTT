<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>

<link rel="stylesheet" href="CSS/Kho_admin.CSS">
<div id="form_Kho_admin">
<div id="table_Kho">
<div style="display: flex;" id="SLKho_HT">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLKho_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách sản phẩm trong kho</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td style="width: 300px;">Mã sản phẩm</td>
                    <td style="width: 300px;">Số lượng</td>
                </tr>
            </thead>
            <tbody id="data">
    
            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_Kho">

<form action="" method="POST" id="form_sapxep_Kho">
        <h2 style="margin-top: 10px; text-align: center; ">Sắp xếp</h2>
        <select name="" id="opt_sapxep_Kho">
            <option value="MAKho">MAKho</option>
            <option value="MAKH">MAKH</option>
            <option value="SERIAL">SERIAL</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="submit" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="submit" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>

    <form action="" method="POST" id="form_timkiem_Kho">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_Kho">
            <option value="MAKho">MAKho</option>
            <option value="MAKH">MAKH</option>
            <option value="SERIAL">SERIAL</option>
            <!-- <option value="time">Thời hạn</option> -->
            <option value="time_start">Ngày bắt đầu</option>
            <option value="time_end">Ngày kết thúc</option>
            </select>
            <input type="text" id="txt_timkiem_Kho" style="width: 54%; margin-left: 20px;" placeholder="Nhập phiếu bảo hàng">

            <!-- <div class="spang" style="display: flex; margin-top: 10px; display: none;">
            <input id="ngay_start_other" type="date" style="height: 20px; width: 100px;   margin-right: 10px; text-align: center; "> -> 
            <input id="ngay_end_other" type="date" style="height: 20px; width: 100px;  margin-left: 10px; text-align: center; ">
            </div> -->
            <input type="button" value="Tìm" id="btn_timkiem_Kho">
    </form>

    <form action="" method="POST" id="form_them_Kho">
        <h2 style="text-align: center; ">Thêm Sản Phẩm</h2>
    
        <div style="margin-bottom: 10px;">
      <label for="">Mã sản phẩm: </label>
        <select name="" id="opt_MANSX" style="border: 2px solid black;">
        <?php
        foreach( $connect->read("nha_sx") as $row){
        ?>
            <option value="<?php echo $row['MA_NSX']; ?>"><?php echo $row['TEN_NSX']; ?></option>
            <?php } ?>
        </select>
      </div>

      <div>
      <label for="">Loại: </label>
      <input type="text">
      </div>
      <div>
      <label for="">Số lượng: </label>
      <input type="text">
      </div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" class="btn_themKho" name="btn_themKho" value="Thêm">
    </form>
</div>
</div> 


<script src="JS/Kho.js"></script>
