let list = document.querySelector('.lazy-img .list');
let items = document.querySelectorAll('.lazy-img .list .item');
let dots = document.querySelectorAll('.lazy-img .dots li');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');

let active = 0;
let lengthItems = items.length - 1;



next.addEventListener('click', ()=>{
   if(active + 1 > lengthItems){
      active = 0;
   }else{
      active += 1;
   }
   reloadSilider()
})

prev.addEventListener('click', ()=>{
   if(active - 1 < 0){
      active = lengthItems;
   }else{
      active -= 1;
   }
   reloadSilider()
})

let refreshSlider = setInterval(()=>{
   next.click()
}, 3000);

function reloadSilider(){
   clearInterval(refreshSlider);
   let checkLeft = items[active].offsetLeft;
   list.style.left = -checkLeft + 'px';

   let lastActiveDot = document.querySelector('.lazy-img .dots li.active');
   lastActiveDot.classList.remove('active');
   dots[active].classList.add('active');
   refreshSlider = setInterval(()=>{next.click()}, 3000);
}

dots.forEach((li, key)=>{
   li.addEventListener('click', ()=>{
      active = key;
      reloadSilider();
   })
})


// Gọi hàm read để lấy dữ liệu 

// Gọi hàm read để lấy dữ liệu 
check();           
    function check(){
      var page = localStorage.getItem('page');
      var title = document.querySelector('h2');
      if(page == 'Sản phẩm'){
         title.innerHTML = 'Sách nổi bật';
         read();
         read_TK();
      }
    }            
  
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
            timkiem();

        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
   //loadData

function read_TK(){
      var operation = "Read";
      var tableName = "tai_khoan";
      var condition = "MA_TK=" + localStorage.getItem("account_curr");
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
            document.getElementById("point_TK").innerText = response[0].DIEM;
            document.getElementById("point_week").innerHTML = response[0].DIEM_DA_TICH_LUY_TRONG_TUAN;
          },
          error: function(xhr, status, error) {
             console.log(error);
          }
       });
}
   // -------------------------------------------formation-chức năng phụ------------------------------------------------ //
   
  //hàm hiển thị dữ liệu

  function DisplayElementPage(elementPage) {
   var html = "";
   for(var i = 0; i < elementPage.length; i++) {
       html += `
       <div class="slick-item">
       <img src="../Img/${elementPage[i].HINH_ANH}" alt="">
       <p class="item-name">${elementPage[i].TEN}</p>
          <span class="sale-price">Giá: ${changePriceToString(elementPage[i].GIA)}</span>
       <p class="author">Tác giả: ${elementPage[i].TAC_GIA}</p>
       <p class="release">Năm xuất bản: ${elementPage[i].NAM_XB}</p>
    </div>
       `;
   }
   var tbody = document.querySelector(".slick_list_nam");
   tbody.innerHTML = html;
   
}



  // chức năng tìm kiếm
  function timkiem(){
   document.getElementById('search').addEventListener('keypress', function(event){

      if(event.key === "Enter")
   {
      var page = localStorage.getItem('page');
    
      if(page == 'Sản phẩm'){
         var txt = document.getElementById('search').value;
         if(txt === ""){
            var rows = document.querySelectorAll('.slick_list_nam div');
            for(var i = 0; i < rows.length; i++){
                var ten = rows[i].querySelector('.item-name').innerText;
                if(chuyenDoiChuoi(ten).includes(chuyenDoiChuoi(txt))){
                    rows[i].style.display = 'block';
                }
                else{ 
                    rows[i].style.display = 'none';
                 }
            }
         }
         else{
            var rows = document.querySelectorAll('.slick_list_nam div');
               for(var i = 0; i < rows.length; i++){
                   var ten = rows[i].querySelector('.item-name').innerText;
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



var HD_btn = document.getElementById('HD_btn');
var PM_btn = document.getElementById('PM_btn');
var logo = document.getElementById('logo');

HD_btn.addEventListener('click', function(){
   localStorage.setItem('page','Bán hàng');
})

PM_btn.addEventListener('click', function(){
   localStorage.setItem('page','Phiếu mượn');
})

logo.addEventListener('click', function(){
   localStorage.setItem('page','Sản phẩm');
})


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


