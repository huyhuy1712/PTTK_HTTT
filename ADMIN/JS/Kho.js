// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "phieu_bao_hanh";
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

            // Sau PBHi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);

            //cập nhật lại số lượng sản phẩm
            var SLPBH_HT = document.querySelector('#SLPBH_HT span');
var rows = document.querySelectorAll('#table_PBH table tbody tr ');
SLPBH_HT.innerText = rows.length;
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
    for (var i = 0; i < elementPage.length; i++) {
        html += `
        <tr>
        <td id="PBH_MAPBH">${elementPage[i].MA_PBH}</td>
        <td id="PBH_SERIAL">${elementPage[i].MA_SERIAL}</td>
        <td id="PBH_MAKH">${elementPage[i].MA_KH}</td> 
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

 //chức năng tìm kiếm
    // var khoang = document.querySelector('.khoang');
    document.addEventListener('DOMContentLoaded', function(){
        var opt = document.getElementById('opt_timkiem_PBH'); // Lấy thẻ select
    
        function toggleDateInput() {
            if(opt.value === 'time_start' || opt.value === 'time_end'){
                // khoang.style.display = 'block';
                // document.getElementById('txt_timkiem_PBH').style.display = 'none';
                document.getElementById('txt_timkiem_PBH').type = 'date';
            }
            else {
                // khoang.style.display = 'none';
                // document.getElementById('txt_timkiem_PBH').style.display = 'block';
                document.getElementById('txt_timkiem_PBH').type = 'number';
            }
        }
        opt.addEventListener('change', toggleDateInput); // Lắng nghe sự kiện thay đổi của select
    });
    document.getElementById('btn_timkiem_PBH').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_PBH').value;
        var txt = document.getElementById('txt_timkiem_PBH').value;
        var rows = document.querySelectorAll('#table_PBH table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MAPBH'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MAPBH = rows[i].querySelector('#PBH_MAPBH').innerText;
        
                    if(MAPBH === txt){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'MAKH'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaNV = rows[i].querySelector('#PBH_MAKH').innerText;
                        if(MaNV.indexOf(txt) !== -1){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
                else if(opt === 'SERIAL'){
    
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
             }
                    else{
                        var MaNV = rows[i].querySelector('#PBH_SERIAL').innerText;
                        if(MaNV.indexOf(txt) !== -1){
                            rows[i].style.display = 'table-row';
                        }
                        else{ 
                            rows[i].style.display = 'none';
                        }
                    }
                }
    
                else if(opt === 'time_start'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#PBH_start_day').innerText;
        if(MaNV.indexOf(txt) !== -1){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    
    else if(opt === 'time_end'){
    
    if(txt === ''){
        for(var i = 0; i < rows.length; i++){
    rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    }
    }
    else{
        var MaNV = rows[i].querySelector('#PBH_end_day').innerText;
        if(MaNV.indexOf(txt) !== -1){
            rows[i].style.display = 'table-row';
        }
        else{ 
            rows[i].style.display = 'none';
        }
    }
    }
    //             else if(opt === 'time'){
    //                 var khoang = document.querySelector('.khoang');
    //                 var daystart = new Date(document.querySelector('#PBH_start_day').innerText);
    // var dayend = new Date(document.querySelector('#PBH_end_day').innerText);
    
    // var start = new Date(khoang.querySelector('#ngay_start_other').value);
    // var end = new Date(khoang.querySelector('#ngay_end_other').value);
    //                 console.log(start,end,daystart,dayend);
    //                 if(txt === '' && start === '' && end === ''){
    //                     for(var i = 0; i < rows.length; i++){
    //             rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
    //         }   
    //                 }
    
    //                 else{
    //                     if( dayend <= end && daystart >= start){
    //                         rows[i].style.display = 'table-row';
    //                     }
    //                     else{ 
    //                         rows[i].style.display = 'none';
    //                     }
    //                 }
    //             }
            }
    });
    //chức năng tìm kiếm
    