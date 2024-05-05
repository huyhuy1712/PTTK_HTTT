
<section id="container_formthemPM">
    <div id="content_thmPM">
        <button id="btn_an_formthemCTPM">X</button>
    <h2>Thêm phiếu mượn</h2>
<label for="" style="margin-left: 20px;">Mã nhân viên xuất phiếu mượn: </label>
<input type="text" readonly id="opt_MANV_themPM" style="width: 10px; margin-right: 40px; border-radius: 10%; text-align: center; ">
</input>

<div id="container_content_themPM">
<div id="left_container_themPM">

<div id="search_PM_them">
        <input type="text" placeholder="Nhập mã sản phẩm cần tìm">
        <button><img src="../Img/search (1).png" alt="##"></button>
    </div>

    <div id="scroll_themPM">
        <table>
            <thead>
                    <td>Mã sản phẩm</td>
                    <td>Hình ảnh</td>
                    <td>Tên sản phẩm</td>
                    <td>Thể loại</td>
            </thead>
            <tbody id="data_SP">
                <?php
               foreach($connect->read("san_pham","TRANG_THAI = '0'") as $row){
                ?>
    <tr>
                <td id="MASP_them"><?php echo $row['MA_SP']; ?></td>
                <td id="ANH_them"><img src="../Img/<?php echo $row['HINH_ANH']; ?>" alt="##" style="height: 50px; "></td>
                <td id="TENSP_them"><?php echo $row['TEN']; ?></td>
                <td id="LOAI_them"><?php echo $row['LOAI']; ?></td>
    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<div id="right_container_themPM">
<h3>Chi tiết phiếu mượn</h3>
<div id="scroll_themCTPM">
    <table>
        <thead>
            <td>Mã sản phẩm</td>
            <td>Tên sản phẩm</td>
            <td>Thể loại</td>
            <td>Ghi chú trước mượn</td>
            <td>Ghi chú sau mượn</td>
            <td>Thao tác</td>
        </thead>
        <tbody id="data_CTSP">

        </tbody>
    </table>
</div>
</div>
</div>
<button id="them_CTPM" onclick="add()">Thêm</button>
    </div>
</section>



<style>
    #btn_an_formthemCTPM{
        width: 30px;
        height: 30px;
        font-size: 30px;
        position: relative;
        color: red;
        border: none;
        background-color: transparent; 
        float: right;
        top: 10px;
        right: 20px;
    }
    /* CSS cho container chính */
#container_formthemPM{
    height: 100%;
    display: none;
    border: 1px solid black;
    position: absolute;
    background-color: rgba(204, 204, 204, 0.8); 
    top: 0px;
    right: 5px;
  
}

#content_thmPM{
    margin-top: 50px;
    border: 1px solid black;
    background-color: #FFFFFF;
    height: 80%;
}


/* CSS cho nút Thêm */
#container_formthemPM #them_CTPM {
    margin-left: 1460px;
    margin-top: 46px;
    padding: 6px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
    
/* CSS cho tiêu đề */
#container_formthemPM h2 {
    text-align: center;
}

/* CSS cho các label */
#container_formthemPM label {
    
    margin-bottom: 10px;
    font-weight: bold;
}

/* CSS cho select box */
#container_formthemPM select {

    padding: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-right: 50px;

}

#scroll_themPM{
    overflow-y: scroll;
    height: 90%;
}
#scroll_themCTPM{
    overflow-y: scroll;
    height: 70%;
}

/* CSS cho container content */
#container_content_themPM {
    display: flex;
    height: 70%;
}

/* CSS cho left container */
#left_container_themPM {
    width: 40%;
    margin-right: 20px;
    height: 462px;
}


/* CSS cho right container */
#right_container_themPM {
    width: 60%;
    height: 543px;
}

#left_container_themPM table thead td{
    text-align: center;
    background-color: grey;
    font-weight: bold;
}

#left_container_themPM table tbody td{
    text-align: center;
}

/* CSS cho input trong left container */
#left_container_themPM input[type="text"]{
    width: 96%;
    margin-bottom: 15px;
}
#right_container_themPM input[type="number"], input[type="text"]{
   border: none;
   width: 98%;
}


#left_container_themPM button img {
    width: 30px;
    height: 27px;
    margin-top: 3px;
    }

#left_container_themPM button{
    border: none;
    border-radius: 5px;
    width: 8%;
    height: 33px;
    
}


#search_PM_them{
display: flex;
height: 50px;
margin-top: 10px;


}


/* CSS cho table */
#scroll_themPM table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themPM table, #scroll_themPM th, #scroll_themPM td {
    border: 1px solid #ddd;
    text-align: left;
}

#scroll_themPM tr:hover{
    background-color: grey;
}


#scroll_themPM th {
    background-color: #f2f2f2;
}

#right_container_themPM{
    border: 1px solid black;
    border-bottom: none;
    border-left: none;
}
#right_container_themPM h3{
text-align: center;
}

#scroll_themCTPM table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themCTPM table, #scroll_themCTPM th, #scroll_themCTPM thead {
    border: 1px solid #ddd;
    padding: 0px;
    width: 100%;
}

#scroll_themCTPM th, #scroll_themCTPM td {
    border: 1px solid black;
    text-align: center;
}

#scroll_themCTPM table thead{
background-color: #f2f2f2;
font-weight: bold;
}

