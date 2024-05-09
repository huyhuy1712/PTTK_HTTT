
<section id="container_formthemHD">
    <div id="content_thmHD">
        <button id="btn_an_formthemCTHD">X</button>
    <h2>Thêm Hóa Đơn</h2>
<label for="" style="margin-left: 20px;">Mã nhân viên xuất hóa đơn: </label>
<input type="text" readonly id="opt_MANV_themHD" style="width: 50px; margin-right: 40px; border-radius: 10%; text-align: center; ">
</input>

<div id="container_content_themHD">
<div id="left_container_themHD">

<div id="search_HD_them">
        <input type="text" placeholder="Nhập mã sản phẩm cần tìm">
        <button><img src="../Img/search (1).png" alt="##"></button>
    </div>

    <div id="scroll_themHD">
        <table>
            <thead>
                    <td>Mã sản phẩm</td>
                    <td>Hình ảnh</td>
                    <td>Tên sản phẩm</td>
                    <td>Thể loại</td>
                    <td>Giá bán</td>
            </thead>
            <tbody id="data_SP">
                <?php
               foreach($connect->read("san_pham") as $row){
                ?>
    <tr>
                <td id="MASP_them"><?php echo $row['MA_SP']; ?></td>
                <td id="ANH_them"><img src="../Img/<?php echo $row['HINH_ANH']; ?>" alt="##" style="height: 50px; "></td>
                <td id="TENSP_them"><?php echo $row['TEN']; ?></td>
                <td><?php echo $row['LOAI']; ?></td>
                <td id="GIA_them"><?php echo changePriceToString($row['GIA']); ?></td>
    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<div id="right_container_themHD">
<h3>Chi tiết hóa đơn</h3>
<div id="scroll_themCTHD">
    <table>
        <thead>
            <td>Mã sản phẩm</td>
            <td>Tên sản phẩm</td>
            <td>Đơn giá</td>
            <td>Số lượng</td>
            <td>Thành tiền</td>
            <td>Thao tác</td>
        </thead>
        <tbody id="data_CTSP">

        </tbody>
    </table>
</div>
</div>
</div>
<button id="them_CTHD" onclick="add()">Thêm</button>
    </div>
</section>



<style>
    #btn_an_formthemCTHD{
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
#container_formthemHD{
    height: 100%;
    display: none;
    border: 1px solid black;
    position: absolute;
    background-color: rgba(204, 204, 204, 0.8); 
    top: 0px;
    right: 5px;
  
}

#content_thmHD{
    margin-top: 50px;
    border: 1px solid black;
    background-color: #FFFFFF;
    height: 80%;
}


/* CSS cho nút Thêm */
#container_formthemHD #them_CTHD {
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
#container_formthemHD h2 {
    text-align: center;
}

/* CSS cho các label */
#container_formthemHD label {
    
    margin-bottom: 10px;
    font-weight: bold;
}

/* CSS cho select box */
#container_formthemHD select {

    padding: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-right: 50px;

}

#scroll_themHD{
    overflow-y: scroll;
    height: 90%;
}
#scroll_themCTHD{
    overflow-y: scroll;
    height: 70%;
}

/* CSS cho container content */
#container_content_themHD {
    display: flex;
    height: 70%;
}

/* CSS cho left container */
#left_container_themHD {
    width: 40%;
    margin-right: 20px;
    height: 462px;
}


/* CSS cho right container */
#right_container_themHD {
    width: 60%;
    height: 543px;
}

#left_container_themHD table thead td{
    text-align: center;
    background-color: grey;
    font-weight: bold;
}

#left_container_themHD table tbody td{
    text-align: center;
}

/* CSS cho input trong left container */
#left_container_themHD input[type="text"]{
    width: 96%;
    margin-bottom: 15px;
}
#right_container_themHD input[type="number"], input[type="text"]{
   border: none;
   width: 98%;
}


#left_container_themHD button img {
    width: 30px;
    height: 27px;
    margin-top: 3px;
    }

#left_container_themHD button{
    border: none;
    border-radius: 5px;
    width: 8%;
    height: 33px;
    
}


#search_HD_them{
display: flex;
height: 50px;
margin-top: 10px;


}


/* CSS cho table */
#scroll_themHD table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themHD table, #scroll_themHD th, #scroll_themHD td {
    border: 1px solid #ddd;
    text-align: left;
}

