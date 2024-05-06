
function show_CTHD(){
    var bills = document.querySelectorAll('.bill');
    bills.forEach(bill => {
        bill.addEventListener('click', () => {
            // Hiện .bill-detail khi ấn vào .bill
            var billDetail = document.querySelector('.bill-detail');
            billDetail.style.display = 'block';
    
            var MAHD = bill.querySelector('.bill-id span').innerText;
            var operation = "Read";
            var tableName = "chi_tiet_hoa_don";
            var condition = "MA_HD = " + MAHD;
    
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
                 var html = "";
    
                 for(var i = 0; i < response.length; i++) {
                    html += `
                <tr>
                    <td>${response[i].MA_SP}</td>
                    <td>${response[i].SL}</td>
                    <td>${changePriceToString(response[i].DON_GIA)}</td>
                    <td>${changePriceToString(response[i].THANH_TIEN)}</td>
                </tr>
                    `;
                }
                var tbody = document.querySelector(".bill-detail .wrapper table tbody");
                tbody.innerHTML = html;
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        });
    });
}

// Lấy tất cả các phần tử .close
const closes = document.querySelectorAll('.close');

// Lặp qua từng phần tử .close và thêm sự kiện click cho mỗi phần tử
closes.forEach(close => {
    close.addEventListener('click', () => {
        // Ẩn .bill-detail khi ấn vào nút đóng
        const billDetail = close.parentElement;
        billDetail.style.display = 'none';
    });
});






// Gọi hàm read để lấy dữ liệu 
                
  
check_HD();           
    function check_HD(){
      var page = localStorage.getItem('page_curr');
      var title = document.querySelector('h2');
      if(page == 'Bán hàng'){
         title.innerHTML = 'Hóa đơn';
         read_HD();
      }
    }   

 //loadData
  function read_HD() {
    var operation = "Read";
    var tableName = "hoa_don";
    var account = localStorage.getItem("account_curr");
    var condition = "TRANG_THAI = '1' AND MA_TK = " + account;
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
            DisplayElementPage_HD(response);
            timkiem_HD();
            show_CTHD();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //
   
  //hàm hiển thị dữ liệu

  function DisplayElementPage_HD(elementPage) {
   var html = "";
   for(var i = 0; i < elementPage.length; i++) {
       html += `
    <div class="bill">
       <p class="bill-id">Mã Hóa đơn: <span>${elementPage[i].MA_HD}</span></p>
       <p class="date">Ngày tạo: ${elementPage[i].NGAY_TAO}</p>
       <p class="librarian-id">Mã thủ thư cấp: ${elementPage[i].MA_TT}</p>
       <p class="total">Tổng tiền: ${changePriceToString(elementPage[i].TONG_TIEN)}</p>
   </div>
       `;
   }
   var tbody = document.querySelector(".bill-body");
   tbody.innerHTML = html;
   
}


  // chức năng tìm kiếm
  function timkiem_HD(){
    document.getElementById('search').addEventListener('keypress', function(event){
 
       if(event.key === "Enter")
    {
       var page = localStorage.getItem('page_curr');
     
       
       if(page == "Bán hàng"){
        var txt = document.getElementById('search').value;
        if(txt === ""){
           var rows = document.querySelectorAll('.bill-body div');
           for(var i = 0; i < rows.length; i++){
               var ten = rows[i].querySelector('.bill-id').innerText;
               if(chuyenDoiChuoi(ten).includes(chuyenDoiChuoi(txt))){
                   rows[i].style.display = 'block';
               }
               else{ 
                   rows[i].style.display = 'none';
                }
           }
        }
        else{
            var rows = document.querySelectorAll('.bill-body div');
            for(var i = 0; i < rows.length; i++){
                  var ten = rows[i].querySelector('.bill-id').innerText;
                  if(chuyenDoiChuoi(ten).includes(chuyenDoiChuoi(txt))){
                      rows[i].style.display = 'block';
                  }
                  else{ 
                    
                      rows[i].style.display = 'none';
                   }
              }
        }
       }
      
       }
    })
   }
  
 
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
 
 
 