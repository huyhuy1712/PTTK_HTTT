// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "chi_tiet_phieu_nhap";
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
        success: function(response){
            DisplayElementPage(response);
            display_sort();

            //cập nhật lại số lượng sản phẩm
            var SLCTPN_HT = document.querySelector('#SLHT_CTPN span');
            var rows = document.querySelectorAll('#table_CTPN table tbody tr ');
            SLCTPN_HT.innerText = rows.length;
                        //cập nhật lại số lượng sản phẩm
        }
    })                             
   
}
   //loadData


   function Delete(MAPN,MASP) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    
        var MAPN = MAPN;
        var MASP = MASP;
            $.ajax({
                url: 'CTPN_MASP_data.php',
                type: 'POST',
                data: {
                    MAPN: MAPN,
                    MASP: MASP
                },
                success: function(response) {
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
    }

}



function update(MAPN,MASP,DONGIA,SL,MASP_old)
{
    if (confirm("Bạn có chắc chắn muốn sửa không?")) {
    
        THANHTIEN = parseFloat(DONGIA) * parseFloat(SL);
        $.ajax({
            url: 'CTPN_MASP_data.php',
            type: 'POST',
            data: {
                MAPN_update: MAPN,
                MASP_update: MASP,
                DONGIA_update: DONGIA,
                SO_LUONG_update: SL,
                THANHTIEN_update: THANHTIEN,
                MASP_old: MASP_old 
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
}
   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //
   function DisplayElementPage(elementPage) {
    var html = "";
    var CTPN_check = JSON.parse(localStorage.getItem("CTPN_check"));
    
    for (var i = 0; i < elementPage.length; i++) {
        var found = false; // Sử dụng biến này để kiểm soát xem đã tìm thấy phần tử khớp hay không
        for(var j = 0; j < CTPN_check.length; j++) {
            if (CTPN_check[j] === elementPage[i].MA_PN) {
                html += `
                    <form action="" method="POST">
                        <tr>
                            <td><input type="text" readonly value="${elementPage[i].MA_PN}" name="MAPN_CTPN" id="MAPN_CTPN"></td>
                            <td><input type="text" readonly value="${elementPage[i].MA_SP}" name="MaSP_CTPN" id="MaSP_CTPN"></td>
                            <td><input type="text" readonly value="${changePriceToString(elementPage[i].DON_GIA)}" name="DON_GIA_CTPN"  id="DON_GIA_CTPN"></td>
                            <td><input type="text" readonly value="${elementPage[i].SL}" name="SL_CTPN" id="SL_CTPN"></td>
                            <td><input type="text" readonly value="${changePriceToString(elementPage[i].THANH_TIEN)}" name="ThanhTien_CTPN" id="ThanhTien_CTPN"></td>
                            <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
                            <td><input type="submit" id="CTPN_xoa_btn" name="CTPN_xoa_btn" value="xóa" onclick="Delete(${elementPage[i].MA_PN},${elementPage[i].MA_SP})"></td>
                            <td><input type="button" class="CTPN_sửa_btn" id="thaotac1" value="sửa" data-index="${i}"></td>
                        </tr>
                    </form>`;
                found = true; // Đánh dấu là đã tìm thấy
                break; // Thoát khỏi vòng lặp bên trong
            }
        }
        if (!found) { // Nếu không tìm thấy, thêm HTML phù hợp
            html += `
                <form action="" method="POST">
                    <tr>
                        <td><input type="text" readonly value="${elementPage[i].MA_PN}" name="MAPN_CTPN" id="MAPN_CTPN"></td>
                        <td><input type="text" readonly value="${elementPage[i].MA_SP}" name="MaSP_CTPN" id="MaSP_CTPN"></td>
                        <td><input type="text" readonly value="${changePriceToString(elementPage[i].DON_GIA)}" name="DON_GIA_CTPN"  id="DON_GIA_CTPN"></td>
                        <td><input type="text" readonly value="${elementPage[i].SL}" name="SL_CTPN" id="SL_CTPN"></td>
                        <td><input type="text" readonly value="${changePriceToString(elementPage[i].THANH_TIEN)}" name="ThanhTien_CTPN" id="ThanhTien_CTPN"></td>
                        <td colspan="2">Không thể thao tác </td>
                    </tr>
                </form>`;
        }
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    
    
    
    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.CTPN_sửa_btn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var form_sua_CTPN = document.getElementById('suaCTPN_container');
            
            form_sua_CTPN.querySelector('#SL_sua_CTSP').value = elementPage[index].SL;
            form_sua_CTPN.querySelector('#DONGIA_sua_CTSP').value = elementPage[index].DON_GIA;
            form_sua_CTPN.querySelector('#MAPN_sua_hidden').value = elementPage[index].MA_PN;
            form_sua_CTPN.querySelector('#opt_MASP_sua').value = elementPage[index].MA_SP;
            form_sua_CTPN.querySelector('#MASP_sua_old').value = elementPage[index].MA_SP;

        form_sua_CTPN.style.display = 'block';
    });
});

}  

//chức năng ẩn form sửa
document.addEventListener('click', function(event){
    var form_sua_CTPN = document.getElementById('suaCTPN_container');
    if(event.target === form_sua_CTPN){
        form_sua_CTPN.style.display = 'none';
    }

})
//chức năng ẩn form sửa

//tạo sự kiện cho nút xác nhận sửa phiếu nhập
document.querySelector('#btn_xacnhan_sua').addEventListener('click', function(event){
    var MAPN = document.querySelector("#MAPN_sua_hidden").value;
    var MASP = document.querySelector("#opt_MASP_sua").value;
    var MASP_old = document.querySelector("#MASP_sua_old").value;
    var SL = document.querySelector("#SL_sua_CTSP").value;
    var DONGIA = changePriceToString(document.querySelector("#DONGIA_sua_CTSP").value);

     update(MAPN,MASP,DONGIA,SL,MASP_old);
})
//tạo sự kiện cho nút xác nhận sửa phiếu nhập

     
    //chức năng tìm kiếm
    var khoang = document.querySelector('.khoang');
    var khoang1 = document.querySelector('.khoang1');
    var khoang2 = document.querySelector('.khoang2');
    document.addEventListener('DOMContentLoaded', function(){
    var opt = document.getElementById('opt_timkiem_CTPN'); // Lấy thẻ select

    function toggleDateInput() {
        if(opt.value === 'DON_GIA'){
            khoang.style.display = 'block';
            khoang1.style.display = 'none';
            khoang2.style.display = 'none';
        }
        else if(opt.value === 'Số lượng'){
            khoang.style.display = 'none';
            khoang1.style.display = 'block';
            khoang2.style.display = 'none';
        }
        else if(opt.value === 'Thành tiền'){
            khoang.style.display = 'none';
            khoang1.style.display = 'none';
            khoang2.style.display = 'block';
        }
        else {
            khoang.style.display = 'none';
            khoang1.style.display = 'none';
            khoang2.style.display = 'none';
        }
    }
    opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
});
document.getElementById('btn_timkiem_CTPN').addEventListener('click', function(event){
    event.preventDefault();
    var opt = document.getElementById('opt_timkiem_CTPN').value;
    var txt = document.getElementById('txt_timkiem_CTPN').value;
    var rows = document.querySelectorAll('#table_CTPN table tbody tr');

        for(var i = 0; i < rows.length; i++){
            if(opt === 'MACTPN'){
            if(txt === ''){
                for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
            }
            else{
                var MACTPN = rows[i].querySelector('#MAPN_CTPN').value;
                if(chuyenDoiChuoi(MACTPN).includes(chuyenDoiChuoi(txt))){
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
                    var MaNV = rows[i].querySelector('#MaSP_CTPN').value;
                    if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
            }
            else if(opt === 'DON_GIA'){
                var khoang = document.querySelector('.khoang');
                var start = khoang.querySelector('#DONGIA_start_other').value;
                var end = khoang.querySelector('#DONGIA_end_other').value;

                if(txt === '' && start === '' && end === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
         }
                else{
                    var MaNSX = rows[i].querySelector('#DON_GIA_CTPN').value;
                    MaNSX = MaNSX.split('$');
                    var giaTri = parseFloat(MaNSX[0]); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangStart = parseFloat(start); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangEnd = parseFloat(end); // Chuyển đổi sang số để so sánh
                    if((giaTri >= giaTriKhoangStart && giaTri <= giaTriKhoangEnd) || giaTri === parseFloat(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
            }
            else if(opt === 'Số lượng'){
                var khoang1 = document.querySelector('.khoang1');
                var start = khoang1.querySelector('#SL_start_other').value;
                var end = khoang1.querySelector('#SL_end_other').value;

                if(txt === '' && start === '' && end === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }   
                }

                else{
                    var DG = rows[i].querySelector('#SL_CTPN').value;
                    var giaTri = parseFloat(DG); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangStart = parseFloat(start); // Chuyển đổi sang số để so sánh
                    var giaTriKhoangEnd = parseFloat(end); // Chuyển đổi sang số để so sánh
                    if((giaTri >= giaTriKhoangStart && giaTri <= giaTriKhoangEnd) || giaTri === parseFloat(txt)){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
            }


            else if(opt === 'Thành tiền'){
                var khoang2 = document.querySelector('.khoang2');
                var start = khoang2.querySelector('#THANHTIEN_start_other').value;
                var end = khoang2.querySelector('#THANHTIEN_end_other').value;
                if(txt === '' && start === '' && end === ''){
                    for(var i = 0; i < rows.length; i++){
            rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
            }
            else{
                var DG = rows[i].querySelector('#ThanhTien_CTPN').value;
                DG = DG.split('$');
                var giaTri = parseFloat(DG[0]); // Chuyển đổi sang số để so sánh
                var giaTriKhoangStart = parseFloat(start); // Chuyển đổi sang số để so sánh
                var giaTriKhoangEnd = parseFloat(end); // Chuyển đổi sang số để so sánh
                if((giaTri >= giaTriKhoangStart && giaTri <= giaTriKhoangEnd) || giaTri === parseFloat(txt)){
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
        var table_CTPN = document.querySelectorAll('#table_CTPN tbody tr');
        var jsonArray = [];

        for (var i = 0; i < table_CTPN.length; i++) {
            var MA_PN = table_CTPN[i].querySelector('#MAPN_CTPN').value;
            var MA_SP = table_CTPN[i].querySelector('#MaSP_CTPN').value;
            var DON_GIA = changePriceToNormal(table_CTPN[i].querySelector('#DON_GIA_CTPN').value);
            var SL = table_CTPN[i].querySelector('#SL_CTPN').value;
            var THANH_TIEN = changePriceToNormal(table_CTPN[i].querySelector('#ThanhTien_CTPN').value);
            var object = { MA_PN: MA_PN, SL: SL, MA_SP: MA_SP, DON_GIA: DON_GIA, THANH_TIEN: THANH_TIEN};
            jsonArray.push(object);

        }
    
        document.querySelector('.btn_sortAZ_CTPN').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTPN tbody');
            var key = document.querySelector('#opt_sapxep_CTPN').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA_CTPN').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTPN tbody');
            var key = document.querySelector('#opt_sapxep_CTPN').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_giam(jsonArray, key); // sắp xếp mảng
            console.log(array_sapxep);
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

