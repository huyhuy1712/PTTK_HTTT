// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 
                
                
  
 //loadData
  function read() {
    var operation = "Read";
    var tableName = "san_pham";
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

            // Sau khi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLSP_HT = document.querySelector('#SLSP_HT span');
var rows = document.querySelectorAll('#table_SP table tbody tr ');
SLSP_HT.innerText = rows.length;
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
   //thêm sản phẩm trước
       var loai = $("#Loai_add").val();
       var Ten_SP = $("#TenSP_add").val();
       var Gia = $("#GIA_SP_add").val();
       var tacgia = $("#tacgia_add").val();
       var NXB = $("#NXB_add").val();
   var filePath = $('#ANH_SP_add').val();
   var ANH = filePath.split('\\').pop();
   
       var data = {
           TEN: Ten_SP,
           TAC_GIA: tacgia,
           NAM_XB: NXB,
           GIA: Gia,
           LOAI: loai,
           HINH_ANH: ANH,
           TRANG_THAI: 0
         };
         var jsonData = JSON.stringify(data);

   var operation = "Create";
   var tableName = "san_pham";

   if(loai !== '' && Ten_SP !== '' && Gia !== '' && tacgia !== '' && NXB !== '' && ANH !== ''){
   $.ajax({
   url: '../AJAX_PHP/CRUD.php',
   type: 'POST',
   dataType: 'json',
   data: {
       jsonData : jsonData,
       operation: operation,
       tableName: tableName
   },
   success: function(response) {
    //thêm vào kho
    var data = {
        MA_SP: response[response.length-1].MA_SP,
        SL_CL: 1
    }
    var jsonData = JSON.stringify(data);
    $.ajax({
        url: '../AJAX_PHP/CRUD.php',
        type: 'POST',
        dataType: 'json',
        data: {
            jsonData : jsonData,
            operation: 'Create',
            tableName: 'kho'
        },
        success: function(response){
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
   })
},
   error: function(xhr, status, error) {
       console.log(error);
   },
   });
}

else{
    alert('Hãy nhập đầy đủ thông tin !!');
}
   }

function update()
{
    var TenSP = $('#TenSP_sua').val();
    var Gia = $('#Gia_SP_sua').val();
    var tacgia = $('#TacGia_sua').val();
    var NXB = $('#NamXB_sua').val();
    var loai = $('#Loai_sua').val();
    var TrangThai = $('#TrangThai_sua').val();
    var fileInput = $('#AnhSP_sua')[0]; 
// Lấy giá trị của phần tử input loại file bằng jQuery
var filePath = $('#AnhSP_sua').val();

// Tách phần cuối của đường dẫn file (tức là tên file) bằng cách chia chuỗi bằng dấu gạch chéo (/)
var file = filePath.split('\\').pop();
    var files = fileInput.files;
    var MASP = $('#MASP_sua').val();

    if (files.length !== 0) {
        var data = {
            TEN: TenSP,
            GIA: Gia,
            TAC_GIA: tacgia,
            NAM_XB: NXB,
            LOAI: loai,
            TRANG_THAi: TrangThai,
            HINH_ANH: file
          };
    }
    else{
        var data = {
            TEN: TenSP,
            GIA: Gia,
            TAC_GIA: tacgia,
            NAM_XB: NXB,
            LOAI: loai,
            TRANG_THAi: TrangThai,
            HINH_ANH: $('#anh_su').val()
          };
}
    var jsonData = JSON.stringify(data);
    var operation = "Update";
    var tableName = "san_pham";
    var idName = "MA_SP";
    var idValue = MASP;
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
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}


function Delete(MASP) {
    var operation = "Delete";
    var idName = "MA_SP";
    var idValue = MASP;

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

    // Xóa sản phẩm trong kho
    deleteFromTable("kho", idName, idValue);

    // // Xóa sản phẩm trong chi tiết phiếu nhập
    deleteFromTable("chi_tiet_phieu_nhap", idName, idValue);

    // // Xóa sản phẩm trong chi tiết phiếu mượn
    deleteFromTable("chi_tiet_phieu_muon", idName, idValue);

    // // Xóa sản phẩm trong chi tiết hóa đơn
    deleteFromTable("chi_tiet_hoa_don", idName, idValue);
    

    // Xóa sản phẩm
    deleteFromTable("san_pham", idName, idValue);
    location.reload();
}

   
   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //
   
  //hàm hiển thị dữ liệu

  function DisplayElementPage(elementPage) {
    var html = "";
    for(var i = 0; i < elementPage.length; i++) {
        var TrangThai;
        if(elementPage[i].TRANG_THAI == 1){
            TrangThai = "Đã được mượn";
        }
        else{
            TrangThai = "Chưa được mượn";
        }
        html += `<tr>
        <td id="SP_MASP">${elementPage[i].MA_SP}</td>
        <td id="SP_ANH"><img src="../Img/${elementPage[i].HINH_ANH}" alt="##" style="height: 50px;"></td>
        <td id="SP_TEN">${elementPage[i].TEN}</td>
        <td id="SP_TAC_GIA">${elementPage[i].TAC_GIA}</td>
        <td id="SP_NAM_XB">${elementPage[i].NAM_XB}</td>
        <td id="SP_GIA">${changePriceToString(elementPage[i].GIA)}</td>
        <td id="SP_LOAI">${elementPage[i].LOAI}</td>
        <td id="SP_TRANG_THAI">${TrangThai}</td> 
        <td id="xxx"><input type="submit" name="SP_xoa_btn" class="thaotac" value="xóa" onclick="Delete(${elementPage[i].MA_SP})"></td>
        <form action="" method="POST" id="dieukien_sua"><td><input type="button" class="SP_sua_btn" id="thaotac_SP" value="sửa" data-index="${i}"></td></form></form>
        </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    

    // Lặp qua tất cả các nút sửa và gán sự kiện cho từng nút
    var editButtons = document.querySelectorAll('.SP_sua_btn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var form_sua_SP = document.getElementById('container_suaSP');

            form_sua_SP.querySelector('#TenSP_sua').value = elementPage[index].TEN;
            form_sua_SP.querySelector('#Gia_SP_sua').value = changePriceToNormal(elementPage[index].GIA);
            form_sua_SP.querySelector('#TacGia_sua').value = elementPage[index].TAC_GIA;
            form_sua_SP.querySelector('#NamXB_sua').value = elementPage[index].NAM_XB;
            form_sua_SP.querySelector('#Loai_sua').value = elementPage[index].LOAI;
            form_sua_SP.querySelector('#TrangThai_sua').value = elementPage[index].TRANG_THAI;

            form_sua_SP.querySelector('#MASP_sua').value = elementPage[index].MA_SP;
            form_sua_SP.querySelector('#anh_su').value = elementPage[index].HINH_ANH;

            form_sua_SP.style.display = 'block';
        });
    });
}


  // chức năng tìm kiếm
  document.getElementById('btn_timkiem_SP').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_SP').value;
 var txt = document.getElementById('txt_timkiem_SP').value;
  var rows = document.querySelectorAll('#table_SP table tbody tr');
 if(opt === 'MASP'){
 
     for(var i = 0; i < rows.length; i++){
         var MASP = rows[i].querySelector('#SP_MASP').innerText;
         if(MASP.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }
 
 else if(opt === 'tac_gia'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#SP_TAC_GIA').innerText;
     if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Tên_SP'){
 
 for(var i = 0; i < rows.length; i++){
     var MaSP = rows[i].querySelector('#SP_TEN').innerText;
     if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 
 else if(opt === 'Nam_XB') {
     for(var i = 0; i < rows.length; i++){
     var MaSP = rows[i].querySelector('#SP_NAM_XB').innerText;
     if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
        rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }

 else if(opt === 'Gia_ban') {
    for(var i = 0; i < rows.length; i++){
    var MaSP = rows[i].querySelector('#SP_GIA').innerText;
    if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
       rows[i].style.display = 'table-row';
    }
    else{ 
        rows[i].style.display = 'none';
     }
}
}

else if(opt === 'the_loai') {
    for(var i = 0; i < rows.length; i++){
    var MaSP = rows[i].querySelector('#SP_LOAI').innerText;
    if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
       rows[i].style.display = 'table-row';
    }
    else{ 
        rows[i].style.display = 'none';
     }
}
}
 
else if(opt === 'trang_thai') {
    for(var i = 0; i < rows.length; i++){
    var MaSP = rows[i].querySelector('#SP_TRANG_THAI').innerText;
    if(chuyenDoiChuoi(MaSP).includes(chuyenDoiChuoi(txt))){
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




//chức năng ẩn hiện form sửa
document.addEventListener('click', function(event){
    var form_sua_SP = document.getElementById('container_suaSP');
    if(event.target === form_sua_SP){
        form_sua_SP.style.display = 'none';
    }

})
    //chức năng ẩn hiện form sửa

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
