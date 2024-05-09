// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "phieu_muon";
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
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLPM_HT = document.querySelector('.SLPM_HT span');
            var rows = document.querySelectorAll('#table_PM table tbody tr ');
            SLPM_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData
   function add() {
    var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
var day = currentDate.getDate();

// Định dạng lại chuỗi theo định dạng "YYYY-MM-DD"
var formattedDateString = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;



    var NGAY_TRA = $('#ngaytr_PM').val();
    var MA_TK = $('#ten_TK_thanhtoan').val();
    var GHI_CHU = "Không có ghi chú";
    var MA_TT = $("#opt_MANV_themPM").val();
    var TRANG_THAI = 0;
    var TIEN_DO = 0;
    var table_CTPM = document.querySelectorAll('#data_CTSP tr');
    if(table_CTPM.length == 0){
        alert('Hãy chọn sản phẩm cần mượn !!');
    }
    else{
            var data = {
                MA_TK: MA_TK,
                NGAY_CAP: formattedDateString,
                NGAY_TRA: NGAY_TRA,
                MA_TT: MA_TT,
                GHI_CHU: GHI_CHU,
                TRANG_THAI: TRANG_THAI,
                TIEN_DO: TIEN_DO
            };
            
            var jsonData = JSON.stringify(data);
            console.log(data);
            var operation = "Create";
            var tableName = "phieu_muon";
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
                    //đọc ra phiếu mượn vừa thêm
                    var newMAPM = response[response.length - 1].MA_PM;
                    var table_CTPM = document.querySelectorAll('#data_CTSP tr');
        
                    for (var i = 0; i < table_CTPM.length; i++) {
                        var MASP_CTPM = table_CTPM[i].querySelector('#MASP_CTPM').innerText;
                        var ghichu_trc = table_CTPM[i].querySelector('#ghichu_trc').value;
                        var ghichu_sau = table_CTPM[i].querySelector('#ghichu_sau').value;
                        var data = {
                            MA_PM: newMAPM,
                            MA_SP: MASP_CTPM,
                            GHI_CHU_TRUOC_MUON: ghichu_trc,
                            GHI_CHU_SAU_MUON: ghichu_sau,
                            SL: 1

                        };
        
                        var jsonData = JSON.stringify(data);
        
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                jsonData: jsonData,
                                operation: "Create",
                                tableName: 'chi_tiet_phieu_muon'
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
}


function update()
{
    var NGAY_TRA = $('#NGAY_TRA').val();
    var NGAY_TRA_old = $('#NGAY_TRA_old').val();
    var ghichu = $('#ghi_chu_sua').val();
    var tiendo = $('#tien_do_sua').val();
    var MAPM = $('#MAPM_sua').val();

    var date_new = new Date(NGAY_TRA);
    var date_old = new Date(NGAY_TRA_old);
    if(date_new < date_old){
        alert("ngày trả mới không được nhỏ hơn ngày trả cũ !!");
    }
    else{
        var data = {
            NGAY_TRA: NGAY_TRA,
            GHI_CHU: ghichu,
            TIEN_DO: tiendo,
        }

        var jsonData = JSON.stringify(data);
        var operation = "Update";
        var tableName = "phieu_muon";
        var idName = "MA_PM";
        var idValue = MAPM;
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            data: {
                jsonData : jsonData,
                operation: operation,
                tableName: tableName,
                idName : idName,
                idValue : idValue
            },
            success: function(response0) {
                    if(tiendo == 1){
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            datatype: 'json',
                            data: {
                                operation: 'Read',
                                tableName: 'chi_tiet_phieu_muon',
                                condition: 'MA_PM=' + MAPM
                            },
                            success: function(response1) {
                                var JSONArray = JSON.parse(response1);
                                for(var i = 0; i < response1.length; i++){
                                   
                                    var data = {
                                        TRANG_THAI: 0,
                                    }
                                    var jsonData = JSON.stringify(data);
                                    var operation = "Update";
                                    var tableName = "san_pham";
                                    var idName = "MA_SP";
                                    var idValue = JSONArray[i].MA_SP;
                                    $.ajax({
                                        url: '../AJAX_PHP/CRUD.php',
                                        type: 'POST',
                                        data: {
                                            jsonData : jsonData,
                                            operation: operation,
                                            tableName: tableName,
                                            idName : idName,
                                            idValue : idValue
                                        },
                                        success: function(data){
                                            location.reload();
                                        }
                                    })
                                }
                            },
                            error: function(xhr, status, error) {
                                console.log(error);
                            }
                        });   
                    }
                    else{
                        console.log('không có cập nhật');
                    }
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

        location.reload();

    }
}


function Delete(MAPM) {
    var operation = "Delete";
    var idName = "MA_PM";
    var idValue = MAPM;

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

    // // Xóa sản phẩm trong chi tiết phiếu mượn
    deleteFromTable("chi_tiet_phieu_muon", idName, idValue);

    // Xóa sản phẩm
    deleteFromTable("phieu_muon", idName, idValue);
    location.reload();
}






//hàm cho nút nhập
function nhap(MAPM,MATK) {

    var operation = "Read";
    var tableName = "chi_tiet_phieu_muon";
    var condition = "MA_PM=" + MAPM;

    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            operation: operation,
            tableName: tableName,
            condition: condition
        },
        success: function(response_0) {
          
            //đọc ra tài khoản
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
        success: function(response_1) {
            var DIEM_TUAN_old = parseFloat(response_1[0].DIEM_DA_TICH_LUY_TRONG_TUAN);
            var DIEM_old =  parseFloat(response_1[0].DIEM);
            var DIEM_new = DIEM_old + parseFloat(response_0.length);

            //cập nhật lại số diểm
            if(DIEM_TUAN_old !== 0){
                var DIEM_TUAN_new = DIEM_TUAN_old - parseFloat(response_0.length);
            if(DIEM_TUAN_new < 0){
                DIEM_TUAN_new = 0;
            }
          
            var data = {
             DIEM: DIEM_new,
             DIEM_DA_TICH_LUY_TRONG_TUAN: DIEM_TUAN_new
            }
    
            var jsonData = JSON.stringify(data);
            var operation = "Update";
            var tableName = "tai_khoan";
            var idName = "MA_TK";
            var idValue = MATK;
            $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName,
                    idName : idName,
                    idValue : idValue
                },
                success: function(){
                    console.log("Đã cập nhật điểm thành công !!");


                    //cập nhật trạng thái của phiếu mượn
                        var data = {
                            TRANG_THAI: 1,
                        }

                        var jsonData = JSON.stringify(data);
                        var operation = "Update";
                        var tableName = "phieu_muon";
                        var idName = "MA_PM";
                        var idValue = MAPM;
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            data: {
                                jsonData : jsonData,
                                operation: operation,
                                tableName: tableName,
                                idName : idName,
                                idValue : idValue
                            },
                            success: function(data){
                                console.log('đã cập nhật phiếu mượn thành công');

                //cập nhật trạng thái sách
                    for(var i = 0; i < response_0.length; i++){

                        var data = {
                            TRANG_THAI: 1,
                        }

                        var jsonData = JSON.stringify(data);
                        var operation = "Update";
                        var tableName = "san_pham";
                        var idName = "MA_SP";
                        var idValue = response_0[i].MA_SP;
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            data: {
                                jsonData : jsonData,
                                operation: operation,
                                tableName: tableName,
                                idName : idName,
                                idValue : idValue
                            },
                            success: function(data){
                                console.log('Đã cập nhất sản phẩm thành công');
                                location.reload();
                            },
                            error: function(xhr,status,error){
                                console.log(error);
                            }
                        })
                        
                    }
                            },
                            error: function(xhr,status,error){
                                console.log(error);
                            }
                        })
                },
                error: function(xhr, status, error) {
                    console.log(error);
                },
            })
            }
            
            else{
                    //cập nhật trạng thái của phiếu mượn
                        var data = {
                            TRANG_THAI: 1,
                        }

                        var jsonData = JSON.stringify(data);
                        var operation = "Update";
                        var tableName = "phieu_muon";
                        var idName = "MA_PM";
                        var idValue = MAPM;
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            data: {
                                jsonData : jsonData,
                                operation: operation,
                                tableName: tableName,
                                idName : idName,
                                idValue : idValue
                            },
                            success: function(data){
                                console.log('đã cập nhật phiếu mượn thành công');

                //cập nhật trạng thái sách
                    for(var i = 0; i < response_0.length; i++){

                        var data = {
                            TRANG_THAI: 1,
                        }

                        var jsonData = JSON.stringify(data);
                        var operation = "Update";
                        var tableName = "san_pham";
                        var idName = "MA_SP";
                        var idValue = response_0[i].MA_SP;
                        $.ajax({
                            url: '../AJAX_PHP/CRUD.php',
                            type: 'POST',
                            data: {
                                jsonData : jsonData,
                                operation: operation,
                                tableName: tableName,
                                idName : idName,
                                idValue : idValue
                            },
                            success: function(data){
                                console.log('Đã cập nhất sản phẩm thành công');
                                location.reload();
                            },
                            error: function(xhr,status,error){
                                console.log(error);
                            }
                        })
                        
                    }
                            },
                            error: function(xhr,status,error){
                                console.log(error);
                            }
                        })
                

            }         
        },
    })
        },
    })
}
//hàm cho nút nhập

