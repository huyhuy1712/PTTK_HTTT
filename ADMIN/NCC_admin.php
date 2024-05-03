<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/NCC_admin.css">
<div id="form_NCC_admin">
<div id="table_NCC">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLNCC_HT"> Số lượng nhà sản xuất hiện có: <span style="font-weight: bold; ">0</span></div>
    <h2 style="margin-left: 120px; ">Danh sách nhà cung cấp</h2>
    </div>
    <div id="scroll-container">

        <table>
            <thead style=" background-color: #746d6d11; font-weight: bold;">
                <tr>
                    <td>Mã nhà cung cấp</td>
                    <td>Tên nhà cung cấp</td>
                    <td>Email</td>
                    <td>Trạng Thái</td>
                </tr>
            </thead>
            <tbody id="data">

            </tbody>
        </table>
    </div>
</div>

<div id="chucnang_NCC">


    <form action="" method="POST" id="form_timkiem_NCC">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_NCC">
                <option value="MANCC">MANCC</option>
                <option value="Tên NCC">Tên NCC</option>
                <option value="Email">Email</option>
                <option value="TRANGTHAI">Trạng thái</option>

            </select>
            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
            <input type="text" id="txt_timkiem_NCC" style="width: 54%; margin-left: 20px;" placeholder="Nhập NCC cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_NCC">
    </form>
    </div>


    <script src="JS/NCC.js"></script>

