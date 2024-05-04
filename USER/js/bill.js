document.querySelector('.wrapper').style.display = 'none';
// Lấy tất cả các phần tử .bill
const bills = document.querySelectorAll('.bill');

// Lặp qua từng phần tử .bill và thêm sự kiện click cho mỗi phần tử
bills.forEach(bill => {
    bill.addEventListener('click', () => {
        // Hiện .bill-detail khi ấn vào .bill
        const billDetail = bill.parentElement.nextElementSibling.querySelector('.bill-detail');
        billDetail.style.display = 'block';
    });
});

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