#scroll_themHD tr:hover{
    background-color: grey;
}


#scroll_themHD th {
    background-color: #f2f2f2;
}

#right_container_themHD{
    border: 1px solid black;
    border-bottom: none;
    border-left: none;
}
#right_container_themHD h3{
text-align: center;
}

#scroll_themCTHD table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themCTHD table, #scroll_themCTHD th, #scroll_themCTHD thead {
    border: 1px solid #ddd;
    padding: 0px;
    width: 100%;
}

#scroll_themCTHD th, #scroll_themCTHD td {
    border: 1px solid black;
    text-align: center;
}

#scroll_themCTHD table thead{
background-color: #f2f2f2;
font-weight: bold;
}

#xoa_CTHD{
    background-color: red;
    border: 1px solid red;
    color: white;
    width: 100%;
}
</style>



<script>

 //form thêm hóa đơn
 $(document).ready(function(){


    // Thêm sự kiện click vào các dòng
    $(document).on('click', '#scroll_themHD table tbody tr', function() {
        // Lấy thông tin từ các ô trên dòng
        var TEN = $(this).find('#TENSP_them').text();
        var MASP = $(this).find('#MASP_them').text();
        var GIA = $(this).find('#GIA_them').text();
        var tbody = $('#data_CTSP tr');
        var check = true;

        tbody.each(function(){
            if($(this).find('#MASP_CTHD').text() === MASP){
                check = false;
            }
        })

        if(check){
            var html = `
        <tr>
                <td id="MASP_CTHD">${MASP}</td>
                <td id="TEN_CTHD">${TEN}</td>
                <td id="DONGIA_CTHD"><input class="dongia_input" type="text" value="${GIA}" readonly style="text-align: center"></td>
                <td id="SL_CTHD"><input class="SL_ctsl" type="number" value="0" style="text-align: center"></td>
                <td id="THANHTIEN_CTHD"><input class="thanhtien_input" type="text" value="0" style="text-align: center; " readonly></td>
                <td><button id="xoa_CTHD">Xóa</button></td>
        </tr> `;
        
        $('#data_CTSP').append(html);
        }
        else{
            alert("Đã thêm sản phẩm");
        }
    });
    
    
        // Xử lý sự kiện khi nhấn nút "Xóa"
        $(document).on('click', '#xoa_CTHD', function() {
        // Lấy dòng chứa nút "Xóa" mà người dùng đã nhấn
        var tr = $(this).closest('tr');
        // Loại bỏ dòng đó khỏi bảng
        tr.remove();
    });

    $(document).on('change', '#SL_CTHD input', function() {
        var tr = $(this).closest('tr');
        var SL = tr.find('#SL_CTHD input');
        var thanhtien = tr.find('#THANHTIEN_CTHD input');
        var dongia = changePriceToNormal(tr.find('#DONGIA_CTHD input').val());
        var MASP = tr.find('#MASP_CTHD').text();

    var operation = "Read";
    var tableName = "kho";
    var condition = "MA_SP=" + MASP;
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function(response){
            if(response[0].SL_CL < SL.val()){
                alert('Số lượng trong kho không đủ');
                SL.val(response[0].SL_CL);
            }
          thanhtien.val(changePriceToString((dongia * SL.val()).toString()));       
        },
        error: function(xhr, status, error) {
           console.log(error);
        }
     });
})
});





//sự kiện tìm kiếm sản phẩm
document.querySelector('#search_HD_them button').addEventListener('click',function(){
    var MASP = document.querySelector('#search_HD_them input').value;
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
document.getElementById('btn_an_formthemCTHD').addEventListener('click', function(){
    document.getElementById('container_formthemHD').style.display = "none";
})

//hiện form thêm
document.querySelector('.btn_themHD').addEventListener('click', function(){
    var txt = document.getElementById('ten_TK_thanhtoan').value;
    if(txt === ''){
        alert('Hãy chọn tài khoản cần thêm !!');
    }
    else{
        document.getElementById('container_formthemHD').style.display = "block";
    }
})

function set_TENNV(){
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + localStorage.getItem("account_curr_NV");
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function(response){
            $('#opt_MANV_themHD').val(response[0].MA_TK);
        },
        error: function(xhr, status, error) {
           console.log(error);
        }
     });
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
