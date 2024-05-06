
function show_CTPM(){
    var callcards = document.querySelectorAll('.callcard');
    callcards.forEach(callcard => {
        callcard.addEventListener('click', () => {
            // Hiện .callcard-detail khi ấn vào .callcard
            var callcardDetail = document.querySelector('.callcard-detail');
            callcardDetail.style.display = 'block';
    
            var MAPM = callcard.querySelector('#MAPM_hidden').value;
            var operation = "Read";
            var tableName = "chi_tiet_phieu_muon";
            var condition = "MA_PM = " + MAPM;
    
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
                        <td>${response[i].GHI_CHU_TRUOC_MUON}</td>
                        <td>${response[i].GHI_CHU_SAU_MUON}</td>
                    </tr>
                    `;
                }
                var tbody = document.querySelector(".callcard-detail .wrapper table tbody");
                tbody.innerHTML = html;
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        });
    });
    
    // Lấy tất cả các phần tử .close
    const closes = document.querySelectorAll('.close');
    
    // Lặp qua từng phần tử .close và thêm sự kiện click cho mỗi phần tử
    closes.forEach(close => {
        close.addEventListener('click', () => {
            // Ẩn .callcard-detail khi ấn vào nút đóng
            const callcardDetail = close.parentElement;
            callcardDetail.style.display = 'none';
        });
    });
}





// Gọi hàm read để lấy dữ liệu 
                
  
check_PM();           
    function check_PM(){
      var page = localStorage.getItem('page_curr');
      var title = document.querySelector('h2');
      if(page == 'Phiếu mượn'){
         title.innerHTML = 'Phiếu mượn';
         read_PM();
      }
    }   

 //loadData
  function read_PM() {
    var operation = "Read";
    var tableName = "phieu_muon";
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
            DisplayElementPage_PM(response);
            timkiem_PM();
            show_CTPM();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData

   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //
   
  //hàm hiển thị dữ liệu

  function DisplayElementPage_PM(elementPage) {
   var html = "";
   for(var i = 0; i < elementPage.length; i++) {
    var t;
    if(elementPage[i].TIEN_DO == 1){
        t = "Hoàn thành";
    }
    else{
        t = "Chưa hoàn thành";
    }
       html += `
       <div class="callcard">
       <p class="callcard-id">Mã phiếu mượn: ${elementPage[i].MA_PM}</p>
       <p class="librarian-id">Mã thủ thư cấp: ${elementPage[i].MA_TT}</p>
       <p class="start-date">Ngày cấp: ${elementPage[i].NGAY_CAP}</p>
       <p class="return-date">Ngày cấp: ${elementPage[i].NGAY_TRA}</p>
       <p class="note">Ghi chú: ${elementPage[i].GHI_CHU}</p>
       <p class="tien_do">Tiến độ: <span style="font-weight: bold; ">${t} </span></p>
       <input type="hidden" id="MAPM_hidden" value="${elementPage[i].MA_PM}">
   </div>  
       `;
   }
   var tbody = document.querySelector(".callcard-body");
   tbody.innerHTML = html;

   var div = tbody.querySelectorAll('div');
   for(var i=0; i<div.length; i++) {
    var tiendo = div[i].querySelector('.tien_do span');
    if(tiendo.innerText == "Hoàn thành"){
        tiendo.style.color = 'green';
    }
    else{
        tiendo.style.color = 'red';
    }
   }
}


  // chức năng tìm kiếm
  function timkiem_PM(){
    document.getElementById('search').addEventListener('keypress', function(event){
 
       if(event.key === "Enter")
    {
       var page = localStorage.getItem('page_curr');
     
       
       if(page == "Phiếu mượn"){
        var txt = document.getElementById('search').value;
        if(txt === ""){
           var rows = document.querySelectorAll('.callcard-body div');
           for(var i = 0; i < rows.length; i++){
               var ten = rows[i].querySelector('.callcard-id').innerText;
               if(chuyenDoiChuoi(ten).includes(chuyenDoiChuoi(txt))){
                   rows[i].style.display = 'block';
               }
               else{ 
                   rows[i].style.display = 'none';
                }
           }
        }
        else{
            var rows = document.querySelectorAll('.callcard-body div');
            for(var i = 0; i < rows.length; i++){
                  var ten = rows[i].querySelector('.callcard-id').innerText;
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