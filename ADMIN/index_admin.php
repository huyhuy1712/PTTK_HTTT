
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/index_admin.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>admin</title>
</head>
<body id="body_admin">
    <header id="header_admin">
    <div id="logo">
    <a href=""><image src="../Img/logo.png" style="width: 74px; margin-left: 40px; top: -10px; position: relative; margin-right: 200px; "></image></a>
    </div>
    <div id="title">
        <?php
        if(isset($_POST['page'])){
            if($_POST['page'] == 'Khách hàng'){
                echo "Quản lý khách hàng";
            }
            else if($_POST['page'] == 'Nhà cung cấp'){
                echo "Quản lý nhà cung cấp";
            }
            else if($_POST['page'] == 'Kho'){
                echo "Quản lý kho";
            }
            else if($_POST['page'] == 'Nhập hàng' || $_POST['page'] == 'CTPN'){
                echo "Quản lý phiếu nhập";
            }
            else if($_POST['page'] == 'Bán hàng' || $_POST['page'] == 'CTHD'){
                echo "Quản lý bán hàng";
             }
             else if($_POST['page'] == 'Sản phẩm' || $_POST['page'] == 'CHTN' || $_POST['page'] == 'CHDT' || $_POST['page'] == 'CHS' || $_POST['page'] == 'CHOL'){
                echo "Quản lý sản phẩm";
             }
             else if($_POST['page'] == 'Tài khoản'){
                echo "Quản lý tài khoản";
            }
            else if($_POST['page'] == 'Phiếu mượn' || $_POST['page'] == 'CTPM'){
                echo "Quản lý phiếu mượn";
            }
            else if($_POST['page'] == 'Kho' || $_POST['page'] == 'thong_ke'){
                echo "Quản lý kho";
            }
        }
        ?>
    </div>
    <div id="user">
    <div id="username"></div>
    <image src="../Img/avatar.png" id="avatar"></image>
</div>
    </header>

<section id="section_admin">
<form id="left_content" method="POST">
    <table>
        <tr>
            <td><input type="submit" value="Sản phẩm" name="page" class="items"></input></td>
            </tr>
            <tr>
            <tr>
            <td><input type="submit" value="Bán hàng" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Phiếu mượn" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Kho" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Nhập hàng" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Nhà cung cấp" name="page" class="items"></input></td>
            </tr>
            <tr>
            <td><input type="submit" value="Tài khoản" name="page" class="items"></input></td>
            </tr>
        </th>
</table>
</form>

<div id="right_content">

    <?php
    if(isset($_POST['page'])){
       if($_POST['page'] == 'Tài khoản'){
            require('TK_admin.php');
        }
        else if($_POST['page'] == 'Nhà cung cấp'){
            require("NCC_admin.php");
        }
        else if($_POST['page'] == 'Kho'){
            require("Kho_admin.php");
        }
        else if($_POST['page'] == 'Nhập hàng'){
           require("PNK_admin.php");
        }
        else if($_POST['page'] == 'CTPN'){
            require("CTPN_admin.php");
         }
        else if($_POST['page'] == 'Bán hàng'){
            require("HD_admin.php");
         }
        else if($_POST['page'] == 'CTHD'){
            require("CTHD_admin.php");
         }
         else if($_POST['page'] == 'Sản phẩm'){
            require("SP_admin.php");
         }

         else if($_POST['page'] == 'Quyen'){
            require("Quyen_admin.php");
         }
         else if($_POST['page'] == 'Phiếu mượn'){
            require("PM_admin.php");
         }
         else if($_POST['page'] == 'CTPM'){
            require("CTPM_admin.php");
         }
         else if($_POST['page'] == 'Kho'){
            require("Kho_admin.php");
         }
         else if($_POST['page'] == 'thong_ke'){
            require("thong_ke.php");
         }
    }
    ?>
</div>
<script src="JS/index.js"></script>

</section>
</body>
</html>
