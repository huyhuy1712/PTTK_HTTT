// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "hoa_don";
    var condition = "";
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

            // Sau HDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLHD_HT = document.querySelector('#SLHD_HT span');
var rows = document.querySelectorAll('#table_HD table tbody tr ');
SLHD_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function Delete(MAHD) {
    var operation = "Delete";
    var idName = "MA_HD";
    var idValue = MAHD;

    // Hàm xóa từng bảng
    function deleteFromTable(tableName, idName, idValue) {
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                operation: operation,
                tableName: tableName,
                idName: idName,
                idValue: idValue
            },
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

    }


    // // Xóa sản phẩm trong chi tiết hóa đơn
    deleteFromTable("chi_tiet_hoa_don", idName, idValue);
    

    // Xóa hóa đơn
    deleteFromTable("hoa_don", idName, idValue);
    location.reload();
}

   //loadData


   function add() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    var day = currentDate.getDate();
    
    // Định dạng lại chuỗi theo định dạng "YYYY-MM-DD"
    var formattedDateString = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    
    var MA_TK = $("#ten_TK_thanhtoan").val();
    var MA_TT = $("#opt_MANV_themHD").val();
    var TRANG_THAI = "0";
    var table_CTHD = document.querySelectorAll('#data_CTSP tr');
    var TongTien = 0;
    var check = true;
    for (var i = 0; i < table_CTHD.length; i++) {
        var THANHTIEN_CTHD = changePriceToNormal(table_CTHD[i].querySelector('#THANHTIEN_CTHD input').value);
        if(THANHTIEN_CTHD == '0'){
            check = false; break;
        }
        else{
            TongTien += parseFloat(THANHTIEN_CTHD);
        }
    }

    if(check){
        var data = {
            NGAY_TAO: formattedDateString,
            MA_TK: MA_TK,
            MA_TT: MA_TT,
            TRANG_THAI: TRANG_THAI,
            TONG_TIEN: TongTien
        };
    
        var jsonData = JSON.stringify(data);
    
        var operation = "Create";
        var tableName = "hoa_don";
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                jsonData: jsonData,
                operation: operation,
                tableName: tableName
            },
            success: function(response) {
                //đọc ra hoá đơn vừa thêm
                var newCTHD = response[response.length - 1].MA_HD;
                var table_CTHD = document.querySelectorAll('#data_CTSP tr');
    
                for (var i = 0; i < table_CTHD.length; i++) {
                    var MASP_CTHD = table_CTHD[i].querySelector('#MASP_CTHD').innerText;
                    var DONGIA_CTHD = changePriceToNormal(table_CTHD[i].querySelector('#DONGIA_CTHD input').value);
                    var SL_CTHD = table_CTHD[i].querySelector('#SL_CTHD input').value;
                    var THANHTIEN_CTHD = changePriceToNormal(table_CTHD[i].querySelector('#THANHTIEN_CTHD input').value);
                    var data = {
                        MA_HD: newCTHD,
                        MA_SP: MASP_CTHD,
                        DON_GIA: DONGIA_CTHD,
                        SL: SL_CTHD,
                        THANH_TIEN: THANHTIEN_CTHD
                    };
    
                    var jsonData = JSON.stringify(data);
                    $.ajax({
                        url: '../AJAX_PHP/CRUD.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            jsonData: jsonData,
                            operation: "Create",
                            tableName: 'chi_tiet_hoa_don'
                        },
                        success: function(response) {
                            console.log(response);
                        },
                        error: function(xhr, status, error) {
                            console.log(error);
                        }
                    });
                }
                   location.reload();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }

    else{
        alert("chi tiết phải có số lượng ít nhất 1 !!");
    }
    
}

