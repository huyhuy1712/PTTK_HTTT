





function setusername(){
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
            document.querySelector('#username').innerHTML = response[0].CCCD;
        },
        error: function(xhr, status, error) {
           console.log(error);
        }
     });
}

setusername();



