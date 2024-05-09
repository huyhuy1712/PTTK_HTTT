





function setusername(){
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + localStorage.getItem("account_curr_NV");
    
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
            document.querySelector('#username').innerHTML = response[0].CCCD;
        },
        error: function(xhr, status, error) {
           console.log(error);
        }
     });
}

setusername();




document.addEventListener('DOMContentLoaded', function(){
    var username = document.getElementById('ten_user');
    var CCCD = document.getElementById('CCCD_user');
    var PASS = document.getElementById('pass_user');

    $condition = "Read"
    var operation = "Read";
    var tableName = "tai_khoan";
    var condition = "MA_TK=" + localStorage.getItem("account_curr_NV");
    
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
            username.innerText = response[0].HO_TEN;
            CCCD.innerText = response[0].CCCD;
            PASS.innerText = response[0].SDT;
            },
        error: function(xhr, status, error) {
           console.log(error);
        }
     });
});


document.getElementById("form_TK_nguoidung").addEventListener("click", function(event){
    if(event.target == document.getElementById("form_TK_nguoidung")){
        document.getElementById("form_TK_nguoidung").style.display = "none";
    }
});


var logo = document.querySelector('#avatar');

logo.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("form_TK_nguoidung").style.display = "block";
});


document.getElementById("logout_btn").addEventListener("click", function(){
    window.location.href = '../USER/Login.php';
});