function update_TK(MATK,callback){

    //đọc ra tài khoản cần cập nhật điểm
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + MATK;
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
            var data = {
            DIEM: parseFloat(response[0].DIEM) + 5
            };
            var jsonData = JSON.stringify(data);
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData: jsonData,
                    operation: "Update",
                    tableName: "tai_khoan",
                    idName: "MA_TK",
                    idValue: MATK
                },
                success: function(response) {
                    callback(); // Gọi hàm hoàn thành khi cập nhật thành công
                },
                error: function(xhr, status, error) {
                    console.log(error);
                    callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
                }
            })
        },
        error: function(xhr, status, error) {
            console.log(error);
            callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
        }
    });
}

function update_kho(MASP, SL, callback) {
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
        success: function(response) {
                var data = {
                    SL_CL: parseFloat(response[0].SL_CL) - parseFloat(SL)
                };
                var jsonData = JSON.stringify(data);
                $.ajax({
                    url: '../AJAX_PHP/CRUD.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        jsonData: jsonData,
                        operation: "Update",
                        tableName: "kho",
                        idName: "MA_SP",
                        idValue: MASP
                    },
                    success: function(response) {
                        callback(); // Gọi hàm hoàn thành khi cập nhật thành công
                    },
                    error: function(xhr, status, error) {
                        console.log(error);
                        callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
                    }
                })
            
        },
        error: function(xhr, status, error) {
            console.log(error);
            callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
            return false;

        }
    });
}



