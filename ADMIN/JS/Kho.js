// Gọi hàm read để lấy dữ liệu 
read();
// Gọi hàm read để lấy dữ liệu 



 //loadData
 function read() {
    var operation = "Read";
    var tableName = "kho";
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

            // Sau Khoi nhận được dữ liệu, gọi hàm DisplayElementPage
            DisplayElementPage(response);
            display_sort();
            //cập nhật lại số lượng sản phẩm
            var SLKho_HT = document.querySelector('#SLKho_HT span');
var rows = document.querySelectorAll('#table_Kho table tbody tr ');
SLKho_HT.innerText = rows.length;
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
        <td id="kho_MASP">${elementPage[i].MA_SP}</td>
        <td id="kho_SL_CL">${elementPage[i].SL_CL}</td>
       </tr>
        `;
    }
    var tbody = document.getElementById("data");
    tbody.innerHTML = html;
    }


    

 //chức năng tìm kiếm
    document.getElementById('btn_timkiem_Kho').addEventListener('click', function(event){
        event.preventDefault();
        var opt = document.getElementById('opt_timkiem_Kho').value;
        var txt = document.getElementById('txt_timkiem_Kho').value;
        var rows = document.querySelectorAll('#table_Kho table tbody tr');
    
            for(var i = 0; i < rows.length; i++){
                if(opt === 'MA_SP'){
                if(txt === ''){
                    for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                }
                else{
                    var MAKho = rows[i].querySelector('#kho_MASP').innerText;
        
                    if(MAKho === txt){
                        rows[i].style.display = 'table-row';
                    }
                    else{ 
                        rows[i].style.display = 'none';
                    }
                }
                }
    
                else if(opt === 'SLCL'){
                    if(txt === ''){
                        for(var i = 0; i < rows.length; i++){
                rows[i].style.display = 'table-row'; // Hiển thị lại toàn bộ các hàng
            }
                    }
                    else{
                        var MaNV = rows[i].querySelector('#kho_SL_CL').innerText;
                        if(MaNV.indexOf(txt) !== -1){
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
        var table_Kho = document.querySelectorAll('#table_Kho tbody tr');
        var jsonArray = [];

        for (var i = 0; i < table_Kho.length; i++) {
            var MASP = table_Kho[i].querySelector('#kho_MASP').innerText;
            var CL = table_Kho[i].querySelector('#kho_SL_CL').innerText;
    
            var object = { MA_SP: MASP, SL_CL: CL};
            jsonArray.push(object);

        }
    
        document.querySelector('.btn_sortAZ').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_Kho tbody');
            var key = document.querySelector('#opt_sapxep_Kho').value;
            tbody.innerHTML = '';
            var array_sapxep = sortByKey_tang(jsonArray, key); // sắp xếp mảng
         DisplayElementPage(array_sapxep);
        });

        document.querySelector('.btn_sortZA').addEventListener('click', function(event) {
            event.preventDefault();
            var tbody = document.querySelector('#table_Kho tbody');
            var key = document.querySelector('#opt_sapxep_Kho').value;
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