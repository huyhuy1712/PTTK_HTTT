

function LoadDataForPage(page) {
    $.ajax({
        url: 'Model/LoadData.php',
        dataType: 'json',
        success: function (response) {
            console.log(response);

            var maxPage = 3;
            var maxElementPerPage = 1;
            var sanPham = response.san_pham;
            var elementPage = [];

            var curPage = 0;
            var element = 0;
            

            if (sanPham.length < page * maxElementPerPage) {
                for (var i = page * maxElementPerPage - maxElementPerPage; i < sanPham.length; i++) {
                    elementPage.push(sanPham[i]);
                }
            }
            else {
                for (var i = page * maxElementPerPage - maxElementPerPage; i < page * maxElementPerPage; i++) {
                    elementPage.push(sanPham[i]);
                }
            }
           
            //Lấy số trang có thể có
            for (var i = 0; i < sanPham.length; i++) {
                element++
                if (element == maxElementPerPage) {
                    curPage++;
                    element = 0;
                }
            }
            // tránh số trang bị thiếu do các phần tử không đủ
            if (element != 0) {
                curPage++;
            }
            DisplayElementPage(elementPage);
            DisplayPageNumber(getRangePage(curPage, page, maxPage), curPage, maxPage);
        },
        error: function (xhr, status, error) {
            console.log('Lỗi khi yêu cầu dữ liệu. Mã trạng thái: ' + xhr.status + ', Lỗi: ' + error);
        }
    });
}
function DisplayElementPage(elementPage) {
    var htmlElementPage = "";

    for (var i = 0; i < elementPage.length; i++) {
        htmlElementPage += '<li>' + elementPage[i].MA_SP + elementPage[i].TEN_SP +
            '<img src="' + 'Img/' + elementPage[i].HINH_ANH + '"></img>'
        '</li>'
    }

    var ulContainer = document.getElementById("elementPage");
    ulContainer.innerHTML = htmlElementPage;
}
// Lấy các trang mà trang hiển thị thuộc
function getRangePage(curPage, page, maxPage) {
    var pageNumber_Array = [];


    var t1 = 0;
    var t2 = 0;
    for (i = 1; i < curPage; i++) {
        t2 = i * maxPage;  // 1 * 4 = 4
        t1 = t2 - maxPage + 1; // 4 - 4 + 1 = 1
        if (page >= t1 && page <= t2) {
            break;
        }
    }

    if (curPage < t2) {
        for (var i = t1; i <= curPage; i++) {
            pageNumber_Array.push(i);
        }
    }
    else {
        for (var i = t1; i <= t2; i++) {
            pageNumber_Array.push(i);
        }
    }

    return pageNumber_Array;
}
// Hiển thị số trang 
function DisplayPageNumber(pageNumber_Array, curPage, maxPage) {
    var htmlPage = "";
    var htmlBackPage = "";
    var htmlNextPage = "";

    if (pageNumber_Array[0] != 1) {
        htmlBackPage += '<button onclick="LoadDataForPage(' + (pageNumber_Array[0] - maxPage) + ')">' + 'back' + '</button>'
    }
    else {
        htmlBackPage += '<button>' + 'không bấm được' + '</button>'
    }

    for (var i = 0; i < pageNumber_Array.length; i++) {
        htmlPage += '<button onclick="LoadDataForPage(' + pageNumber_Array[i] + ')">' + pageNumber_Array[i] + '</button>';
    }

    if (pageNumber_Array[0] + maxPage <= curPage) {
        htmlNextPage += '<button onclick="LoadDataForPage(' + (pageNumber_Array[0] + maxPage) + ')">' + 'next' + '</button>'
    }
    else {
        htmlNextPage += '<button>' + 'không bấm được' + '</button>'
    }

    var pageContainer = document.getElementById("pageContainer");
    pageContainer.innerHTML = htmlBackPage + htmlPage + htmlNextPage;
}
