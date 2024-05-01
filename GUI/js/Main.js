var mainPage = './Main.php'
var billPage = "./Bill.php";
var callCardPage = "./CallCard.php";

// Chuyển hướng sang trang hoá đơn
document.querySelector('.nav li:nth-child(1)').addEventListener('click', function() {
   window.location.href = billPage;
});

// Chuyển hướng sang trang phiếu mượn
document.querySelector('.nav li:nth-child(2)').addEventListener('click', function() {
   window.location.href = callCardPage;
});