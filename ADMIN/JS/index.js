localStorage.setItem("SOTK", 0);
//hàm cho nút nhập

function setusername(){
    $.ajax({
        url: '../AJAX_PHP/Current_Account.php',
        type: 'POST',
        dataType: 'json',
        success: function(response){
            document.getElementById('username').innerText = response.tai_khoan.CCCD;
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}

setusername();