#xoa_CTPM{
    background-color: red;
    border: 1px solid red;
    color: white;
    width: 100%;
}
</style>



<script>

 //form thêm hóa đơn
 $(document).ready(function(){
    $("#opt_MANSX_themPM").change(function(){
        var id = $(this).val();
        $.post("CTPM_MASP_data.php", {id: id}, function(data){
            $("#data_SP").html(data);
        });
    });

    // Thêm sự kiện click vào các dòng
    $(document).on('click', '#scroll_themPM table tbody tr', function() {
        // Lấy thông tin từ các ô trên dòng
        var TEN = $(this).find('#TENSP_them').text();
        var MASP = $(this).find('#MASP_them').text();
        var GIA = $(this).find('#GIA_them').text();
        var LOAI = $(this).find('#LOAI_them').text();
        console.log(LOAI);
        var tbody = $('#data_CTSP tr');
        var check = true;

        tbody.each(function(){
            if($(this).find('#MASP_CTPM').text() === MASP){
                check = false;
            }
        })

        if(check){
            var html = `
        <tr>
                <td id="MASP_CTPM">${MASP}</td>
                <td id="TEN_CTPM">${TEN}</td>
                <td id="LOAI_CTPM">${LOAI}</td>
                <td><input id="ghichu_trc" type="text" value="Không có ghi chú" style="text-align: center"></td>
                <td><input id="ghichu_sau" type="text"  value="Không có ghi chú" style="text-align: center"></td>
                <td><button id="xoa_CTPM">Xóa</button></td>
        </tr> `;
        
        $('#data_CTSP').append(html);
        }
        else{
            alert("Đã thêm sản phẩm");
        }
    });

    
        // Xử lý sự kiện khi nhấn nút "Xóa"
        $(document).on('click', '#xoa_CTPM', function() {
        // Lấy dòng chứa nút "Xóa" mà người dùng đã nhấn
        var tr = $(this).closest('tr');
        // Loại bỏ dòng đó khỏi bảng
        tr.remove();
    });
});


// Xử lý sự kiện tính thành tiền
$(document).on('change', '#SL_CTPM input', function() {
    var THANH_TIEN = $(this).closest('tr').find('#THANHTIEN_CTPM input');
    var DON_GIA = $(this).closest('tr').find('#DONGIA_CTPM input');
    var temp = changePriceToNormal(DON_GIA.val()) * $(this).val();
    THANH_TIEN.val(changePriceToString(temp.toString()));
});



//sự kiện tìm kiếm sản phẩm
document.querySelector('#search_PM_them button').addEventListener('click',function(){
    var MASP = document.querySelector('#search_PM_them input').value;
    var tobdy_SP = document.querySelectorAll('#data_SP tr');
    if(MASP !== ""){
        for(var i = 0; i < tobdy_SP.length; i++){
        var Ma_SP_cantim = tobdy_SP[i].querySelector('#MASP_them').innerText;
        if(chuyenDoiChuoi(Ma_SP_cantim).includes(chuyenDoiChuoi(MASP))){
            tobdy_SP[i].style.display = 'table-row';
        }
        else{
            tobdy_SP[i].style.display = 'none';
        }
    }
}
    else{
        for(var i = 0; i < tobdy_SP.length; i++){
            tobdy_SP[i].style.display = 'table-row';
        }
    }

})

//ẩn form thêm
document.getElementById('btn_an_formthemCTPM').addEventListener('click', function(){
    document.getElementById('container_formthemPM').style.display = "none";
})

//hiện form thêm
document.querySelector('.btn_themPM').addEventListener('click', function(){
    var txt = document.getElementById('ten_TK_thanhtoan').value;
    var txt2 = document.getElementById('ngaytr_PM').value;
    var currentDate = new Date();
    var date_tra = new Date(txt2);
    if(txt === '' && txt2 === ''){
        alert('Hãy chọn tài khoản và ngày trả !!');
    }
    else if(date_tra <= currentDate){
        alert('Ngày trả phải cách ngày lập ít nhất 1 ngày !!');
    }
    else{
        document.getElementById('container_formthemPM').style.display = "block";
    }
})

function set_TENNV(){
    $.ajax({
            url: '../AJAX_PHP/Current_Account.php',
            type: 'POST',
            dataType: 'json',
            success: function(response){

    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + response.tai_khoan.MA_TK;
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function(response) {
                $('#opt_MANV_themPM').val(response[0].MA_TK);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
}
set_TENNV();


</script>

<?php
// Hàm xử lí tiền
// 1000000  -> 1.000.000 đ
function changePriceToString($price) {
    $s = "";
    $temp = 0;
    $flag = 0;
    $amountDot = round(strlen($price) / 3);

    if (strlen($price) % 3 == 0) {
        $amountDot--;
    }
    for ($i = strlen($price) - 1; $i >= 0; $i--) {
        $temp++;
        if ($temp == 3 && $flag < $amountDot) {
            $s = $s . $price[$i] . ".";
            $flag++;
            $temp = 0;
        }
        else {
            $s = $s . $price[$i];
        }
    }
    return strrev($s) . "đ";
}

// 1.000.000 đ -> 1000000
function changePriceToNormal($price) {
    return preg_replace('/\D/', '', $price);
}

// Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi($chuoi) {
    return preg_replace('/[\p{M}\s]/u', '', mb_strtolower($chuoi));
}

?>


