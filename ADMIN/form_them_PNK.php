
<section id="container_formthemPNK">
    <div id="content_thmPNK">
        <button id="btn_an_formthemCTPN">X</button>
    <h2>Thêm phiếu nhập</h2>
<label for="">Mã thủ thư nhập phiếu: </label>
<input type="text" readonly id="opt_MANV_themPNK" style="width: 20px; margin-right: 20px; marrgin-left: 5px; border-radius: 10%; text-align: center; border: none ">

<label for="">Nhà cung cấp phiếu nhập: </label>
<select name="" id="opt_MANSX_themPNK">
<?php
            foreach( $connect->read("nha_cung_cap") as $row){
    ?>
    <option value="<?php echo $row["MA_NCC"]; ?>"><?php echo $row["TEN"]; ?></option>
    <?php } ?>
</select>

<div id="container_content_themPNK">
<div id="left_container_themPNK">

<div id="search_PNK_them">
        <input type="text" placeholder="Nhập mã sản phẩm cần tìm">
        <button><img src="../Img/search (1).png" alt="##"></button>
    </div>

    <div id="scroll_themPNK">
        <table>
            <thead>
                    <td>Mã sản phẩm</td>
                    <td>Tên sản phẩm</td>
                    <td>Hình ảnh</td>
                    <td>Loại</td>
                    <td>Giá bán</td>
            </thead>
            <tbody id="data_SP">
                <?php
               foreach($connect->read("san_pham") as $row){
                ?>
    <tr>
                <td id="MASP_them"><?php echo $row['MA_SP']; ?></td>
                <td id="TENSP_them"><?php echo $row['TEN']; ?></td>
                <td id="ANH_them"><img src="../Img/<?php echo $row['HINH_ANH']; ?>" alt="##" style="height: 50px; "></td>
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

<div id="right_container_themPNK">
<h3>Chi tiết phiếu nhập</h3>
<div id="scroll_themCTPN">
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
<button id="them_CTPN" onclick="add()">Thêm</button>
    </div>
</section>



<style>
    #btn_an_formthemCTPN{
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
#container_formthemPNK{
    height: 100%;
    display: none;
    border: 1px solid black;
    position: absolute;
    background-color: rgba(204, 204, 204, 0.8); 
    top: 0px;
    right: 5px;
  
}

#content_thmPNK{
    margin-top: 50px;
    border: 1px solid black;
    background-color: #FFFFFF;
    height: 90%;
}


/* CSS cho nút Thêm */
#container_formthemPNK #them_CTPN {
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
#container_formthemPNK h2 {
    text-align: center;
}

/* CSS cho các label */
#container_formthemPNK label {
    
    margin-bottom: 10px;
    font-weight: bold;
}

/* CSS cho select box */
#container_formthemPNK select {

    padding: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-right: 50px;

}

#scroll_themPNK{
    overflow-y: scroll;
    height: 100%;
}
#scroll_themCTPN{
    overflow-y: scroll;
    height: 75%;
}

/* CSS cho container content */
#container_content_themPNK {
    display: flex;
    height: 70%;
}

/* CSS cho left container */
#left_container_themPNK {
    width: 40%;
    margin-right: 20px;
    height: 462px;
}


/* CSS cho right container */
#right_container_themPNK {
    width: 60%;
    height: 543px;
}

#left_container_themPNK table thead td{
    text-align: center;
    background-color: grey;
    font-weight: bold;
}

#left_container_themPNK table tbody td{
    text-align: center;
}

/* CSS cho input trong left container */
#left_container_themPNK input[type="text"]{
    width: 96%;
    margin-bottom: 15px;
}
#right_container_themPNK input[type="number"]{
   border: none;
   width: 98%;
}


#left_container_themPNK button img {
    width: 30px;
    height: 27px;
    margin-top: 3px;
    }

#left_container_themPNK button{
    border: none;
    border-radius: 5px;
    width: 8%;
    height: 33px;
    
}


#search_PNK_them{
display: flex;
height: 50px;

margin-top: 1px;


}


/* CSS cho table */
#scroll_themPNK table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themPNK table, #scroll_themPNK th, #scroll_themPNK td {
    border: 1px solid #ddd;
    text-align: left;
}

#scroll_themPNK tr:hover{
    background-color: grey;
}


#scroll_themPNK th {
    background-color: #f2f2f2;
}

#right_container_themPNK{
    border: 1px solid black;
    border-bottom: none;
    border-left: none;
}
#right_container_themPNK h3{
text-align: center;
}

#scroll_themCTPN table {
    width: 100%;
    border-collapse: collapse;
}

#scroll_themCTPN table, #scroll_themCTPN th, #scroll_themCTPN thead {
    border: 1px solid #ddd;
    padding: 0px;
    width: 100%;
}

#scroll_themCTPN th, #scroll_themCTPN td {
    border: 1px solid black;
    text-align: center;
}

#scroll_themCTPN table thead{
background-color: #f2f2f2;
font-weight: bold;
}

#xoa_CTPN{
    background-color: red;
    border: 1px solid red;
    color: white;
    width: 100%;
}
</style>




<script>

// form thêm phiếu nhập
// Thêm sự kiện click vào các dòng
$(document).on('click', '#scroll_themPNK table tbody tr', function() {
    // Lấy thông tin từ các ô trên dòng
    var TEN = $(this).find('#TENSP_them').text();
    var MASP = $(this).find('#MASP_them').text();
    var tbody = $('#data_CTSP tr');
    var check = true;

    tbody.each(function(){
        if($(this).find('#MASP_CTPN').text() === MASP){
            check = false;
        }
    })

    if(check){
        var html = `
    <tr>
            <td id="MASP_CTPN">${MASP}</td>
            <td id="TEN_CTPN">${TEN}</td>
            <td id="DONGIA_CTPN"><input type="number" value="0" style="text-align: center"></td>
            <td id="SL_CTPN"><input type="number" value="0" style="text-align: center"></td>
            <td id="THANHTIEN_CTPN"><input type="number" value="0" style="text-align: center; " readonly></td>
            <td><button id="xoa_CTPN">Xóa</button></td>
    </tr> `;
    
    $('#data_CTSP').append(html);
    }
    else{
        alert("Đã thêm sản phẩm");
    }
});

// Xử lý sự kiện khi nhấn nút "Xóa"
$(document).on('click', '#xoa_CTPN', function() {
    // Lấy dòng chứa nút "Xóa" mà người dùng đã nhấn
    var tr = $(this).closest('tr');
    // Loại bỏ dòng đó khỏi bảng
    tr.remove();
});


// Xử lý sự kiện tính thành tiền
$(document).on('change', '#DONGIA_CTPN input', function() {
    var THANH_TIEN = $(this).closest('tr').find('#THANHTIEN_CTPN input');
    var SL = $(this).closest('tr').find('#SL_CTPN input');

    THANH_TIEN.val(SL.val() * $(this).val());
});

$(document).on('change', '#SL_CTPN input', function() {
    var THANH_TIEN = $(this).closest('tr').find('#THANHTIEN_CTPN input');
    var DON_GIA = $(this).closest('tr').find('#DONGIA_CTPN input');

    THANH_TIEN.val(DON_GIA.val() * $(this).val());
});


// sự kiện tìm kiếm sản phẩm
document.querySelector('#search_PNK_them button').addEventListener('click',function(){
    var MASP = document.querySelector('#search_PNK_them input').value;
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

});

function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}

function set_TENNV(){
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + localStorage.getItem("account_curr");
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
            $('#opt_MANV_themPNK').val(response[0].MA_TK);
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


?>

