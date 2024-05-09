// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "chi_tiet_hoa_don";
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

            // Sau CTHDi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLCTHD_HT = document.querySelector('#SLCTHD_HT span');
var rows = document.querySelectorAll('#table_CTHD table tbody tr ');
SLCTHD_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData


   function update()
{
    var MAHD = $('#MAHD_sua').val();
    var MASP_new = $('#MASP_sua').val();
    var SL_new = $('#SL_HD_sua').val();
    var dongia_new = $('#dongia_sua').val();
    var thanhtien_new = parseFloat(SL_new) * parseFloat(dongia_new);

    var MASP_old = $('#MASP_old').val(); 

    $.ajax({
        url: '../AJAX_PHP/CTHD.ajax.php',
        type: 'POST',
        data: {
            MAHD: MAHD,
            MASP_new: MASP_new,
            SL_new: SL_new,
            dongia_new: dongia_new,
            thanhtien_new: thanhtien_new,
            
            MASP_old: MASP_old
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function Delete(MAHD,MASP)
{

    $.ajax({
        url: '../AJAX_PHP/CTHD.ajax.php',
        type: 'POST',
        data: {
            MAHD_xoa: MAHD,
            MASP_xoa: MASP,
        },
        success: function(response) {
            console.log(response);
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    
    var html = "";
    var CTHD_check = JSON.parse(localStorage.getItem("CTHD_check"));

    for (var i = 0; i < elementPage.length; i++) {
        var found = false; // Sử dụng biến này để kiểm soát xem đã tìm thấy phần tử khớp hay không
        for(var j = 0; j < CTHD_check.length; j++) {
            if (CTHD_check[j] === elementPage[i].MA_HD) {
                html += `
                <tr>
                <td id="MAHD">${elementPage[i].MA_HD}</td>
                <td id="MASP">${elementPage[i].MA_SP}</td>
                <td id="SL">${elementPage[i].SL}</td>
                <td id="dongia">${changePriceToString(elementPage[i].DON_GIA)}</td>
                <td id="thanhtien">${changePriceToString(elementPage[i].THANH_TIEN)}</td>
                <form action="" method="POST"><input type="hidden" name="MAHD"><td><input type="button" onclick="Delete(${elementPage[i].MA_HD},${elementPage[i].MA_SP})" value="xóa" class="thaotac"></td></form> 
                <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?>
                <td class="HD_sua_btn" data-index="${i}"><input type="button" class="thaotac" value="sửa"></td></form>
               </tr>
                `;
                found = true; // Đánh dấu là đã tìm thấy
                break; // Thoát khỏi vòng lặp bên trong
            }
        }
        if(!found){
            html += `
            <tr>
            <td id="MAHD">${elementPage[i].MA_HD}</td>
            <td id="MASP">${elementPage[i].MA_SP}</td>
            <td id="SL">${elementPage[i].SL}</td>
            <td id="dongia">${changePriceToString(elementPage[i].DON_GIA)}</td>
            <td id="thanhtien">${changePriceToString(elementPage[i].THANH_TIEN)}</td>
            <td colspan="2">Đã xuất hóa đơn</td>
           </tr>
            `;
        }
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;


        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.HD_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_HD = document.getElementById('container_suaHD');
    
                form_sua_HD.querySelector('#MAHD_sua').value = elementPage[index].MA_HD;
                form_sua_HD.querySelector('#MASP_sua').value = elementPage[index].MA_SP;
                form_sua_HD.querySelector('#SL_HD_sua').value = elementPage[index].SL;
                form_sua_HD.querySelector('#dongia_sua').value = changePriceToNormal(elementPage[index].DON_GIA);
                
                form_sua_HD.querySelector('#MASP_old').value = elementPage[index].MA_SP;
                form_sua_HD.querySelector('#SL_old').value = elementPage[index].SL;
                form_sua_HD.querySelector('#dongia_old').value = changePriceToNormal(elementPage[index].DON_GIA);
    
    
                form_sua_HD.querySelector('#MAHD_sua').value = elementPage[index].MA_HD;    
                form_sua_HD.style.display = 'block';
            });
        });
    }


    
//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_HD = document.getElementById('container_suaHD');
    if(event.target === form_sua_HD){
        form_sua_HD.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa


     //chức năng tìm kiếm
     document.getElementById('btn_timkiem_CTHD').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_CTHD').value;
        var txt = document.getElementById('txt_timkiem_CTHD').value;
        var rows = document.querySelectorAll('#table_CTHD table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MAHD'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MACTHD = rows[i].querySelector('#MAHD').innerText;
        
                    if(MACTHD.includes(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'MASP'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaCTHD = rows[i].querySelector('#MASP').innerText;
                        if(MaCTHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'SL'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaCTHD = rows[i].querySelector('#SL').innerText;
                        if(MaCTHD.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'dongia'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaCTHD = rows[i].querySelector('#dongia').innerText;
        if(MaCTHD.includes(txt)){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'thanhtien'){
    
        if(txt === ''){
            for(var i = 0; i < rows.length; i++){
        rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
        }
        else{
            var MaCTHD = rows[i].querySelector('#thanhtien').innerText;
            if(MaCTHD.includes(txt)){
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

 //chức năng sắp xếp

    // Hàm so sánh tăng dần
    function sortByKey_tang(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            if(checkType(x) == 1){ return x - y; }
            else{ 
                if (x > y) return -1;
                if (x < y) return 1;
                return 0;
            }
        });
    }

        // Hàm so sánh tăng dần
        function sortByKey_giam(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                if(checkType(x) == 1){ return y - x; }
                else{ 
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                }
            });
        }




function display_sort() {
    var table_CTHD = document.querySelectorAll('#table_CTHD tbody tr');
    var jsonArray = [];

    for (var i = 0; i < table_CTHD.length; i++) {
        var MA_HD = table_CTHD[i].querySelector('#MAHD').innerText;
        var MA_SP = table_CTHD[i].querySelector('#MASP').innerText;
        var SL = table_CTHD[i].querySelector('#SL').innerText;
        var DON_GIA = changePriceToNormal(table_CTHD[i].querySelector('#dongia').innerText);
        var THANH_TIEN = changePriceToNormal(table_CTHD[i].querySelector('#thanhtien').innerText);

        var object = { THANH_TIEN: THANH_TIEN,DON_GIA: DON_GIA,  SL: SL, MA_SP: MA_SP, MA_HD: MA_HD};
        jsonArray.push(object);

    }

    document.querySelector('#btn_sortAZ_CTHD').addEventListener('click', function(event) {
        event.preventDefault();
        var tbody = document.querySelector('#table_CTHD tbody');
        var key = document.querySelector('#opt_sapxep_CTHD').value;
        tbody.innerHTML = '';
        var array_sapxep = sortByKey_tang(jsonArray, key); // sắp xếp mảng
     DisplayElementPage(array_sapxep);
    });

    document.querySelector('#btn_sortZA_CTHD').addEventListener('click', function(event) {
        event.preventDefault();
        var tbody = document.querySelector('#table_CTHD tbody');
        var key = document.querySelector('#opt_sapxep_CTHD').value;
        tbody.innerHTML = '';
        var array_sapxep = sortByKey_giam(jsonArray, key); // sắp xếp mảng
     DisplayElementPage(array_sapxep);
    });

}

  //hàm kiểm tra xem chuỗi là số hay chuỗi kí tự
function checkType(input) {
if (!isNaN(input)) {
   return 1;
} else {
    return 0;
}
}



