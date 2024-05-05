// Gọi hàm read để lấy dữ liệu 
read();

 //loadData
 function read() {
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "LOAI= 'Khách Hàng'";
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

            // Sau TKi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLTK_HT = document.querySelector('#SLTK_HT span');
var rows = document.querySelectorAll('#table_TK table tbody tr ');
SLTK_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData


   function add()
{
    var currentDate = new Date(); // Lấy ngày hiện tại
var futureDate = addYearsToDate(currentDate, 1);
    var NGAY_HH = futureDate;
    var TEN_TK = $('#CCCD_add').val();
    var MAT_KHAU = $('#MATKHAU_add').val();
    var TEN = $('#TenTK_add').val();
    var DC = $('#DIACHI_TK_add').val();

    var tr = document.querySelectorAll('#form_TK_admin table tbody tr');
    var check_TEN_TK = true;
    for(var i=0; i<tr.length; i++){
        if(tr[i].querySelector('#TK_TenTK').innerText === TEN_TK){
            check_TEN_TK = false;
        }
    }

    if(TEN_TK === "" || MAT_KHAU === "" || TEN === "" || DC === ""){
        alert('Vui lòng nhập đầy đủ thông tin !!');
    }

    else if(!check_TEN_TK){
        alert("Tên tài khoản đã tồn tại !!")
    }
    else if(!checkSDT(MAT_KHAU)  || !checkCCCD(TEN_TK)){
        alert("Mật khẩu phải đủ 10 số và CCCD phải đủ 12 số");
    }
    else{
        var data = {
            CCCD: TEN_TK,
            SDT: MAT_KHAU,
            DIA_CHI: DC,
            TINH_TRANG: 0,
            NGAY_HET_HAN: NGAY_HH,
            HO_TEN: TEN,
            DIEM: 1,
            LOAI: "Khách Hàng"
        };
    
        var jsonData = JSON.stringify(data);
    
        var operation = "Create";
        var tableName = "tai_khoan";
        $.ajax({
            url: '../AJAX_PHP/CRUD.php',
            type: 'POST',
            dataType: 'json',
            data: {
                jsonData : jsonData,
                operation: operation,
                tableName: tableName
            }, 
            success: function(response){
                var SOTK =  localStorage.getItem('SOTK');
                var new_SOTK = parseFloat(SOTK) + 1;
                
                localStorage.setItem('SOTK',new_SOTK);                location.reload();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    }
   }



function vohieu(MATK)
{

        var data = {
            TINH_TRANG: 0
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "tai_khoan";
    var idName = "MA_TK";
    var idValue = MATK;
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: operation,
            tableName: tableName,
            idName : idName,
            idValue : idValue
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


function mo(MATK)
{

        var data = {
            TINH_TRANG: 1
          };
          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "tai_khoan";
    var idName = "MA_TK";
    var idValue = MATK;
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: operation,
            tableName: tableName,
            idName : idName,
            idValue : idValue
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
 

function giahan(MATK)
{
var currentDate = new Date(); // Lấy ngày hiện tại
var futureDate = addYearsToDate(currentDate, 1);
        var data = {
            NGAY_HET_HAN: futureDate
        };

          var jsonData = JSON.stringify(data);

    var operation = "Update";
    var tableName = "tai_khoan";
    var idName = "MA_TK";
    var idValue = MATK;
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: operation,
            tableName: tableName,
            idName : idName,
            idValue : idValue
        },
        success: function(response) {
           var SOTK =  localStorage.getItem('SOTK');
           var new_SOTK = parseFloat(SOTK) + 1;
           localStorage.setItem('SOTK',new_SOTK);
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
    for (var i = 0; i < elementPage.length; i++) {
        if(elementPage[i].TINH_TRANG == 1){
            html += `
            <tr>
            <td id="TK_MATK">${elementPage[i].MA_TK}</td>
            <td id="TK_TenTK">${elementPage[i].CCCD}</td>
            <td id="TK_MatTKau">${elementPage[i].SDT}</td>
            <td id="TK_HoTen">${elementPage[i].HO_TEN}</td>
            <td id="TK_DICCHI">${elementPage[i].DIA_CHI}</td>
            <td id="TK_NgayHH">${elementPage[i].NGAY_HET_HAN}</td>
            <td id="TK_DIEM">${elementPage[i].DIEM}</td>
            <td id="TK_TINHTRANG">Hoạt động</td>

           <form action="" method="POST">
           <input type="hidden" name="MATK">
          <td><input type="button" value="vô hiệu" onclick="vohieu(${elementPage[i].MA_TK})" class="thaotac"></td>
           </form>
               <form action="" method="POST">
               <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
               <td><input type="submit" class="TK_sua_btn" id="thaotac_TK" value="gia hạn" onclick="giahan(${elementPage[i].MA_TK})" ></td>
               </form>
           </tr>
            `;
        }
        else{
            html += `
            <tr>
            <td id="TK_MATK">${elementPage[i].MA_TK}</td>
            <td id="TK_TenTK">${elementPage[i].CCCD}</td>
            <td id="TK_MatTKau">${elementPage[i].SDT}</td>
            <td id="TK_HoTen">${elementPage[i].HO_TEN}</td>
            <td id="TK_DICCHI">${elementPage[i].DIA_CHI}</td>
            <td id="TK_NgayHH">${elementPage[i].NGAY_HET_HAN}</td>
            <td id="TK_DIEM">${elementPage[i].DIEM}</td>
            <td id="TK_TINHTRANG">Đã khóa</td>

           <form action="" method="POST">
           <input type="hidden" name="MATK">
          <td><input  type="button" value="kích hoạt" onclick="mo(${elementPage[i].MA_TK})" class="thaotac"></td>
           </form>
               <form action="" method="POST">
               <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
               <td><input type="submit" class="TK_sua_btn" id="thaotac_TK" value="gia hạn" onclick="giahan(${elementPage[i].MA_TK})"></td>
               </form>
           </tr>
            `;
        }
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }



    
    // chức năng tìm kiếm

    document.addEventListener('DOMContentLoaded', function(){
        var opt = document.getElementById('opt_timkiem_TK'); // Lấy thẻ select
        var txt = document.getElementById('txt_timkiem_TK'); // Lấy thẻ select
    
        function toggleDateInput() {
            if(opt.value === 'NHH'){
               txt.type = 'date';
            }
            else {
                txt.type = 'text';
    
            }
        }
        opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
    });

document.getElementById('btn_timkiem_TK').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_TK').value;
 var txt = document.getElementById('txt_timkiem_TK').value;
  var rows = document.querySelectorAll('#table_TK table tbody tr');
 
 if(opt === 'MATK'){
 
     for(var i = 0; i < rows.length; i++){
         var MATK = rows[i].querySelector('#TK_MATK').innerText;
         if(MATK.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'CCCD'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#TK_TenTK').innerText;
     if(MaNV.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'MATKHAU'){
 
 for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_MatTKau').innerText;
     if(MaTK.includes(txt)){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'TEN') {
     for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_HoTen').innerText;
     if(chuyenDoiChuoi(MaTK).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'DC') {
     for(var i = 0; i < rows.length; i++){
     var MaTK = rows[i].querySelector('#TK_DICCHI').innerText;
     if(chuyenDoiChuoi(MaTK).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }

 else if(opt === 'NHH') {
    for(var i = 0; i < rows.length; i++){
    var MaTK = rows[i].querySelector('#TK_NgayHH').innerText;
    if(MaTK.includes(txt)){
        rows[i].style.display = 'table-row';
    }
    else{ 
        rows[i].style.display = 'none';
     }
}
}

else if(opt === 'DIEM') {
    for(var i = 0; i < rows.length; i++){
    var MaTK = rows[i].querySelector('#TK_DIEM').innerText;
    if(MaTK.includes(txt)){
        rows[i].style.display = 'table-row';
    }
    else{ 
        rows[i].style.display = 'none';
     }
}
}

else if(opt === 'TINH_TRANG') {
    for(var i = 0; i < rows.length; i++){
    var MaTK = rows[i].querySelector('#TK_TINHTRANG').innerText;
    if(chuyenDoiChuoi(MaTK).includes(chuyenDoiChuoi(txt))){
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
 
 //chức năng tìm kiếm

 
document.getElementById('tao_moi_diem').addEventListener('click', function(event){
    event.preventDefault();

    var operation = "Read";
    var tableName = "tai_khoan";
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
            for(var i = 0; i < response.length; i++) {
                var data = {
                    DIEM_DA_TICH_LUY_TRONG_TUAN: 10, 
                   };
                   var jsonData = JSON.stringify(data);
         
             var operation = "Update";
             var tableName = "tai_khoan";
             var idName = "MA_TK";
             var idValue = response[i].MA_TK;
             $.ajax({
                url: '../AJAX_PHP/CRUD.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    jsonData : jsonData,
                    operation: operation,
                    tableName: tableName,
                    idName : idName,
                    idValue : idValue
                },
                success: function(response) {
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
            }
            alert("Đã cập nhật lại điểm tích lũy");

        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });


})
 //chức năng hiện thị mật khẩu
 function togglePasswordVisibility() {
    var passwordField = document.getElementById("MATKHAU_add");
    var eyeIcon = document.getElementById("eyeIcon");
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
}

function checkCCCD(input) {
    // Kiểm tra độ dài chuỗi
    if (input.length !== 12) {
        return false;
    }
    return true;
}

function checkSDT(input) {
    // Kiểm tra độ dài chuỗi
    if (input.length !== 10) {
        return false;
    }
    return true;
}

function addYearsToDate(date, years) {
    // Tạo một bản sao của ngày
    var newDate = new Date(date);
    // Thêm số năm vào ngày
    newDate.setFullYear(newDate.getFullYear() + years);

    // Lấy ra năm, tháng và ngày
    var year = newDate.getFullYear();
    var month = ('0' + (newDate.getMonth() + 1)).slice(-2); // Thêm '0' trước nếu tháng chỉ có một chữ số
    var day = ('0' + newDate.getDate()).slice(-2); // Thêm '0' trước nếu ngày chỉ có một chữ số

    // Trả về ngày tháng năm dưới dạng chuỗi "yyyy-mm-dd"
    return year + '-' + day + '-' + month;
}

 //Lê Ngọc Anh Huy -> lengocanhhuy
 function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}
