<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<link rel="stylesheet" href="CSS/SP_admin.css">

<div id="form_SP_admin">
<div id="table_SP">
    <div style="display: flex;">
    <div style="margin-top: 20px; margin-left: 20px; font-size: 25px;" id="SLSP_HT">Số lượng hiện có: <span style="font-weight: bold; "></span></div>
    <h2 style="margin-left: 230px; ">Danh sách sản phẩm</h2>
    </div>
    <div id="scroll-container">
    <table>
        <thead style=" background-color: #746d6d11; font-weight: bold;">
            <tr>
                <td>Mã sách</td>
                <td>Hình ảnh</td>
                <td>Tên</td>
                <td>Tác giả</td>
                <td>Năm xuất bản</td>
                <td>Giá</td>
                <td>Loại</td>
                <td>Trạng thái</td>
                <td colspan="2" id="thao_tac">Thao tác</td>
            </tr>
        </thead>

        <tbody id="data">
            
        </tbody>
    </table>
    </div>
</div>


<div id="chucnang_SP">


<form action="" method="POST" id="form_timkiem_SP">
        <h2 id="title">Tìm kiếm</h2>
            <select name="" id="opt_timkiem_SP">
                <option value="MASP">MASP</option>
                <option value="tac_gia">tác giả</option>
                <option value="Tên_SP">Tên sản phẩm</option>
                <option value="Nam_XB">Năm xuất bản</option>
                <option value="Gia_ban">Giá</option>
                <option value="the_loai">Thể loại</option>
                <option value="trang_thai">Trạng thái</option>
            </select>
            <input type="hidden" name="page" value="Sản phẩm">
            <input type="text" id="txt_timkiem_SP" style="width: 54%; margin-left: 20px;" placeholder="Nhập SP cần tìm">
            <input type="button" value="Tìm" id="btn_timkiem_SP">
    </form>


    <form action="" method="POST" id="form_them_SP">
        <h2 style="text-align: center; ">Thêm Sản Phẩm</h2>

        <div>
            <label for="">Tên sản phẩm: </label> 
            <input type="text" name="TenSP" id="TenSP_add"> <span style="color: red; ">(*)</span>
        </div>
        <div>
            <label for="">Giá: </label> 
            <input type="number" name="GIA_SP" id="GIA_SP_add"> <span style="color: red; ">(*)</span>
    </div>

      <div>
      <label for="">Tác giả: </label>
      <input type="text" id="tacgia_add">
      </div>
      <div>
      <label for="">Năm xuất bản: </label>
      <input type="text" id="NXB_add">
      </div>

      <div>
        <label for="">Hình ảnh: </label>
        <input type="file" name="ANH_SP" id="ANH_SP_add"> <span style="color: red; ">(*)</span>
    </div>
  
    <div>
    <label for="">Loại: </label>
        <select name="" id="Loai_add" style="margin-bottom: 10px;">
            <option value="thiếu nhi">thiếu nhi</option>
            <option value="tâm lý, tìm cảm">tâm lý, tìm cảm</option>
            <option value="văn học, xã hội">văn học, xã hội</option>
            <option value="lịch sử">lịch sử</option>
            <option value="khoa học viễn tưỡng">khoa học viễn tưỡng</option>
        </select>
    </div>

        <input type="hidden" name="page" value="Sản phẩm">
        <input type="button" onclick="add()" class="btn_themSP" name="btn_themSP" value="Thêm">
    </form>



    <div id="container_suaSP">
    <form action="" method="POST" id="form_sua_SP">
        <h2 style="text-align: center; ">Sửa sản phẩm</h2>
        <div>
            <label for="">Tên Sản phẩm: </label> 
            <input type="text" name="TenSP" id="TenSP_sua"> 
        <div>
            <label for="">Giá: </label> 
            <input type="number" name="Gia_SP" id="Gia_SP_sua"> 
    <div>
        <label for="">Hình ảnh: </label>
        <input type="file" name="AnhSP" id="AnhSP_sua" style="margin-bottom: 10px; "> 
</div>
<div>
        <label for="">Tác giả: </label>
        <input type="text" name="TacGia_sua" id="TacGia_sua"> 
</div>
<div>
        <label for="">Năm xuất bản: </label>
        <input type="text" name="NamXB_sua" id="NamXB_sua"> 
</div>
<div>
        <label for="">Loại: </label>
        <select name="" id="Loai_sua" style="margin-bottom: 10px;">
            <option value="thiếu nhi">thiếu nhi</option>
            <option value="tâm lý, tìm cảm">tâm lý, tìm cảm</option>
            <option value="văn học, xã hội">văn học, xã hội</option>
            <option value="lịch sử">lịch sử</option>
            <option value="khoa học viễn tưỡng">khoa học viễn tưỡng</option>
        </select>
    </div>
    <div>
        <label for="">Trạng Thái: </label>
        <input type="number" name="TrangThai_sua" placeholder=" 1: Đã mượn, 0: Chưa mượn" id="TrangThai_sua"> 
</div>
        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="hidden" name="MASP" value="" id="MASP_sua"> 
        <input type="hidden" name="anh_su" value="" id="anh_su"> 

        <input type="submit" class="btn_suaSP" name="btn_suaSP" value="sửa" onclick="update()">

    </form>
    </div>
</div>
</div>

</div>

<script src="JS/SP.js"></script>
</div>
