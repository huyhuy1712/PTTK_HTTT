<?php
require('../Model/Database.php');
$connect = new MyConnection("127.0.0.1", "root", "", "ql_thu_vien");
$connect->connectDB();
?>
<?php include './genaral/header.php'; ?>
<?php include './Genaral/general.php'; ?>
<link rel="stylesheet" href="./CSS/MainCSS/body.css">
<header class="header">
   <div class="left-section">
      <form method="POST" >
      <input type="submit" value="Hoá đơn" name="page" class="items" id="HD_btn">
      <input type="submit" value="Phiếu mượn" name="page" class="items" id="PM_btn">
      </form>
      <ul class="nav">
      </ul>
      <div class="nav2">
         <i class="fa-solid fa-list"></i>
      </div>
   </div>

   <div class="mid-section">
      <a href="./Main.php" id="logo">
         <img src="./img/logo.png" alt="">
      </a>
   </div>

   <div class="right-section">
      <div class="header-conten-right">
         <p class="point" style="color: white;">Điểm: <span id="point_TK"></span></p>
         <div class="search-box">
            <input placeholder="Search" id="search" type="text">
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
         <p class="point" style="color: white;">Điểm tuần: <span id="point_week"></span></p>
      </div>
</header>
<?php include './Genaral/login.php'; ?>
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
  
         <h2></h2>

      <div class="slick_list_nam">

      </div>
   

   <?php
   if (isset($_POST['page'])) {
      if ($_POST['page'] == 'Hoá đơn') {
         require('Bill.php');
      } else if ($_POST['page'] == 'Phiếu mượn') {
         require("CallCard.php");
      }
   }
   ?>
</div>
<script src="./js/LazyImg.js"></script>
<?php require './genaral/footer.php'; ?>
<?php require './Genaral/alert.php'; ?>

<style>
   .items {
    padding: 10px 20px;
    font-size: 22px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 10px;
    box-shadow: 1px 1px 30px rgba(0, 0, 0, -5);
    background-color: rgba(0, 0, 0, 0.2);
}

.items:hover {
    background-color: #0056b3;
}
</style>