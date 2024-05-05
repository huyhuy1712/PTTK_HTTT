<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>

<div  class="change_page_Kho">
<form action="" method="POST">
   <input type="hidden" name="page" value="Kho">
    <input type="submit" value="Kho" id="btn1">
    </form>
    <form action="" method="POST">
    <input type="hidden" name="page" value="thong_ke">
    <input type="submit" value="thống kê" id="btn2">
    </form>
</div>

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
            <option value="MA_SP">MASP</option>
            <option value="SL_CL">SLCL</option>
        </select>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="submit" value="tăng dần" name="btn_sortAZ" class="btn_sortAZ"></input>
        <input type="submit" value="giảm dần" name="btn_sortZA" class="btn_sortZA"></input>
    </form>

    <form action="" method="POST" id="form_timkiem_Kho">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_Kho">
            <option value="MA_SP">MASP</option>
            <option value="SLCL">SLCL</option>
            </select>
            <input type="text" id="txt_timkiem_Kho" style="width: 54%; margin-left: 20px;">
            
            <input type="button" value="Tìm" id="btn_timkiem_Kho">
            
           
    </form>


</div>
</div> 


<script src="JS/Kho.js"></script>