// update số lượng sản phẩm khi xác nhận nhập phiếu

function update_TK(MATK,MAPM, callback) {
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
            read_SOPM(MAPM);
            var SOPM = parseFloat(localStorage.getItem('SOPM'));
            var DTL = parseFloat(response[0].DIEM_DA_TICH_LUY_TRONG_TUAN);
            if(DTL !== 0){
                DTL -= SOPM; 
                if(DTL <= 0){
                    DTL = 0;
                }
               console.log(DTL,parseFloat(response[0].DIEM) + SOPM); 
             var data = {
             DIEM_DA_TICH_LUY_TRONG_TUAN: DTL,
             DIEM: parseFloat(response[0].DIEM) + SOPM,
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
        }  
        },
        error: function(xhr, status, error) {
            console.log(error);
            callback(); // Gọi hàm hoàn thành dù có lỗi xảy ra
        }
    });
}

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {


    var html = "";
    var tiendo = "";
    var CTPM_check = [];
    localStorage.setItem('CTPM_check',JSON.stringify(CTPM_check));

    for (var i = 0; i < elementPage.length; i++) {
        if(elementPage[i].TIEN_DO == 0){
         tiendo = "chưa hoàn tất";
        }
        else{
         tiendo = "hoàn tất";
        }
        
        if (elementPage[i].TRANG_THAI == 0){
            CTPM_check.push(elementPage[i].MA_PM);
            localStorage.setItem('CTPM_check',JSON.stringify(CTPM_check));
            html += `
            <tr>
            <td id="PM_Ma">${elementPage[i].MA_PM}</td>
            <td id="PM_MaTK">${elementPage[i].MA_TK}</td>
            <td id="PM_TT">${elementPage[i].MA_TT}</td>
            <td id="PM_NGAYCAP">${elementPage[i].NGAY_CAP}</td>
            <td id="PM_NGAYTRA">${elementPage[i].NGAY_TRA}</td>
            <td id="PM_GHI_CHU">${elementPage[i].GHI_CHU}</td>
            <td id="PM_trang_thai">${tiendo}</td>
           <form action="" method="POST">
           <input type="hidden" name="MAPM_xoa" value="${elementPage[i].MA_PM}">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
          <td><input type="submit" value="xóa" name="btn_xoa_PM" class="thaotac" onclick="Delete(${elementPage[i].MA_PM})"></td>
          <td class="PM_sua_btn" data-index="${i}"><input type="button" class="thaotac" value="sửa"></td>
          </form>
           <form action="" method="POST">
           <input type="hidden" name="MAPM_nhap" value="${elementPage[i].MA_PM}">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
          <td><input type="button" value="nhập" name="btn_nhap_PM" id="btn_nhap_PM" class="thaotac"  onclick="nhap(${elementPage[i].MA_PM},${elementPage[i].MA_TK})"></td>
           </form>
           </tr>
            `;
        }
        else{
            html += `
            <tr>
            <td id="PM_Ma">${elementPage[i].MA_PM}</td>
            <td id="PM_MaTK">${elementPage[i].MA_TK}</td>
            <td id="PM_TT">${elementPage[i].MA_TT}</td>
            <td id="PM_NGAYCAP">${elementPage[i].NGAY_CAP}</td>
            <td id="PM_NGAYTRA">${elementPage[i].NGAY_TRA}</td>
            <td id="PM_GHI_CHU">${elementPage[i].GHI_CHU}</td>
            <td id="PM_trang_thai">${tiendo}</td>
           <form action="" method="POST">
           <input type="hidden" name="MAPM_xoa" value="${elementPage[i].MA_PM}">
           <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
           <td class="PM_sua_btn" data-index="${i}"><input type="button" class="thaotac" value="sửa"></td>
           <td colspan="2"><input type="button"  style="opacity: 0.6" value="nhập" name="btn_nhap_PM" id="btn_nhap_PM" class="thaotac"></td>
           </form>
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
                    var form_sua_PM = document.getElementById('container_sua_PM');
        
                    form_sua_PM.querySelector('#MAPM_sua').value = elementPage[index].MA_PM;
                    form_sua_PM.querySelector('#NGAY_TRA').value = elementPage[index].NGAY_TRA;
                    form_sua_PM.querySelector('#ghi_chu_sua').value = elementPage[index].GHI_CHU;
                    form_sua_PM.querySelector('#tien_do_sua').value = elementPage[index].TIEN_DO;

                    form_sua_PM.querySelector('#NGAY_TRA_old').value = elementPage[index].NGAY_TRA;

                    var tiendo_body = document.getElementById('form_tiendo');
                    if(elementPage[index].TRANG_THAI == 0){
                        tiendo_body.style.display = 'none';
                    }
                    else{
                        tiendo_body.style.display = 'block';
                    }
                    form_sua_PM.style.display = 'block';
                });
            });
    }

//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_PM = document.getElementById('container_sua_PM');
    if(event.target === form_sua_PM){
        form_sua_PM.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa
    
//chức năng tìm kiếm

document.addEventListener('DOMContentLoaded', function(){
    var opt = document.getElementById('opt_timkiem_PM'); // Lấy thẻ select
    var txt = document.getElementById('txt_timkiem_PM'); // Lấy thẻ select

    function toggleDateInput() {
        if(opt.value === 'NGAY_NHAP' || opt.value === 'NGAY_TRA'){
           txt.type = 'date';
        }
        else {
            txt.type = 'text';

        }
    }
    opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
});


document.getElementById('btn_timkiem_PM').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_PM').value;
 var txt = document.getElementById('txt_timkiem_PM').value;
  var rows = document.querySelectorAll('#table_PM table tbody tr');
 
 if(opt === 'MAPM'){
 
     for(var i = 0; i < rows.length; i++){
         var MAPM = rows[i].querySelector('#PM_Ma').innerText;
         if(chuyenDoiChuoi(MAPM).includes(chuyenDoiChuoi(txt))){
            rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'MATK'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#PM_MaTK').innerText;
     if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'MATT'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNSX = rows[i].querySelector('#PM_TT').innerText;
     if(chuyenDoiChuoi(MaNSX).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }

 else if(opt === 'NGAY_CAP'){
 
    for(var i = 0; i < rows.length; i++){
        var MaNSX = rows[i].querySelector('#PM_NGAYCAP').innerText;
        if(chuyenDoiChuoi(MaNSX).includes(chuyenDoiChuoi(txt))){
           rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
         }
    }
    }

    else if(opt === 'NGAY_TRA'){
 
        for(var i = 0; i < rows.length; i++){
            var MaNSX = rows[i].querySelector('#PM_NGAYTRA').innerText;
            if(chuyenDoiChuoi(MaNSX).includes(chuyenDoiChuoi(txt))){
               rows[i].style.display = 'table-row';
            }
            else{ 
                rows[i].style.display = 'none';
             }
        }
        }
        
    else if(opt === 'TIEn_DO'){
 
        for(var i = 0; i < rows.length; i++){
            var MaNSX = rows[i].querySelector('#PM_trang_thai').innerText;
            if(chuyenDoiChuoi(MaNSX).includes(chuyenDoiChuoi(txt))){
               rows[i].style.display = 'table-row';
            }
            else{ 
                rows[i].style.display = 'none';
             }
        }
        }
 

 
 else{
     for(var i = 0; i < rows.length; i++) {
       rows[i].style.display = 'table-row';
     }
 }
 })




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
        var table_PM = document.querySelectorAll('#table_PM tbody tr');
        var jsonArray = [];

        for (var i = 0; i < table_PM.length; i++) {
            var MA_PM = table_PM[i].querySelector('#PM_Ma').innerText;
            var MA_TK = table_PM[i].querySelector('#PM_MaTK').innerText;
            var NGAY_CAP = table_PM[i].querySelector('#PM_NGAYCAP').innerText;
            var NGAY_TRA = table_PM[i].querySelector('#PM_NGAYTRA').innerText;
            var MA_TT = table_PM[i].querySelector('#PM_TT').innerText;
            var TIEN_DO = table_PM[i].querySelector('#PM_trang_thai').innerText;
            var GHI_CHU = table_PM[i].querySelector('#PM_GHI_CHU').innerText;

            if(TIEN_DO == 'hoàn tất'){
                TIEN_DO = 1;
            }
            else{
                TIEN_DO = 0;
            }
            var object = { MA_PM: MA_PM, NGAY_CAP: NGAY_CAP, GHI_CHU: GHI_CHU, MA_TT: MA_TT, MA_TK: MA_TK, NGAY_TRA: NGAY_TRA, TIEN_DO: TIEN_DO};
            jsonArray.push(object);

        }
    
        document.querySelector('#btn_sortAZ_PM').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PM tbody');
            var key = document.querySelector('#opt_sapxep_PM').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('#btn_sortZA_PM').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_PM tbody');
            var key = document.querySelector('#opt_sapxep_PM').value;
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