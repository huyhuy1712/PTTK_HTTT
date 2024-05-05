
<div id="container_themSP" style="position: absolute; top: 0px;left: 0px; width: 100%; height: 100%; background-color: rgba(128, 128, 128, 0.5); display: none;">
    <form action="" method="POST" id="form_add_SP" style=" margin: 0 auto;  padding: 30px; background-color: #f9f9f9; width: 40%; height: 660px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); position: relative; top: 0px;">
        <h2 style="text-align: center; margin-bottom: 20px;">Cấu hình sản phẩm</h2>
        
        <section id="CTN_CHDT">
        <div style="margin-bottom: 15px;">
            <label for="RAM_them" style="display: block; font-weight: bold;">RAM:</label> 
            <input type="number" name="RAM" id="RAM_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="BNT_them" style="display: block; font-weight: bold;">Bộ nhớ trong:</label>
            <input type="number" name="BNT_them" id="BNT_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="MH_them" style="display: block; font-weight: bold;">Màn hình:</label>
            <input type="text" name="MH_them" id="MH_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="MS_them" style="display: block; font-weight: bold;">Màu sắc:</label>
            <input type="text" name="MS_them" id="MS_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="PIN_them" style="display: block; font-weight: bold;">PIN:</label>
            <input type="number" name="PIN" id="PIN_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="CAMTRC_them" style="display: block; font-weight: bold;">CAMERA trước:</label>
            <input type="text" name="CAMTRC" id="CAMTRC_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="CAMSAU_them" style="display: block; font-weight: bold;">CAMERA sau:</label>
            <input type="text" name="CAMSAU" id="CAMSAU_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="OS_them" style="display: block; font-weight: bold;">Hệ điều hành: </label>
            <input type="text" name="OS" id="OS_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        </section>

        <section id="CTN_CHTN" style="display: none;">
        <div style="margin-bottom: 15px;">
            <label for="KNTN_them" style="display: block; font-weight: bold;">Kết nối:</label>
            <input type="text" name="KNTN_them" id="KNTN_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="TNTN_them" style="display: block; font-weight: bold;">Tính năng:</label>
            <input type="text" name="TNTN_them" id="TNTN_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        </section>

        <section id="CTN_CHS" style="display: none;">
        <div style="margin-bottom: 15px;">
            <label for="CHSKN_them" style="display: block; font-weight: bold;">Kết nối:</label>
            <input type="text" name="CHSKN_them" id="CHSKN_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="CsS_them" style="display: block; font-weight: bold;">Công suất:</label>
            <input type="number" name="CsS_them" id="CsS_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="CHSTN_them" style="display: block; font-weight: bold;">Tính năng: </label>
            <input type="text" name="CHSTN_them" id="CHSTN_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        </section>

        <section id="CTN_CHOL" style="display: none;">
        <div style="margin-bottom: 15px;">
            <label for="CLOL_them" style="display: block; font-weight: bold;">Chất liệu:</label>
            <input type="text" name="CLOL_them" id="CLOL_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="TNOL_them" style="display: block; font-weight: bold;">Tính năng:</label>
            <input type="text" name="TNOL_them" id="TNOL_them" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        </section>

        <input type="hidden" name="page" value="<?php echo $_POST['page']; ?>">
        <input type="button" onclick="add_CHSP()" class="btn_themSP" name="btn_themSP" value="Thêm" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; float: right; ">
    </form>
</div>