//hàm cho nút nhập
function xuat(MAHD) {
    var data = {
        TRANG_THAI: 1
    };
    var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "hoa_don";
    var idName = "MA_HD";
    var idValue = MAHD;

    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData: jsonData,
            operation: operation,
            tableName: tableName,
            idName: idName,
            idValue: idValue
        },
        success: function(response) {
            update_TK(response[0].MA_TK);
            // đọc ra các chi tiết 
            var operation = "Read";
            var tableName = "chi_tiet_hoa_don";
            var condition = "MA_HD=" + MAHD;
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
                    var updateCounter = 0;
                    var totalUpdates = response.length;
                    for (var i = 0; i < response.length; i++) {
                        update_kho(response[i].MA_SP, response[i].SL, function() {
                            updateCounter++;
                            if (updateCounter === totalUpdates) {
                                location.reload();
                            }
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
        
    });
    // location.reload();
}
//hàm cho nút nhập


   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    var html = "";
    var CTHD_check = [];
    localStorage.setItem('CTHD_check',JSON.stringify(CTHD_check));

    for (var i = 0; i < elementPage.length; i++) {
    
        if (elementPage[i].TRANG_THAI == 0){
            CTHD_check.push(elementPage[i].MA_HD);
            localStorage.setItem('CTHD_check',JSON.stringify(CTHD_check));
        html += `
        <tr><td id="HD_Ma">${elementPage[i].MA_HD}</td>
        <td id="HD_MaTK">${elementPage[i].MA_TK}</td>
        <td id="HD_MaTT">${elementPage[i].MA_TT}</td>
        <td id="HD_NGAY_TAO">${elementPage[i].NGAY_TAO}</td>
        <td id="HD_TONG_TIEN">${changePriceToString(elementPage[i].TONG_TIEN)}</td>
        <form action="" method="POST"><input type="hidden" name="MAHD"><td><input type="button" onclick="Delete(${elementPage[i].MA_HD})" value="xóa" class="thaotac"></td></form> 
        <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?>
        <td><input type="submit" id="HD_xuat_btn" class="thaotac" value="xuất" onclick="xuat(${elementPage[i].MA_HD})"></td></form>
        </tr>
        `;
        }
        else{
            html += `
            <tr><td id="HD_Ma">${elementPage[i].MA_HD}</td>
            <td id="HD_MaTK">${elementPage[i].MA_TK}</td>
            <td id="HD_MaTT">${elementPage[i].MA_TT}</td>
            <td id="HD_NGAY_TAO">${elementPage[i].NGAY_TAO}</td>
            <td id="HD_TONG_TIEN">${changePriceToString(elementPage[i].TONG_TIEN)}</td>
            <form action="" method="POST"><input type="hidden" name="MAHD"><td><input type="button" onclick="Delete(${elementPage[i].MA_HD})" value="xóa" class="thaotac"></td></form> 
            <td><input type="submit" id="HD_xuat_btn" class="thaotac" value="xuất" style="opacity: 0.6"></td></form>

            </tr>
            `; 
        }
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

     //chức năng tìm kiếm
     document.addEventListener('DOMContentLoaded', function(){
        var opt = document.getElementById('opt_timkiem_HD'); // Lấy thẻ select
        var txt = document.getElementById('txt_timkiem_HD'); // Lấy thẻ select
    
        function toggleDateInput() {
            if(opt.value === 'NGAY_TAO'){
               txt.type = 'date';
            }
            else {
                txt.type = 'number';
    
            }
        }
        opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
    });

     document.getElementById('btn_timkiem_HD').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_HD').value;
        var txt = document.getElementById('txt_timkiem_HD').value;
        var rows = document.querySelectorAll('#table_HD table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MAHD'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MAHD = rows[i].querySelector('#HD_Ma').innerText;
        
                    if(MAHD.includes(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'MATK'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaHD = rows[i].querySelector('#HD_MaTK').innerText;
                        if(MaHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'MATT'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaHD = rows[i].querySelector('#HD_MaTT').innerText;
                        if(MaHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
        else if(opt === 'NGAY_TAO'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaHD = rows[i].querySelector('#HD_NGAY_TAO').innerText;
        if(MaHD.includes(txt)){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'Tổng tiền'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaHD = rows[i].querySelector('#HD_TONG_TIEN').innerText;
        if(MaHD.includes(txt)){
            rows[i].style.display = 'table-row';
        }
    
        
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    
    }
    });
    //chức năng tìm kiếm


    //chức năng chọn tài khoản cần thêm hóa đơn

    //hiện form
    document.getElementById('btn_chon_TK').addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('container_chonTK').style.display = 'block';
    })

    //ẩn form
    document.getElementById('container_chonTK').addEventListener('click', function(event){
        var form = document.getElementById('container_chonTK');
        if(event.target == form){
            form.style.display = 'none';
        }
    })

    //tìm kiếm
    document.getElementById('btn_search_tk').addEventListener('click', function(event){
        event.preventDefault();
        var txt = document.getElementById('txt_search_TK').value;
        var tr = document.querySelectorAll('#form_chon_TK table tbody tr');
        if(txt === ''){
            for(var i=0; i<tr.length; i++){
                tr[i].style.display = 'table-row';
            }
        }
        else{
            for(var i=0; i<tr.length; i++){
                var MATK = tr[i].querySelector('#MA_TK_TIM').innerText;
                if(chuyenDoiChuoi(MATK).includes(txt)){
                tr[i].style.display = 'table-row';
            }   
            else{
                tr[i].style.display = 'none';
            }
        }
    }
    })


    //khi chọn 1 tài khoản
    var trs = document.querySelectorAll('#form_chon_TK table tbody tr');
    trs.forEach(function(tr){
        tr.addEventListener('click', function(){
            var form = document.querySelector('#container_chonTK');
            var TK = document.querySelector('#ten_TK_thanhtoan');

            TK.value = tr.querySelector('#MA_TK_TIM').innerText;
            form.style.display = 'none';
        })
    })
    //chức năng chọn tài khoản cần thêm hóa đơn


     //hàm xử lí tiền
 //1000000  -> 1.000.000 đ
 function changePriceToString(price) {
    var s = "";
    var temp = 0;
    var flag = 0;
    var amountDot = Math.round(price.length / 3);

    if (price.length % 3 == 0) {
        amountDot--;
    }
    for (var i = price.length - 1; i >= 0; i--) {
        temp++;
        if (temp == 3 && flag < amountDot) {
            s = s + price[i] + ".";
            flag++;
            temp = 0;
        }
        else {
            s = s + price[i];
        }
    }
    return s.split("").reverse().join("") + "đ";
}

//1.000.000 đ -> 1000000
function changePriceToNormal(price)
{
    return price.replace(/\D/g, "");
}

//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}




    