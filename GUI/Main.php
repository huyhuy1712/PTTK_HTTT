<?php include './genaral/header.php'; ?>
<?php include './Genaral/general.php'; ?>
<?php include './Genaral/login.php'; ?>
<link rel="stylesheet" href="./CSS/MainCSS/body.css">
<header class="header">
   <div class="left-section">
      <ul class="nav">
         <li>Hoá đơn</li>
         <li>Phiéu mượn</li>
      </ul>
      <div class="nav2">
         <i class="fa-solid fa-list"></i>
      </div>
   </div>

   <div class="mid-section">
      <a href="./Main.php">
         <img src="./img/logo.png" alt="">
      </a>
   </div>

   <div class="right-section">
      <div class="header-conten-right">
         <p class="point" style="color: white;">Điểm:0</p>
         <div class="search-box">
            <input placeholder="Search" type="text">
            <i class="fa-solid fa-magnifying-glass"></i>
         </div>
         <div class="user-wrapper">
            <i class="fa-solid fa-user user"></i>
            <div class="user-selection" style="display: none;">
               <div class="unlog" style="display: block;">
                  <a href="./Login.php">đăng nhập</a>
                  <a href="./Signup.php">đăng ký</a>
               </div>
               <div class="log" style="display: none;">
                  <p>Hi, </p>
                  <a href="">Đăng xuất</a>
               </div>
            </div>
         </div>
      </div>
</header>

<div class="slider">
   <div class="lazy-img">
      <div class="list">
         <div class="item">
            <img src="img/bg_thuvien.jpg" alt="">
         </div>

         <div class="item">
            <img src="img/a2.jpeg" alt="">
         </div>

         <div class="item">
            <img src="img/a3.jpg" alt="">
         </div>

         <div class="item">
            <img src="img/a4.jpg" alt="">
         </div>

      </div>
      <!-- button -->
      <div class="buttons">
         <button id="prev">
            < <button id="next">>
         </button>
      </div>
      <!-- dot -->
      <ul class="dots">
         <li class="active"></li>
         <li></li>
         <li></li>
         <li></li>
      </ul>
   </div>
</div>

<div class="body">
   <div class="block-title">
      <strong>Sách nổi bận</strong>
   </div>
   <div class="slick-list nam">
      <div class="slick-item">
         <img src="./img/ielts18.jpg" alt="">
         <p class="item-name">Sách Ielts Cambridge 18</p>
         <div class="item-price">
            <span class="sale-price">149.000đ</span>
            <span class="item-old-price">350.000</span>
            <span class="sale-percent">
               <span>-57%</span>
            </span>
         </div>
      </div>

      <div class="slick-item">
         <img src="./img/ielts17.jpg     " alt="">
         <p class="item-name">Sách Ielts Cambridge 17</p>
         <div class="item-price">
            <span class="sale-price">689.000đ</span>
            <span class="item-old-price">310.000</span>
            <span class="sale-percent">
               <span>-57%</span>
            </span>
         </div>
      </div>

      <div class="slick-item">
         <img src="./img/ielts16.jpg     " alt="">
         <p class="item-name">Sách Ielts Cambridge 16</p>
         <div class="item-price">
            <span class="sale-price">2349.000đ</span>
            <span class="item-old-price">1.110.000</span>
            <span class="sale-percent">
               <span>-58%</span>
            </span>
         </div>
      </div>

      <div class="slick-item">
         <img src="./img/ielts15.jpg     " alt="">
         <p class="item-name">Sách Ielts Cambridge 15</p>
         <div class="item-price">
            <span class="sale-price">689.000đ</span>
            <span class="item-old-price">310.000</span>
            <span class="sale-percent">
               <span>-57%</span>
            </span>
         </div>
      </div>
   </div>
   <div class="more">
      <button>Xem thêm</button>
   </div>

   <div class="block-title">
      <strong>Đồ nữ nổi bật</strong>
   </div>
   <div class="slick-list nu">
      <div class="slick-item">
         <img src="./img/ao2.jpg     " alt="">
         <p class="item-name">Áo Sơ Mi Tay Dài Nam Trơn Form Fitted - 10F22SHL042C</p>
         <div class="item-price">
            <span class="sale-price">149.000đ</span>
            <span class="item-old-price">350.000</span>
            <span class="sale-percent">
               <span>-57%</span>
            </span>
         </div>
         <div class="item-color">
            <div class="colors"><img src="./img/nau.png" alt=""></div>
            <div class="colors"><img src="./img/den.jpg" alt=""></div>
         </div>
      </div>

      <div class="slick-item">
         <img src="./img/ao1.jpg     " alt="">
         <p class="item-name">Áo Polo Nam Premium Tay Ngắn Sọc Gân Form Fitted - 10S24POL001P</p>
         <div class="item-price">
            <span class="sale-price">689.000đ</span>
            <span class="item-old-price">310.000</span>
            <span class="sale-percent">
               <span>-57%</span>
            </span>
         </div>
         <div class="item-color">
            <div class="colors"><img src="./img/nau.png" alt=""></div>
            <div class="colors"><img src="./img/trang.jpg" alt=""></div>
         </div>
      </div>

      <div class="slick-item">
         <img src="./img/ao3.jpg     " alt="">
         <p class="item-name">Áo Sơ Mi Nam Tay Dài Trơn Ôm Form Fitted - 10F21SHL003CR2</p>
         <div class="item-price">
            <span class="sale-price">2349.000đ</span>
            <span class="item-old-price">1.110.000</span>
            <span class="sale-percent">
               <span>-58%</span>
            </span>
         </div>
         <div class="item-color">
            <div class="colors"><img src="./img/ao3.jpg" alt=""></div>
         </div>
      </div>

      <div class="slick-item">
         <img src="./img/ao4.jpg     " alt="">
         <p class="item-name">Áo Sơ Mi Nam Tay Dài Nút Ẩn Trơn Form Fitted - 10F21SHL003CR1</p>
         <div class="item-price">
            <span class="sale-price">689.000đ</span>
            <span class="item-old-price">310.000</span>
            <span class="sale-percent">
               <span>-57%</span>
            </span>
         </div>
         <div class="item-color">
         </div>
      </div>
   </div>
   <div class="more">
      <button>Xem thêm</button>
   </div>

</div>
<script src="./js/LazyImg.js"></script>
<script src="./js//Main.js"></script>
<?php require './genaral/footer.php'; ?>
<?php require './Genaral/alert.php'; ?>
