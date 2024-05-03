//legal details
let icon = document.querySelector('.legal-details .content');
let legal = document.querySelector('.legal-details');
let content = document.querySelector('.legal-details pre');
let check = true;
icon.addEventListener('click',function(){
    if(check == true){
        content.style.display = 'none';
        check = false;
        legal.style.height = '100px';
    }
    else{
        content.style.display = 'block';
        check = true;
        legal.style.height = '300px';
    }
})


// //--------------------------------------------------------//
// //tạo hiệu ứng trượt slide
const slider = document.querySelector('.slide-container');
const slides = document.querySelector('.slides');
let currentSlide = 0;
const totalSlides = 2; // Số lượng tổng ảnh trong container (trong trường hợp này là 3)

function updateSliderPosition() {
const offset = -currentSlide * 736; // 736 là image width
slides.style.transform = `translateX(${offset}px)`;
}


updateSliderPosition(); 
//tự động trượt slide 
let autoslide;

function changeslide(){
if(currentSlide < totalSlides) {
currentSlide++;
} else{
currentSlide = 0 // trượt về slide đầu
}
updateSliderPosition();
}

function startAutoSlide(){
autoslide = setInterval(() => {  changeslide();}, 1500);//hàm tạo sự kiện tự động sau 1 khoảng thời gian  sau 2s
}

function stopAutoSlide(){
clearInterval(autoslide);
}

//bắt đầu tự động trượt slide khi vào wed
startAutoSlide();

//tạm dựng khi hover chuột vào slider
slider.addEventListener('mouseenter', stopAutoSlide);

//tiếp tục khỉ rẻ chuột ra khỏi slider
slider.addEventListener('mouseleave', startAutoSlide);

//--------------------------------------------------------//


//-------------------------------------------------------//
//tạo hiệu ứng scroll lên xuống

//nut lên
document.addEventListener('DOMContentLoaded', function(){
    var scroll_btn = document.querySelector('.scroll_up_btn');
    var isScrolling = false; // Biến để xác định trạng thái cuộn

    scroll_btn.addEventListener('click', function(){
        // Cuộn lên trên
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (document.documentElement.scrollTop > 10) {
            if (!isScrolling) { // Nếu đang ngừng cuộn
                isScrolling = true; // Đặt trạng thái cuộn
                scroll_btn.style.right = "0px"; // Hiển thị nút khi cuộn trang xuống
            }
        } else {
            isScrolling = false; // Đặt trạng thái cuộn
            scroll_btn.style.right = "-100px"; // Ẩn nút khi cuộn lên đầu
        }
    });
});

//nút xuống
document.addEventListener('DOMContentLoaded', function(){
    var scroll_btn1 = document.querySelector('.scroll_down_btn');
    var isScrolling1 = false; // Biến để xác định trạng thái cuộn

    scroll_btn1.addEventListener('click', function(){
        // Cuộn  xuống
        window.scrollTo({
            top: document.body.scrollHeight, // Cuộn đến cuối trang
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (!isScrolling1) { // Nếu đang ngừng cuộn
                scroll_btn1.style.left = "-100px"; 
                isScrolling1 = true; // Đặt trạng thái cuộn
            }
        } else {
            scroll_btn1.style.left = "0px"; 
            isScrolling1 = false; // Đặt trạng thái cuộn
        }
    });
});
//-------------------------------------------------------//