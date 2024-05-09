// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "chi_tiet_phieu_muon";
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

            // Sau CTPMi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLCTPM_HT = document.querySelector('#SLCTPM_HT span');
var rows = document.querySelectorAll('#table_CTPM table tbody tr ');
SLCTPM_HT.innerText = rows.length;
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
    var MAPM = $('#MACTPM_sua').val();
    var MASP_new = $('#MASP_sua').val();
    var SL_new = $('#SL_CTPM_sua').val();
    var ghichu_trc = $('#ghi_chu_Trc').val();
    var ghichu_sau = $('#ghi_chu_Sau').val();

    var MASP_old = $('#MASP_old').val(); 

    $.ajax({
        url: '../AJAX_PHP/CTPM.ajax.php',
        type: 'POST',
        data: {
            MAPM: MAPM,
            MASP_new: MASP_new,
            SL_new: SL_new,
            ghichu_trc: ghichu_trc,
            ghichu_sau: ghichu_sau,
            
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

function Delete(MAPM,MASP)
{

    $.ajax({
        url: '../AJAX_PHP/CTPM.ajax.php',
        type: 'POST',
        data: {
            MAPM_xoa: MAPM,
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
    var CTPM_check = JSON.parse(localStorage.getItem("CTPM_check"));

    for (var i = 0; i < elementPage.length; i++) {
        var found = false; // Sử dụng biến này để kiểm soát xem đã tìm thấy phần tử khớp hay không
        for(var j = 0; j < CTPM_check.length; j++) {
            if (CTPM_check[j] === elementPage[i].MA_PM) {
                html += `
                <tr>
                <td id="MAPM">${elementPage[i].MA_PM}</td>
                <td id="MASP">${elementPage[i].MA_SP}</td>
                <td id="ghi_chu_truoc">${elementPage[i].GHI_CHU_TRUOC_MUON}</td>
                <td id="ghi_chu_sau">${elementPage[i].GHI_CHU_SAU_MUON}</td>
                <form action="" method="POST"><input type="hidden" name="MAPM"><td><input type="button" onclick="Delete(${elementPage[i].MA_PM},${elementPage[i].MA_SP})" value="xóa" class="thaotac"></td></form> 
                <form action="" method="POST"><input type="hidden" name="page" value="<?php echo $_POST["page"]; ?>
                <td class="PM_sua_btn" data-index="${i}"><input type="button" class="thaotac" value="sửa"></td></form>
               </tr>
                `;
                found = true; // Đánh dấu là đã tìm thấy
                break; // Thoát khỏi vòng lặp bên trong
            }
        }
        if(!found){
            html += `
            <tr>
            <td id="MAPM">${elementPage[i].MA_PM}</td>
            <td id="MASP">${elementPage[i].MA_SP}</td>
            <td id="ghi_chu_truoc">${elementPage[i].GHI_CHU_TRUOC_MUON}</td>
            <td id="ghi_chu_sau">${elementPage[i].GHI_CHU_SAU_MUON}</td>
            <td class="PM_sua_btn" data-index="${i}"><input type="button" class="thaotac" value="sửa"></td></form>
            <td colspan="1">Đã xuất phiếu mượn</td>
           </tr>
            `;
        }
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;


        // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
        var editButtons = document.querySelectorAll('.PM_sua_btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var form_sua_PM = document.getElementById('container_suaCTPM');
    
                form_sua_PM.querySelector('#MACTPM_sua').value = elementPage[index].MA_PM;
                form_sua_PM.querySelector('#MASP_sua').value = elementPage[index].MA_SP;
                form_sua_PM.querySelector('#ghi_chu_Trc').value = elementPage[index].GHI_CHU_TRUOC_MUON;
                form_sua_PM.querySelector('#ghi_chu_Sau').value = elementPage[index].GHI_CHU_SAU_MUON;

                
                form_sua_PM.querySelector('#MASP_old').value = elementPage[index].MA_SP;
    
                form_sua_PM.style.display = 'block';
            });
        });
    }


    
//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_PM = document.getElementById('container_suaCTPM');
    if(event.target === form_sua_PM){
        form_sua_PM.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa


     //chức năng tìm kiếm
     document.getElementById('btn_timkiem_CTPM').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_CTPM').value;
        var txt = document.getElementById('txt_timkiem_CTPM').value;
        var rows = document.querySelectorAll('#table_CTPM table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MAPM'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MACTPM = rows[i].querySelector('#MAPM').innerText;
        
                    if(MACTPM.includes(txt)){
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
                        var MaCTPM = rows[i].querySelector('#MASP').innerText;
                        if(MaCTPM.includes(txt)){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'ghichu_trc'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaCTPM = rows[i].querySelector('#ghi_chu_truoc').innerText;
        if(MaCTPM.includes(txt)){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'ghichu_sau'){
    
        if(txt === ''){
            for(var i = 0; i < rows.length; i++){
        rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
        }
        }
        else{
            var MaCTPM = rows[i].querySelector('#ghi_chu_sau').innerText;
            if(MaCTPM.includes(txt)){
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
        var table_CTPM = document.querySelectorAll('#table_CTPM tbody tr');
        var jsonArray = [];

        for (var i = 0; i < table_CTPM.length; i++) {
            var MA_PM = table_CTPM[i].querySelector('#MAPM').innerText;
            var MA_SP = table_CTPM[i].querySelector('#MASP').innerText;
            var GHI_CHU_TRUOC_MUON = table_CTPM[i].querySelector('#ghi_chu_truoc').innerText;
            var GHI_CHU_SAU_MUON = table_CTPM[i].querySelector('#ghi_chu_sau').innerText;
            var SL = 1;

            var object = { MA_PM: MA_PM, MA_SP: MA_SP, GHI_CHU_TRUOC_MUON: GHI_CHU_TRUOC_MUON, GHI_CHU_SAU_MUON: GHI_CHU_SAU_MUON, SL: SL};
            jsonArray.push(object);

        }
    
        document.querySelector('#btn_sortAZ_CTPM').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTPM tbody');
            var key = document.querySelector('#opt_sapxep_CTPM').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('#btn_sortZA_CTPM').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_CTPM tbody');
            var key = document.querySelector('#opt_sapxep_CTPM').value;
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