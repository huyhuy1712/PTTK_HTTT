// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "nha_cung_cap";
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

            // Sau NCCi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLNCC_HT = document.querySelector('#SLNCC_HT span');
var rows = document.querySelectorAll('#table_NCC table tbody tr ');
SLNCC_HT.innerText = rows.length;
            //cập nhật lại số lượng sản phẩm
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //


   function DisplayElementPage(elementPage) {
    var html = "";
    var TT = "";
    for (var i = 0; i < elementPage.length; i++) {
        if(elementPage[i].TRANG_THAI == 0){
            TT = "Ngừng hợp tác";
        }
        else{
            TT = "Đang hợp tác";
        }

        html += `
        <tr>
        <td id="NCC_Ma">${elementPage[i].MA_NCC}</td>
        <td id="Ten_NCC">${elementPage[i].TEN}</td>
        <td id="NCC_Email">${elementPage[i].EMAIL}</td>
        <td id="NCC_TRANG_THAI">${TT}</td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    
    // chức năng tìm kiếm
document.getElementById('btn_timkiem_NCC').addEventListener('click', function(event){
    event.preventDefault();
 var opt = document.getElementById('opt_timkiem_NCC').value;
 var txt = document.getElementById('txt_timkiem_NCC').value;
  var rows = document.querySelectorAll('#table_NCC table tbody tr');
 
 if(opt === 'MANCC'){
 
     for(var i = 0; i < rows.length; i++){
         var MANCC = rows[i].querySelector('#NCC_Ma').innerText;
         if(MANCC.indexOf(txt) !== -1){
             rows[i].style.display = 'table-row';
         }
         else{ 
             rows[i].style.display = 'none';
          }
     }
 }

 
 else if(opt === 'Tên NCC'){
 
 for(var i = 0; i < rows.length; i++){
     var MaNV = rows[i].querySelector('#Ten_NCC').innerText;
     if(chuyenDoiChuoi(MaNV).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }
 

 
 else if(opt === 'Email') {
     for(var i = 0; i < rows.length; i++){
     var MaNCC = rows[i].querySelector('#NCC_Email').innerText;
     if(chuyenDoiChuoi(MaNCC).includes(chuyenDoiChuoi(txt))){
         rows[i].style.display = 'table-row';
     }
     else{ 
         rows[i].style.display = 'none';
      }
 }
 }

 else if(opt === 'TRANGTHAI') {
    for(var i = 0; i < rows.length; i++){
    var MaNCC = rows[i].querySelector('#NCC_TRANG_THAI').innerText;
    if(chuyenDoiChuoi(MaNCC).includes(chuyenDoiChuoi(txt))){
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
 
//  //chức năng tìm kiếm


//Lê Ngọc Anh Huy -> lengocanhhuy
function chuyenDoiChuoi(chuoi) {
    return chuoi.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f\s]/g, "");
}
