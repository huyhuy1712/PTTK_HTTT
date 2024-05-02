<?php include './genaral/header.php'; ?>
<?php include './Genaral/general.php'; ?>
<link rel="stylesheet" href="./CSS/Bill.css">
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
                        <a href="">Thông tin</a>
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
                <img src="img/pexels-iriser-1379636.jpg" alt="">
            </div>

            <div class="item">
                <img src="img/pexels-iriser-2781760.jpg" alt="">
            </div>

            <div class="item">
                <img src="img/pexels-sohi-807598.jpg" alt="">
            </div>

            <div class="item">
                <img src="img/pexels-souvenirpixels-417074.jpg" alt="">
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


<script src="./js/LazyImg.js"></script>
<script src="./js//Main.js"></script>
<?php require './genaral/footer.php'; ?>
<?php require './Genaral/login.php'; ?>
<?php require './Genaral/alert.php'; ?>
<?php require './Genaral/bill.php'; ?>

