document.querySelector('.wrapper').style.display = 'none';
// Lấy tất cả các phần tử .callcard
const callcards = document.querySelectorAll('.callcard');

// Lặp qua từng phần tử .callcard và thêm sự kiện click cho mỗi phần tử
callcards.forEach(callcard => {
    callcard.addEventListener('click', () => {
        // Hiện .callcard-detail khi ấn vào .callcard
        const callcardDetail = callcard.parentElement.nextElementSibling.querySelector('.callcard-detail');
        callcardDetail.style.display = 'block';
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